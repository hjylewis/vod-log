var dbConn = require('./lib/database');
var Twitch = require("./lib/twitch");
var RiotGames = require("./lib/riotgames");
var moment = require('moment');


// dbConn.getChannels().then(function (channels) {
//     console.log(channels);
// });
// dbConn.addChannel({
//     name: 'c9sneaky',
//     type: 'twitch',
//     id: 24538518
// });


// dbConn.addAccount({
//     id: 51405,
//     name: "C9 Sneaky",
//     type: "League of Legends",
//     region: "NA"
// }, 'c9sneaky');


var getVideos = function (channelID) {
    return Twitch.api({
        url: 'channels/' + channelID + '/videos',
        query: { broadcasts: true }
    });
}

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

var updateLastVideo = function(channelID, last_video_id) {
    dbConn.updateChannel(
        channelID,
        { last_video_id: last_video_id }
    );
}

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
