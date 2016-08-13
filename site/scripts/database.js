(function() {
    var db = window.db = this;

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

    function _orderByCreation (query) {
        return query.orderByChild('channelID').equalTo("meteos").orderByChild('creation').limitToLast(10);
    }

    function _getData (ref) {
        return _addListener(_orderByCreation(firebase.database().ref(ref)));
    }

    function getMatches () {
        // TODO dev env
        return _getData('dev/store/matches');
    }

    getMatches().then(function (value) {
        console.log(value);
    });
})();
