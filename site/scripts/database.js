(function() {
    var db = window.db = this;

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

    function _limit (query, limit) {
        return query.limitToLast(limit);
    }

    function _orderByCreation (query, orderBy) {
        return query.orderByChild(orderBy);
    }

    function _getData (ref, params) {
        var {limit, orderBy} = params;
        var query = firebase.database().ref(ref);

        if (orderBy) {
            query = _orderByCreation(query, orderBy);
        }
        if (limit) {
            query = _limit(query, limit);
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
        var {limit, orderBy} = params;

        var ref = store + "/matches";

        if (channel) {
            ref = store + '/channels/' + channel + '/matches'
        } else if (champion) {
            ref = store + '/champion/' + champion + '/matches'
        } else if (role) {
            ref = store + '/role/' + role + '/matches'
        }

        return _getData(ref, params).then(function (matches) {
            var matchIds = Object.keys(matches).reverse();
            return _joinMatches(matchIds);
        });
    };


    // Abstractions
    db.getChannelMatches = function (channel) {
        return db.getMatches({
            channel: channel,
            orderBy: "creation",
            limit: 10
        });
    };

    db.getChampionMatches = function (championId) {
        return db.getMatches({
            champion: championId,
            orderBy: "creation",
            limit: 10
        });
    };

    db.getRoleMatches = function (role) {
        return db.getMatches({
            role: role,
            orderBy: "creation",
            limit: 10
        });
    };


    // Usage
    db.getChannelMatches("meteos").then(function (value) {
        console.log(value);
    });
})();
