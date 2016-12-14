import firebase from 'firebase/app';
import 'firebase/database';

import '../util';
import env from '../environment';

function connection () {
    var connection = this;

    // TODO dev env
    connection.store = `${env || 'production'}/store`;


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

    connection.addSortedListener = function (query) {
        return query.once('value').then(function(snapshot) {
            var result = [];
            snapshot.forEach(function(child) {
                result.push(child.val());
            });
            return result;
        });
    };

    connection.addSortedKeyListener = function (query) {
        return query.once('value').then(function(snapshot) {
            var result = [];
            snapshot.forEach(function(child) {
                result.push(child.key);
            });
            return result;
        });
    };

    var createQuery = function (ref, params) {
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

        return query;
    }

    connection.getSortedData = function (ref, params) {
        var query = createQuery(ref, params);
        if (params.keys) {
            return connection.addSortedKeyListener(query);
        } else {
            return connection.addSortedListener(query);
        }
    };

    connection.getData = function (ref) {
        var query = firebase.database().ref(ref);
        return connection.addListener(query);
    };
}

export default new connection();
