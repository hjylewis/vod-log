"use strict";

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

global.copyDBtoDev = function () {
    return copyDBfromEnvs('production', 'dev');
};

global.copyDBtoProduction = function () {
    return copyDBfromEnvs('dev', 'production');
};

global.clearMatches = function () {
    return dbConn.clearMatches();
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
        var usernames = Object.keys(account);
        if (usernames.length > 0){
            account = account[usernames[0]];

            return dbConn.getAccount(account.id).then(function (dbAccount) {
                if (dbAccount && !force) {
                    return;
                }
                return dbConn.addAccount({
                    id: account.id,
                    name: account.name,
                    region: region,
                    bootcamp: args.bootcamp || null,
                    type: "League of Legends" // HARDCODE
                }, channel);
            });
        } else {
            console.log("No account found");
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

        console.log("addChannel");
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

function execute(args) {
    var fn = args._[0];

    if (args.env) {
        dbConn.setEnv(args.env);
    }

    if (fn in global && typeof global[fn] === "function") {
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
    }
}

execute(minimist(process.argv.slice(2)));
