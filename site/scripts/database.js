import firebase from 'firebase/app';
import 'firebase/database';

import './util.js';

function db () {
    var db = this;

    // TODO dev env
    var store = "dev/store";


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyChH058iEwAz-9eAqL9mN_MGOw7vkILUIk",
        authDomain: "vod-log.firebaseapp.com",
        databaseURL: "https://vod-log.firebaseio.com",
        storageBucket: "vod-log.appspot.com",
    };
    firebase.initializeApp(config);

    function _addListener (query) {
        return query.once('value').then(function(snapshot) {
            return snapshot.val();
        });
    }

    function _getData (ref, params) {
        var {limit, orderBy, endAt} = params;
        var query = firebase.database().ref(ref);

        if (orderBy) {
            query = query.orderByChild(orderBy);
        }
        if (limit) {
            query = query.limitToLast(limit);
        }
        if (endAt) {
            query = query.endAt(endAt);
        }

        return _addListener(query);
    }

    function _joinMatches (matchIds) {
        return Promise.forEach(matchIds, function (matchId) {
            return _addListener(firebase.database().ref(store + '/matches/' + matchId));
        });
    }

    db.getMatches = function (params) {
        var {channel, champion, role} = params;
        var {limit, orderBy, endAt} = params;

        var ref = store + "/matches";

        if (channel) {
            ref = store + '/channels/' + channel + '/matches'
        } else if (champion) {
            ref = store + '/champion/' + champion + '/matches'
        } else if (role) {
            ref = store + '/role/' + role + '/matches'
        }

        return _getData(ref, params).then(function (matches) {
            if (!matches) {
                return Promise.resolve([]);
            }
            var matchIds = Object.keys(matches).reverse();
            return _joinMatches(matchIds);
        });
    };


    // Abstractions
    db.getChannelMatches = function (channel, next) {
        var params = {
            channel: channel,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return db.getMatches(params);
    };

    db.getChampionMatches = function (championId, next) {
        var params = {
            champion: championId,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return db.getMatches(params);
    };

    db.getRoleMatches = function (role, next) {
        var params = {
            role: role,
            orderBy: "creation",
            limit: 10
        };

        if (next) {
            params.endAt = next - 1;
        }

        return db.getMatches(params);
    };
}

export default new db();
