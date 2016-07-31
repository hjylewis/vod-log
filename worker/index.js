"use strict";

var Worker = require('./worker');
var dbConn = require('./lib/database');
var twitch = require("./lib/twitch");
var riotGames = require("./lib/riotgames");
var utils = require("./lib/utils");

var worker = new Worker(dbConn, twitch, riotGames);

// Compare videos against matches
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
            var compare = worker.compareMatchWithVideo(match, video);
            if (compare === 1) { //After
                break; // Go to next video and keep same match
            } else if (compare === 0) { //During
                // Save
                var promise = worker.saveMatch({
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
};

// Compare videos with account
var compareAccountWithVideos = function (params) {
    var channelID = params.channelID,
        account = params.account,
        videos = params.videos;

    var firstVideo = videos.videos[videos.videos.length - 1];
    var lastVideo = videos.videos[0];

    var window_start = account.last_match_time;
    var window_end = utils.getEndTimeInUnix(lastVideo.recorded_at, lastVideo.length);
    if (!window_start) {
        window_start = utils.convertISOtoUnix(firstVideo.recorded_at);
    }

    return riotGames.getMatches(account, {
        beginTime: window_start,
        endTime: window_end
    }).then(function (matches) {
        if (!matches.matches || matches.matches.length === 0) { // No matches
            return Promise.resolve();
        }

        return compareMatchesWithVideos({
            channelID: channelID,
            account: account,
            videos: videos,
            matches: matches
        });
    });
};

// Iterate through given accounts in search of new matches
var iterateAccounts = function (params) {
    var channel = params.channel,
        accounts = params.accounts;

    var channelID = channel.name;

    return worker.getVideos(channelID).then(function (videos) {
        if (!videos.videos || videos.videos.length === 0) { // Channel has no videos
            return Promise.resolve();
        }

        var promises = [];

        accounts.forEach(function (account) {
            var promise = compareAccountWithVideos({
                channelID: channelID,
                account: account,
                videos: videos
            });
            promises.push(promise);
        });

        return Promise.all(promises);
    });
};

// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    return dbConn.getChannels().then(function (channels) {
        var channelIDs = Object.keys(channels);
        var promises = [];
        channelIDs.forEach(function (channelID) {
            var channel = channels[channelID];
            var promise = worker.getAccountsByChannel(channel).then(function (accounts) {
                return iterateAccounts({
                    channel: channel,
                    accounts: accounts,
                });
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    });
};


crawlForNewMatches().then(function () {
    console.log("done");
}).catch(function (error) {
    console.log("failed");
    console.log(error.stack);
}).then(function () {
    dbConn.close();
    process.exit();
});
