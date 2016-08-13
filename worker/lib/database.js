var firebase = require("firebase");
var env = require("../../env.json").worker_env;

firebase.initializeApp({
  serviceAccount: __dirname + "/../cert/firebase.json",
  databaseURL: "https://vod-log.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref(`${env || 'dev'}/store`);

var setEnv = function (env) {
    ref = db.ref(`${env}/store`);
};

var getStore = function () {
    return new Promise(function (resolve, reject) {
        ref.once("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (error) {
            console.log("Get Store failed: " + error.code);
            reject(error);
        });
    });
};

var setStore = function (store) {
    return new Promise(function (resolve, reject) {
        ref.set(store, function(error) {
            if (error) {
                console.log("Set Store failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

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
};

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
};

var addChannel = function (channel) {
    var channelRef = ref.child("channels/" + channel.name);

    return new Promise(function (resolve, reject) {
        channelRef.set(channel, function (error) {
            if (error) {
                console.error("Channel add failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

var updateChannel = function (channelID, update) {
    var channelRef = ref.child("channels/" + channelID);
    channelRef.update(update);
};

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
};

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
};

var updateAccount = function (accountID, update) {
    var accountRef = ref.child("accounts/" + accountID);
    return new Promise(function (resolve, rejcect) {
        accountRef.update(update, function (error) {
            if (error) {
                console.error("Update Account failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

var addMatch = function (match) {
    var promises = [];

    var matchRef = ref.child("matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        matchRef.set(match, function (error) {
            if (error) {
                console.error("Add Match failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    var channelRef = ref.child("channels/" + match.channelID + "/matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        channelRef.set({ creation: match.creation }, function (error) {
            if (error) {
                console.error("Add Match (to channel) failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    return Promise.all(promises);
};

var clearMatches = function () {
    var matchesRef = ref.child("matches/");
    return new Promise(function (resolve, reject) {
        matchesRef.set({}, function(error) {
            if (error) {
                console.log("Clear matches failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

var close = function () {
    db.goOffline();
};



module.exports = {
    setEnv: setEnv,

    getStore: getStore,
    setStore: setStore,

    getChannels: getChannels,
    getChannel: getChannel,
    addChannel: addChannel,
    updateChannel: updateChannel,

    addAccount: addAccount,
    getAccount: getAccount,
    updateAccount: updateAccount,

    addMatch: addMatch,
    clearMatches: clearMatches,

    close: close
};
