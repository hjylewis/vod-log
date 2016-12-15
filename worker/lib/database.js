var firebase = require("firebase");
var logger = require('./logger');
var env = require("../../env.json").worker_env;

firebase.initializeApp({
  serviceAccount: __dirname + "/../cert/firebase.json",
  databaseURL: "https://vod-log.firebaseio.com/"
});

logger.debug("env: " + env);
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
            logger.error("Get Store failed: " + error.code);
            reject(error);
        });
    });
};

var setStore = function (store) {
    return new Promise(function (resolve, reject) {
        ref.set(store, function(error) {
            if (error) {
                logger.error("Set Store failed: " + error.code);
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
            var channels = snapshot.val();
            delete channels.keys;
            resolve(channels);
        }, function (error) {
            logger.error("Channels get failed: " + error.code);
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
            logger.error("Channel get failed: " + error.code);
            reject(error);
        });
    });
};

var addChannelKey = function (channelId) {
    var channelKeyRef = ref.child("channels/keys/" + channelId);
    return new Promise(function (resolve, reject) {
        channelKeyRef.set(true, function (error) {
            if (error) {
                logger.error("Channel add key (" + channelId + ") failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

var addChannel = function (channel) {
    var channelRef = ref.child("channels/" + channel.name);

    return new Promise(function (resolve, reject) {
        channelRef.set(channel, function (error) {
            if (error) {
                logger.error("Channel add failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }).then(function () {
        return addChannelKey(channel.name);
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
                logger.error("Account add failed: " + error.code);
                reject(error);
            } else {
                channelAccountRef.set(true, function (error) {
                    if (error) {
                        logger.error("Account add failed: " + error.code);
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
            logger.error("Account get failed: " + error.code);
            reject(error);
        });
    });
};

var getAccounts = function () {
    var accountRef = ref.child("accounts");

    return new Promise(function (resolve, reject) {
        accountRef.once("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (error) {
            logger.error("Accounts get failed: " + error.code);
            reject(error);
        });
    });
};

var updateAccount = function (accountID, update) {
    var accountRef = ref.child("accounts/" + accountID);
    return new Promise(function (resolve, rejcect) {
        accountRef.update(update, function (error) {
            if (error) {
                logger.error("Update Account failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

var addMatch = function (match) {
    var promises = [];
    var matchDigest = {
        channel: match.channelID,
        champion: match.match_data.player_data.championId,
        role: match.match_data.player_data.role,
        creation: match.creation
    };

    var matchRef = ref.child("matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        matchRef.set(match, function (error) {
            if (error) {
                logger.error("Add Match failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    var channelRef = ref.child("channels/" + match.channelID + "/matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        channelRef.set(matchDigest, function (error) {
            if (error) {
                logger.error("Add Match (to channel) failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    var championRef = ref.child("champions/" + match.match_data.player_data.championId + "/matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        championRef.set(matchDigest, function (error) {
            if (error) {
                logger.error("Add Match (to channel) failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    var roleRef = ref.child("roles/" + match.match_data.player_data.role + "/matches/" + match.id);
    promises.push(new Promise(function (resolve, reject) {
        roleRef.set(matchDigest, function (error) {
            if (error) {
                logger.error("Add Match (to channel) failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    if (match.bootcamp) {
        var bootcampRef = ref.child("bootcamps/" + match.bootcamp + "/matches/" + match.id);
        promises.push(new Promise(function (resolve, reject) {
            bootcampRef.set(matchDigest, function (error) {
                if (error) {
                    logger.error("Add Match (to bootcamp) failed: " + error.code);
                    reject(error);
                } else {
                    resolve();
                }
            });
        }));
    }

    return Promise.all(promises);
};

var clearMatches = function () {
    var promises = [];
    var matchesRef = ref.child("matches/");
    promises.push(new Promise(function (resolve, reject) {
        matchesRef.set({}, function(error) {
            if (error) {
                logger.error("Clear matches failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    matchesRef = ref.child("champions/");
    promises.push(new Promise(function (resolve, reject) {
        matchesRef.set({}, function(error) {
            if (error) {
                logger.error("Clear matches failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    matchesRef = ref.child("roles/");
    promises.push(new Promise(function (resolve, reject) {
        matchesRef.set({}, function(error) {
            if (error) {
                logger.error("Clear matches failed: " + error.code);
                reject(error);
            } else {
                resolve();
            }
        });
    }));

    var channelsRef = ref.child("channels/");
    promises.push(new Promise(function (resolve, reject) {
        channelsRef.once("value", function(snapshot) {
            var promises = [];
            snapshot.forEach(function(child) {
                promises.push(new Promise(function (resolve, reject) {
                    channelsRef.child(child.key + "/matches").set({}, function(error) {
                        if (error) {
                            logger.error("Clear matches failed: " + error.code);
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                }));
            });

            Promise.all(promises).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        }, function (error) {
            logger.error("Get channels failed: " + error.code);
            reject(error);
        });
    }));

    return Promise.all(promises);
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
    getAccounts: getAccounts,
    updateAccount: updateAccount,

    addMatch: addMatch,
    clearMatches: clearMatches,

    close: close
};
