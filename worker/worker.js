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
};

// Get known accounts by channel
var getAccountsByChannel = function (channel) {
    var promises = [];
    var accountIDs = Object.keys(channel.accounts);
    accountIDs.forEach(function (accountID) {
        var promise = dbConn.getAccount(accountID);
        promises.push(promise);
    });

    return Promise.all(promises);
};

var createMatchData = function (accountID, match, matchDetails) {
    // Player details
    var participantId,
        participant;

    matchDetails.participantIdentities.some(function (id) {
        if (id.player.summonerId === parseInt(accountID)) {
            participantId = id.participantId;
            return true;
        } else {
            return false;
        }
    });

    if (participantId) {
        matchDetails.participants.some(function (p) {
            if (p.participantId === participantId) {
                participant = p;
                return true;
            } else {
                return false;
            }
        });
    }

    if (!participant) {
        throw "MissingParticipantException";
    }

    participant.role = match.role;
    participant.lane = match.lane;

    return {
        creation: match.timestamp,
        duration: matchDetails.matchDuration,
        region: match.region,
        queue: match.queue,
        season: match.season,
        matchVersion: matchDetails.matchVersion,
        map: matchDetails.mapId,
        player_data: participant
    };
};

// Update account's last saved match
var updateLastMatchTime = function(account, new_timestamp) {
    if (!account.last_match_time ||
        (account.last_match_time < new_timestamp)) { // Later

        account.last_match_time = new_timestamp;
        return dbConn.updateAccount(account.id, { last_match_time: new_timestamp });
    } else {
        return Promise.resolve();
    }
};

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
    };
    return RiotGames.getMatch(account.region, match.matchId).then(function (matchDetails) {
        matchStore.match_data = createMatchData(account.id, match, matchDetails);
        console.log(`Saving ${channelID} match ${matchStore.id}`);
        return dbConn.addMatch(matchStore).then(function () {
            return updateLastMatchTime(account, match.timestamp + 1000);
        });
    });
};

// See if match is within video
// Returns -1 if match starts before the video
// Returns 0 if match starts during the video
// Returns 1 if match starts after video
var compareMatchWithVideo = function (match, video) {
    var videoStartUnix = parseInt(utils.convertISOtoUnix(video.recorded_at));
    var videoEndUnix = parseInt(utils.getEndTimeInUnix(video.recorded_at, video.length));

    var matchStart = parseInt(match.timestamp);

    if (videoStartUnix <= matchStart && matchStart <= videoEndUnix) {
        return 0;
    } else if (matchStart < videoStartUnix) {
        return -1;
    } else {
        return 1;
    }
};

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
            var compare = compareMatchWithVideo(match, video);
            if (compare === 1) { //After
                break; // Go to next video and keep same match
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

    return RiotGames.getMatches(account, {
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

    return getVideos(channelID).then(function (videos) {
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
            var promise = getAccountsByChannel(channel).then(function (accounts) {
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
