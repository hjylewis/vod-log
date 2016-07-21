var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: __dirname + "/../cert/vod-log-cc3b0a499520.json",
  databaseURL: "https://vod-log.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("store");

var getChannels = function () {
    var channelsRef = ref.child("channels");

    return new Promise(function(resolve, reject) {
        channelsRef.once("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (error) {
            console.error("Channels get failed: " + error.code);
            reject(error);
        });
    });
}

var getChannel = function (channelID) {
    var channelRef = ref.child("channels/" + channelID);
    return new Promise(function (resolve, reject) {
        channelRef.once("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (error) {
            console.error("Channel get failed: " + error.code);
            reject(error);
        });
    });
}

var addChannel = function (channel) {
    var channelRef = ref.child("channels/" + channel.name);

    return newPromise(function (resolve, reject) {
        channelRef.set(channel, function (error) {
            if (error) {
                console.error("Channel add failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

var addAccount = function (account, channelID) {
    var accountRef = ref.child("accounts/" + account.id);
    var channelAccountRef = ref.child("channels/" + channelID + "/accounts/" + account.id);

    return new Promise(function (resolve, reject) {
        accountRef.set(account, function (error) {
            if (error) {
                console.error("Account add failed: " + error.code);
                reject(error);
            } else {
                channelAccountRef.set(true, function (error) {
                    if (error) {
                        console.error("Account add failed: " + error.code);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

var getAccount = function (accountID) {
    var accountRef = ref.child("accounts/" + accountID);

    return new Promise(function (resolve, reject) {
        accountRef.once("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (error) {
            console.log("Account get failed: " + error.code);
            reject(error);
        });
    });
}



module.exports = {
    getChannels: getChannels,
    getChannel: getChannel,
    addChannel: addChannel,

    addAccount: addAccount,
    getAccount: getAccount
}
