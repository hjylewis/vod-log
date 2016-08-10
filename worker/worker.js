"use strict";

var Promise = require("bluebird");
var dbConn = require('./lib/database');
var twitch = require("./lib/twitch");
var riotGames = require("./lib/riotgames");
var utils = require("./lib/utils");
var moment = require('moment');

function getAccounts (channel) {
    var accountIDs = Object.keys(channel.accounts);

    return Promise.map(accountIDs, function (accountID) {
        return dbConn.getAccount(accountID);
    }).then(function (accounts) {
        return {
            channel: channel,
            accounts: accounts
        };
    });
}

function getVideos (channelWithAccounts) {
    var channelID = channelWithAccounts.channel.name;
    return twitch.api({
        url: 'channels/' + channelID + '/videos',
        query: { broadcasts: true }
    }).then(function (videos) {
        channelWithAccounts.videos = videos;
        return channelWithAccounts;
    });
}

function filterVideos (channelWithAccountsAndVideos) {
    var videos = channelWithAccountsAndVideos.videos;
    return videos.videos && videos.videos.length > 0 // Channel has videos
}

function compareAccountWithVideos(accountWithChannelAndVideos) {
    var channelID = accountWithChannelAndVideos.channelID,
        account = accountWithChannelAndVideos.account,
        videos = accountWithChannelAndVideos.videos;

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
        return {
            channelID: channelID,
            account: account,
            videos: videos,
            "matches": matches
        };
    });
}

function filterMatches (accountWithMatches) {
    var matches = accountWithMatches.matches;
    return matches.matches && matches.matches.length > 0 // Has matches
}

// See if match is within video
// Returns -1 if match starts before the video
// Returns 0 if match starts during the video
// Returns 1 if match starts after video
function compareMatchWithVideo (match, video) {
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
}

function compareMatchesWithVideos(accountWithMatches) {
    var channelID = accountWithMatches.channelID,
        account = accountWithMatches.account,
        videos = accountWithMatches.videos.videos,
        matches = accountWithMatches.matches.matches;

    var matchesToSave = [];

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
                matchesToSave.push({
                    match: match,
                    video: video,
                    account: account,
                    channelID: channelID
                });
            } else { //before
                // Do nothing (next match)
            }
        }
    }

    return matchesToSave;
}

function createPlayerData (participant) {
    return riotGames.getChampion(participant.championId).then(function (champion) {
        participant.champion = {
            name: champion.name,
            title: champion.title,
            image: riotGames.getChampionImage(champion.image.full)
        }
        return participant;
    });
}

function createMatchData (accountID, match, matchDetails) {
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


    matchDetails.teams.forEach(function(team) {
        if (team.teamId === participant.teamId) {
            match.win = team.winner;
        }
    });

    return createPlayerData(participant).then(function (participant) {
        return {
            creation: match.timestamp,
            duration: matchDetails.matchDuration,
            region: match.region,
            queue: match.queue,
            season: match.season,
            win: match.win,
            matchVersion: matchDetails.matchVersion,
            map: matchDetails.mapId,
            player_data: participant
        };
    })
}

// Update account's last saved match
function updateLastMatchTime (account, new_timestamp) {
    if (!account.last_match_time ||
        (account.last_match_time < new_timestamp)) { // Later

        account.last_match_time = new_timestamp;
        return dbConn.updateAccount(account.id, { last_match_time: new_timestamp });
    } else {
        return Promise.resolve();
    }
}

function saveMatch(params) {
    var match = params.match,
        account = params.account,
        video = params.video,
        channelID = params.channelID;

    var beginTimeUnix = utils.convertISOtoUnix(video.recorded_at);
    var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
    var video_url = twitch.constructURL(video.url, timestamp);

    var matchStore = {
        id: match.matchId,
        type: account.type,
        accountID: account.id,
        channelID: channelID,
        video_url: video_url
    };
    return riotGames.getMatch(account.region, match.matchId).then((matchDetails) => {
        params.matchStore = matchStore;
        params.matchDetails = matchDetails;
        return params;
    }).then(function (params) {
        return createMatchData(params.account.id, params.match, params.matchDetails).then(function (match_data) {
            params.matchStore.match_data = match_data;
            return params;
        });
    }).then(function (params) {
        console.log(`Saving ${params.channelID} match ${params.matchStore.id}`);
        return dbConn.addMatch(params.matchStore).then( () => params);
    }).then(function (params) {
        return updateLastMatchTime(params.account, params.match.timestamp + 1000);
    });
}


// Iterate through stored channels for new matches
var crawlForNewMatches = function () {
    return dbConn.getChannels().then(function (channels) {
        return Object.keys(channels).map((channelID) => channels[channelID]);
    }).then(function (channels) {
        return Promise.map(channels, getAccounts);
    }).then(function (channelsWithAccounts) {
        return Promise.map(channelsWithAccounts, getVideos)
        .then(function filter(channelsWithAccountsAndVideos) {
            return channelsWithAccountsAndVideos.filter(filterVideos);
        });
    }).then(function rearrange(channelsWithAccountsAndVideos) {
        var accountsWithChannelAndVideos = [];
        channelsWithAccountsAndVideos.forEach(function (channelWithAccountsAndVideos) {
            channelWithAccountsAndVideos.accounts.forEach(function (account) {
                accountsWithChannelAndVideos.push({
                    account: account,
                    channelID: channelWithAccountsAndVideos.channel.name,
                    videos: channelWithAccountsAndVideos.videos
                });
            });
        });
        return accountsWithChannelAndVideos;
    }).then(function (accountsWithChannelAndVideos) {
        return Promise.map(accountsWithChannelAndVideos, compareAccountWithVideos)
        .then(function filter(accountsWithMatches) {
            return accountsWithMatches.filter(filterMatches);
        });
    }).then(function (accountsWithMatches) {
        return Promise.map(accountsWithMatches, compareMatchesWithVideos)
        .then(function reduce(arrays) {
            return [].concat.apply([], arrays);
        });
    }).then(function (matchesToSave) {
        return Promise.map(matchesToSave, saveMatch);
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
