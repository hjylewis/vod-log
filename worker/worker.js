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
            }).catch(reject);
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
    console.log(`Saving match ${matchStore.id}`);
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

    return new Promise(function (resolve, reject) {
        var count = 0;
        function incr() {
            count++;
            if (count === accounts.length) {
                resolve();
            }
        }

        accounts.forEach(function (account) {
            RiotGames.getMatches(account, {
                beginTime: beginTimeUnix,
                endTime: endTimeUnix
            }).then(function (matches) {
                var matchCount = 0;
                function matchIncr() {
                    matchCount++;
                    if (matchCount === matches.matches.length) {
                        incr();
                    }
                }
                matches.matches.forEach(function (match) {
                    var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
                    var video_url = Twitch.constructURL(video.url, timestamp);
                    saveMatch({
                        match: match,
                        video_url: video_url,
                        account: account,
                        channelID: channelID
                    }).then(matchIncr).catch(matchIncr);
                });
            }).catch(incr);
        })
    });
}

// Iterate through given channel's videos in search of new matches
var iterateVideos = function (params) {
    var channelID = params.channelID,
        last_video_id = params.last_video_id,
        accounts = params.accounts;

    return new Promise(function (resolve, reject) {
        getVideos(channelID).then(function (videos) {
            var count = 0;

            if (videos.videos.length > 0) {
                // TODO but back later
                updateLastVideo(channelID, videos.videos[0]._id);
            } else {
                resolve();
            }
            for (var i = 0; i < videos.videos.length; i++) {
                if (videos.videos[i]._id === last_video_id) {
                    break;
                }
                count++;
                compareVideoWithAccounts({
                    video: videos.videos[i],
                    accounts: accounts,
                    channelID: channelID
                }).then(function () {
                    count--;
                    if (count === 0){
                        resolve();
                    }
                });
            }
            if (count === 0){
                resolve();
            }
        }).catch(resolve);
    })
}

// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    return new Promise(function (resolve, reject) {
        dbConn.getChannels().then(function (channels) {
            var channelIDs = Object.keys(channels);
            var count = 0;
            if (channelIDs.length === 0) {
                resolve();
            }
            function incr() {
                count++;
                if (count === channelIDs.length){
                    resolve();
                }
            }
            channelIDs.forEach(function (channelID) {
                var channel = channels[channelID];
                getAccountsByChannel(channel).then(function (accounts) {
                    iterateVideos({
                        channelID: channelID,
                        last_video_id: channel.last_video_id,
                        accounts: accounts,
                    }).then(incr);
                }).catch(incr);
            });
        }).catch(resolve);
    });
}

crawlForNewMatches().then(function () {
    console.log("done");
    dbConn.close();
    process.exit();
});
