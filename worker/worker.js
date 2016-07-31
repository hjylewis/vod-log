"use strict";

var utils = require("./lib/utils");
var moment = require('moment');

class Worker {
    constructor (dbConn, twitch, riotGames) {
        this.twitch = twitch;
        this.dbConn = dbConn;
        this.riotGames = riotGames;
    }

    // Get videos from twitch
    getVideos (channelID) {
        return this.twitch.api({
            url: 'channels/' + channelID + '/videos',
            query: { broadcasts: true }
        });
    }

    // Get known accounts by channel
    getAccountsByChannel (channel) {
        var promises = [];
        var accountIDs = Object.keys(channel.accounts);
        accountIDs.forEach(function (accountID) {
            var promise = this.dbConn.getAccount(accountID);
            promises.push(promise);
        });

        return Promise.all(promises);
    }

    createMatchData (accountID, match, matchDetails) {
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
    }

    // Update account's last saved match
    updateLastMatchTime (account, new_timestamp) {
        if (!account.last_match_time ||
            (account.last_match_time < new_timestamp)) { // Later

            account.last_match_time = new_timestamp;
            return this.dbConn.updateAccount(account.id, { last_match_time: new_timestamp });
        } else {
            return Promise.resolve();
        }
    }

    // Save match in db
    saveMatch (params) {
        var match = params.match,
            account = params.account,
            video = params.video,
            channelID = params.channelID;

        var beginTimeUnix = utils.convertISOtoUnix(video.recorded_at);
        var timestamp = moment(match.timestamp).subtract(beginTimeUnix).format('x');
        var video_url = this.twitch.constructURL(video.url, timestamp);

        var matchStore = {
            id: match.matchId,
            type: account.type,
            accountID: account.id,
            channelID: channelID,
            video_url: video_url
        };
        return this.riotGames.getMatch(account.region, match.matchId).then(function (matchDetails) {
            matchStore.match_data = this.createMatchData(account.id, match, matchDetails);
            console.log(`Saving ${channelID} match ${matchStore.id}`);
            return this.dbConn.addMatch(matchStore).then(function () {
                return this.updateLastMatchTime(account, match.timestamp + 1000);
            });
        });
    }

    // See if match is within video
    // Returns -1 if match starts before the video
    // Returns 0 if match starts during the video
    // Returns 1 if match starts after video
    compareMatchWithVideo (match, video) {
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
}





module.exports = Worker;
