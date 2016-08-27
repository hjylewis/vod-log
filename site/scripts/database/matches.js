import connection from './connection.js';

function matches () {
    var matches = this;

    function _joinMatches (matchIds) {
        return Promise.forEach(matchIds, function (matchId) {
            return connection.addListener(firebase.database().ref(connection.store + '/matches/' + matchId));
        });
    }

    matches.getMatches = function (params) {
        var {channel, champion, role} = params;
        var {limit, orderBy, endAt} = params;

        var ref = connection.store + "/matches";

        if (channel) {
            ref = connection.store + '/channels/' + channel + '/matches';
        } else if (champion) {
            ref = connection.store + '/champions/' + champion + '/matches';
        } else if (role) {
            ref = connection.store + '/roles/' + role + '/matches';
        }

        return connection.getDataSet(ref, params).then(function (matches) {
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
    matches.getNewMatches = function (next) {
        var params = {
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return matches.getMatches(params);
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

    // Wrapper
    matches.getMatchesPage = function (params) {
        var {channel, champion, role, all, next} = params;
        if (channel) {
            return matches.getChannelMatches(channel, next);
        } else if (champion) {
            return matches.getChampionMatches(champion, next);
        } else if (role) {
            return matches.getRoleMatches(role, next);
        } else if (all) {
            return matches.getNewMatches(next);
        }
    };

}

export default new matches();
