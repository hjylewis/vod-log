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
    accounts = [];
    return new Promise(function (resolve, reject) {
        var accountIDs = Object.keys(channel.accounts);
        accountIDs.forEach(function (accountID) {
            dbConn.getAccount(accountID).then(function (account) {
                accounts.push(account);
                if (accounts.length === accountIDs.length) {
                    resolve(accounts);
                }
            });
        });
    })
}

// Update channels last crawled video
var updateLastVideo = function(channelID, last_video_id) {
    dbConn.updateChannel(
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

    dbConn.addMatch(matchStore);
}

// Iterate through known accounts to find matches within given video
var compareVideoWithAccounts = function (params) {
    var video = params.video,
        accounts = params.accounts,
        channelID = params.channelID;

    var beginTime = moment(video.recorded_at);
    var beginTimeUnix = beginTime.format('x');
    var endTimeUnix = beginTime.add(video.length, 'seconds').format('x');
    accounts.forEach(function (account) {
        RiotGames.getMatches(account, {
            beginTime: beginTimeUnix,
            endTime: endTimeUnix
        }).then(function (matches) {
            matches.matches.forEach(function (match) {
                var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
                var video_url = Twitch.constructURL(video.url, timestamp);
                saveMatch({
                    match: match,
                    video_url: video_url,
                    account: account,
                    channelID: channelID
                });
            });
        });
    })
}

// Iterate through given channel's videos in search of new matches
var iterateVideos = function (params) {
    var channelID = params.channelID,
        last_video_id = params.last_video_id,
        accounts = params.accounts;

    getVideos(channelID).then(function (videos) {
        if (videos.videos.length > 0) {
            // TODO but back later updateLastVideo(channelID, videos.videos[0]._id);
        }
        for (var i = 0; i < videos.videos.length; i++) {
            if (videos.videos[i]._id === last_video_id) {
                break;
            }
            compareVideoWithAccounts({
                video: videos.videos[i],
                accounts: accounts,
                channelID: channelID
            });
        }
    });
}

// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    dbConn.getChannels().then(function (channels) {
        Object.keys(channels).forEach(function (channelID) {
            var channel = channels[channelID];
            getAccountsByChannel(channel).then(function (accounts) {
                iterateVideos({
                    channelID: channelID,
                    last_video_id: channel.last_video_id,
                    accounts: accounts,
                });
            })
        });
    });
}

crawlForNewMatches();
