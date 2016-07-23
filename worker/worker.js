"use strict";

var dbConn = require('./lib/database');
var Twitch = require("./lib/twitch");
var RiotGames = require("./lib/riotgames");
var utils = require("./lib/utils");
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
var updateLastVideo = function(channel, video) {
    if (!channel.last_video ||
        (new Date(channel.last_video.date) < new Date(video.created_at))) { // Later

        var new_last_video = {
            date: video.created_at,
            id: video._id
        };
        channel.last_video = new_last_video;
        return dbConn.updateChannel(
            channel.name,
            { last_video: new_last_video }
        );
    } else {
        return Promise.resolve();
    }
}

// Save match in db
var saveMatch = function (params) {
    var match = params.match,
        account = params.account,
        video = params.video,
        channelID = params.channelID;

    var beginTimeUnix = utils.convertISOtoUnix(video.recorded_at);
    var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
    var video_url = Twitch.constructURL(video.url, timestamp);

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

// DEPRECIATED
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
                console.log(video.title + " " + matches.matches.length.toString());
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

// Returns -1 if match starts before the video
// Returns 0 if match starts during the video
// Returns 1 if match starts after video
var compareMatchWithVideo = function (match, video) {
    var videoStart = moment(video.recorded_at);
    var videoStartUnix = parseInt(videoStart.format('x'));
    var videoEndUnix = parseInt(videoStart.add(video.length, 'seconds').format('x'));

    var matchStart = parseInt(match.timestamp);

    if (videoStartUnix <= matchStart && matchStart <= videoEndUnix) {
        return 0;
    } else if (matchStart < videoStartUnix) {
        return -1;
    } else {
        return 1;
    }
}

var compareMatchesWithVideos = function (params) {
    var channelID = params.channelID,
        account = params.account,
        videos = params.videos.videos,
        matches = params.matches.matches;

    var promises = [];

    var matchIdx = matches.length - 1;
    for (var videoIdx = videos.length - 1; videoIdx >= 0; videoIdx--) {
        var video = videos[videoIdx];

        if (video.broadcast_type !== "archive") { //TODO: check this
            continue;
        }

        for (;matchIdx >= 0; matchIdx--) {
            var match = matches[matchIdx];

            var compare = compareMatchWithVideo(match, video);
            if (compare === 1) { //After
                matchIdx++; // Keep same video
                break; // Go to next video
            } else if (compare === 0) { //During
                // Save
                var promise = saveMatch({
                    match: match,
                    video: video,
                    account: account,
                    channelID: channelID
                });
                promises.push(promise);
            } else { //before
                // Do nothing (next match)
            }
        }
    }

    return Promise.all(promises);
}

var compareAccountWithVideos = function (params) {
    var channelID = params.channelID,
        account = params.account,
        videos = params.videos;

    var last_match_time = account.last_match_time;
    if (!last_match_time) {
        var firstVideo = videos.videos[videos.videos.length - 1];
        last_match_time = utils.convertISOtoUnix(firstVideo.recorded_at);
    }

    return RiotGames.getMatches(account, {
        beginTime: last_match_time
    }).then(function (matches) {
        return compareMatchesWithVideos({
            channelID: channelID,
            account: account,
            videos: videos,
            matches: matches
        })
    });
}

// Iterate through given channel's videos in search of new matches
var iterateVideos = function (params) {
    var channel = params.channel,
        accounts = params.accounts;

    var channelID = channel.name,
        last_video_id = channel.last_video ? channel.last_video.id : null;

    return getVideos(channelID).then(function (videos) {
        var promises = [];

        accounts.forEach(function (account) {
            var promise = compareAccountWithVideos({
                channelID: channelID,
                account: account,
                videos: videos
            });
            promises.push(promise);
        });

        // for (var i = 0; i < videos.videos.length; i++) {
        //     if (videos.videos[i]._id === last_video_id) {
        //         break;
        //     }
        //
        //     if (videos.videos[i].broadcast_type !== "archive") { //TODO: check this
        //         continue;
        //     }
        //
        //     if (videos.videos[i].status !== "recording") { // Not currently live
        //         updateLastVideo(channel, videos.videos[i]);
        //     }
        //
        //     // TODO Change to compare Videos with accounts
        //     // And store last video in accounts
        //     var promise = compareVideoWithAccounts({
        //         video: videos.videos[i],
        //         accounts: accounts,
        //         channelID: channelID
        //     });
        //     promises.push(promise);
        // }

        return Promise.all(promises);
    });
}

// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    return dbConn.getChannels().then(function (channels) {
        var channelIDs = Object.keys(channels);
        var promises = [];
        channelIDs = [channelIDs[0]]; // TODO remove
        channelIDs.forEach(function (channelID) {
            var channel = channels[channelID];
            var promise = getAccountsByChannel(channel).then(function (accounts) {
                return iterateVideos({
                    channel: channel,
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
