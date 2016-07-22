var dbConn = require('./lib/database');
var Twitch = require("./lib/twitch");
var RiotGames = require("./lib/riotgames");
var moment = require('moment');


// Get videos from twitch
var getVideos = function (channelID) {
    return Twitch.api({
        url: 'channels/' + channelID + '/videos',
        query: { broadcasts: true }
    });
}

// Get known accounts by channel
var getAccountsByChannel = function (channel) {
    var promises = [];
    var accountIDs = Object.keys(channel.accounts);
    accountIDs.forEach(function (accountID) {
        var promise = dbConn.getAccount(accountID);
        promises.push(promise);
    });

    return Promise.all(promises);
}

// Update channels last crawled video
var updateLastVideo = function(channelID, last_video_id) {
    return dbConn.updateChannel(
        channelID,
        { last_video_id: last_video_id }
    );
}


// Save match in db
var saveMatch = function (params) {
    var match = params.match,
        video_url = params.video_url,
        account = params.account,
        channelID = params.channelID;

    var matchStore = {
        id: match.matchId,
        type: account.type,
        accountID: account.id,
        channelID: channelID,
        video_url: video_url
    }
    console.log(`Saving ${channelID} match ${matchStore.id}`);
    return dbConn.addMatch(matchStore);
}

// Iterate through known accounts to find matches within given video
var compareVideoWithAccounts = function (params) {
    var video = params.video,
        accounts = params.accounts,
        channelID = params.channelID;

    var beginTime = moment(video.recorded_at);
    var beginTimeUnix = beginTime.format('x');
    var endTimeUnix = beginTime.add(video.length, 'seconds').format('x');

    var promises = [];

    accounts.forEach(function (account) {
        var promise = RiotGames.getMatches(account, {
            beginTime: beginTimeUnix,
            endTime: endTimeUnix
        }).then(function (matches) {
            var promises = [];
            if (matches.matches) {
                matches.matches.forEach(function (match) {
                    var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
                    var video_url = Twitch.constructURL(video.url, timestamp);
                    var promise = saveMatch({
                        match: match,
                        video_url: video_url,
                        account: account,
                        channelID: channelID
                    });
                    promises.push(promise);
                });
            }
            return Promise.all(promises);
        });

        promises.push(promise);
    });

    return Promise.all(promises);
}

// Iterate through given channel's videos in search of new matches
var iterateVideos = function (params) {
    var channelID = params.channelID,
        last_video_id = params.last_video_id,
        accounts = params.accounts;

    return getVideos(channelID).then(function (videos) {
        var promises = [];

        if (videos.videos.length > 0 &&
            videos.videos[0].status !== "recording") { // Not currently live
            updateLastVideo(channelID, videos.videos[0]._id);
        }

        for (var i = 0; i < videos.videos.length; i++) {
            if (videos.videos[i]._id === last_video_id) {
                break;
            }

            if (videos.videos[i].broadcast_type !== "archive") { //TODO: check this
                continue;
            }
            var promise = compareVideoWithAccounts({
                video: videos.videos[i],
                accounts: accounts,
                channelID: channelID
            });
            promises.push(promise);
        }

        return Promise.all(promises);
    });
}

// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    return dbConn.getChannels().then(function (channels) {
        var channelIDs = Object.keys(channels);
        var promises = [];
        channelIDs.forEach(function (channelID) {
            var channel = channels[channelID];
            var promise = getAccountsByChannel(channel).then(function (accounts) {
                return iterateVideos({
                    channelID: channelID,
                    last_video_id: channel.last_video_id,
                    accounts: accounts,
                });
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    });
}

crawlForNewMatches().then(function () {
    console.log("done");
}).catch(function (error) {
    console.log("failed");
    console.log(error.stack);
}).then(function () {
    dbConn.close();
    process.exit();
});
