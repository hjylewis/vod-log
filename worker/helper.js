"use strict";

var fs = require('fs');
var path = require('path');
var dbConn = require('./lib/database');
var Twitch = require('./lib/twitch');
var RiotGames = require('./lib/riotgames');
var minimist = require('minimist');
var Promise = require("bluebird");

var directory = require('./directory');

var copyDBfromEnvs = function (start_env, end_env) {
    return new Promise(function (resolve, reject) {
        dbConn.setEnv(start_env);
        dbConn.getStore().then(function (store) {
            dbConn.setEnv(end_env);
            dbConn.setStore(store).then(resolve).catch(resolve);
        }).catch(resolve);
    });
};

global.copyDB = function (args) {
    var destination = args.d || args.destination || 'dev';

    if (destination === 'dev') {
        return copyDBfromEnvs('production', 'dev');
    } else if (destination === 'production') {
        return copyDBfromEnvs('dev', 'production');
    }
};

global.clearMatches = function () {
    return dbConn.clearMatches();
};

global.renameAccounts = function (args) {
    var dirty = false;
    var directoryFileName = path.join(__dirname, 'directory.js');
    var directoryString = fs.readFileSync(directoryFileName, 'utf8');

    return dbConn.getAccounts().then(function(accounts) {
        return Promise.map(Object.keys(accounts), function (accountID) {
            return RiotGames.getAccount(accounts[accountID].region, accountID).then(function (riotGamesAccount) {
                return riotGamesAccount[accountID];
            });
        }).then(function (riotGamesAccounts) {
            return Promise.map(riotGamesAccounts, function (riotGamesAccount) {
                var oldName = accounts[riotGamesAccount.id].name;
                var newName = riotGamesAccount.name;
                if (newName !== oldName) {
                    dirty = true;
                    console.log(oldName + " -> " + newName);
                    directoryString = directoryString.replace(oldName, newName);
                    return dbConn.updateAccount(riotGamesAccount.id, {name: newName});
                }
            });
        });
    }).then(function () {
        if (dirty) {
            fs.writeFileSync(directoryFileName, directoryString, 'utf8');
        }
    });
};

global.addAccount = function (args) {
    var force = args.f || args.force;

    var channel = args.c || args.channel;
    if (!channel) {
        console.log("Missing -c");
        return;
    }

    var name = args.n || args.name;
    if (!name) {
        console.log("Missing -n");
        return;
    }

    var region = args.r || args.region;
    if (!region) {
        console.log("Missing -r");
        return;
    }

    return RiotGames.getAccountByName(region, name).then(function (account) {
        if (account.status && account.status.status_code !== 200) {
            return Promise.reject(new Error("Error with RiotGames (" + account.status.status_code + ") while getting " + name));
        }

        var usernames = Object.keys(account);
        if (usernames.length > 0){
            account = account[usernames[0]];

            return dbConn.getAccount(account.id).then(function (dbAccount) {
                if (dbAccount && !force) {
                    // name change
                    if (dbAccount.name !== account.name) {
                        return dbConn.updateAccount(account.id, { name: account.name });
                    }
                    return;
                }
                console.log("add account: " + account.name);

                return dbConn.addAccount({
                    id: account.id,
                    name: account.name,
                    region: region,
                    bootcamp: args.bootcamp || null,
                    channelID: channel,
                    type: "League of Legends" // HARDCODE
                }, channel);
            });
        } else {
            console.log("No account found: " + name);
        }
    });
};

global.addChannel = function (args) {
    var force = args.f || args.force;

    var name = args.n || args.name;
    if (!name) {
        console.log("Missing -n");
        return;
    }

    var displayName = args.d || args.displayName || name;

    return dbConn.getChannel(name).then(function (channel) {
        if (channel && !force) {
            return;
        }

        console.log("add channel: " + name);
        return Twitch.api({url: 'channels/' + name}).then(function (channel) {
            return dbConn.addChannel({
                id: channel._id,
                name: name,
                displayName: displayName,
                type: "twitch", // HARDCODE
                logo: channel.logo,
                url: channel.url
            });
        });
    });
};

global.directory = function (args) {
    var force = args.f || args.force;

    return Promise.map(Object.keys(directory), function (channel) {
        let args = {
            name: channel,
            displayName: directory[channel].displayName,
            force: force === true || force === "channel"
        };
        return global.addChannel(args).then(function () {
            return Promise.map(directory[channel].accounts, function (account) {
                let args = {
                    channel: channel,
                    name: account.name,
                    region: account.region,
                    bootcamp: account.bootcamp,
                    force: force === true || force === "account"
                };
                return global.addAccount(args);
            });
        });
    });
};

// a Migration, don't forsee me using this again
global.addChannelToAccount = function () {
    return dbConn.getChannels().then(function (channels) {
        return Promise.map(Object.keys(channels), function (channelID) {
            var channel = channels[channelID];

            return Promise.map(Object.keys(channel.accounts), function (accountID) {
                return dbConn.updateAccount(accountID, { channelID: channelID });
            });
        });
    });
};

function execute(args) {
    var fn = args._[0];

    if (args.env) {
        dbConn.setEnv(args.env);
    }

    if (fn && fn in global && typeof global[fn] === "function") {
        console.log('Running: ' + fn);
        var promise = global[fn](args);

        if (promise) {
            promise.then(function () {
                console.log("done");
            }).catch(function (error) {
                console.log("failed");
                console.error(error.stack);
            }).then(function () {
                process.exit();
            });
        } else {
            process.exit();
        }
    } else {
        console.log("Missing command");
        process.exit();
    }
}

execute(minimist(process.argv.slice(2)));
