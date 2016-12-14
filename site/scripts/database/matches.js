import Fuse from 'fuse.js';

import connection from './connection';
import channels from './channels';

function matches () {
    var matches = this;

    function _joinChannels (matches) {
        return Promise.forEach(matches, function (match) {
            return channels.getChannel(match.channelID).then(function (channel) {
                match.channel = {
                    id: match.channelID,
                    displayName: channel.displayName
                };
                delete match.channelID;
                return match;
            });
        });
    }

    function _joinMatches (matchIds) {
        return Promise.forEach(matchIds, function (matchId) {
            return connection.addListener(firebase.database().ref(connection.store + '/matches/' + matchId));
        }).then(function (matches) {
            return _joinChannels(matches);
        });
    }

    matches.getMatches = function (params) {
        var {channel, champion, role, bootcamp} = params;
        var {limit, orderBy, endAt} = params;

        var ref = connection.store + "/matches";

        if (channel) {
            ref = connection.store + '/channels/' + channel + '/matches';
        } else if (champion) {
            ref = connection.store + '/champions/' + champion + '/matches';
        } else if (role) {
            ref = connection.store + '/roles/' + role + '/matches';
        } else if (bootcamp) {
            ref = connection.store + '/bootcamps/' + bootcamp + '/matches';
        } else {
            // Normal match query (homepage)
            // No need for second queries (see alternative below)
            params.keys = false;
            return connection.getSortedData(ref, params).then(function (matches) {
                if (!matches) {
                    return Promise.resolve([]);
                }
                console.log(matches);
                return _joinChannels(matches.reverse());
            });
        }

        params.keys = true;
        return connection.getSortedData(ref, params).then(function (matches) {
            if (!matches) {
                return Promise.resolve([]);
            }
            var matchIds = matches.reverse();
            return _joinMatches(matchIds).then(function (matches) {
                return matches;
            });
        });
    };


    // Abstractions
    matches.getNewMatches = function (search, next, oldMatchList, depth) {
        oldMatchList = oldMatchList || [];
        depth = depth || 0;

        var params = {
            orderBy: "creation",
            limit: search ? 100 : 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params).then(function (matchList) {
            matchList = oldMatchList.concat(matchList);
            if (search) {
                var options = {
                    caseSensitive: false,
                    shouldSort: true,
                    tokenize: false,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    keys: [
                        "channelID",
                        "match_data.player_data.champion.name",
                        "match_data.player_data.role"
                    ]
                };
                var fuse = new Fuse(matchList, options);
                var searched = fuse.search(search)|| [];

                if (searched.length < 10 && matchList.length > 0 && depth < 5) {
                    return matches.getNewMatches(search, matchList[matchList.length - 1].creation, searched, depth + 1);
                } else {
                    return searched;
                }
            } else {
                return matchList;
            }
        });
    };

    matches.getChannelMatches = function (channel, next) {
        var params = {
            channel: channel,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params);
    };

    matches.getChampionMatches = function (championId, next) {
        var params = {
            champion: championId,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params);
    };

    matches.getRoleMatches = function (role, next) {
        var params = {
            role: role,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params);
    };

    matches.getBootcampMatches = function (bootcamp, next) {
        var params = {
            bootcamp: bootcamp,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params);
    };

    // Wrapper
    matches.getMatchesPage = function (params) {
        var {channel, champion, role, bootcamp, all, search, next} = params;
        if (channel) {
            return matches.getChannelMatches(channel, next);
        } else if (champion) {
            return matches.getChampionMatches(champion, next);
        } else if (role) {
            return matches.getRoleMatches(role, next);
        } else if (bootcamp) {
            return matches.getBootcampMatches(bootcamp, next);
        } else if (all) {
            return matches.getNewMatches(search, next);
        }
    };

}

export default new matches();
