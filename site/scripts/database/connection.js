import firebase from 'firebase/app';
import 'firebase/database';

import '../util.js';

function connection () {
    var connection = this;

    // TODO dev env
    connection.store = "dev/store";


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyChH058iEwAz-9eAqL9mN_MGOw7vkILUIk",
        authDomain: "vod-log.firebaseapp.com",
        databaseURL: "https://vod-log.firebaseio.com",
        storageBucket: "vod-log.appspot.com",
    };
    firebase.initializeApp(config);

    connection.addListener = function (query) {
        return query.once('value').then(function(snapshot) {
            return snapshot.val();
        });
    };

    connection.addChildListener = function (query) {
        return query.once('value').then(function(snapshot) {
            var result = [];
            snapshot.forEach(function(child) {
                result.push(child.key);
            });
            return result;
        });
    };

    connection.getData = function (ref, params) {
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

        return connection.addChildListener(query);
    };
}

export default new connection();
