var dbConn = require('./lib/database');
var Twitch = require('./lib/twitch');
var minimist = require('minimist');

var copyDBfromEnvs = function (start_env, end_env) {
    return new Promise(function (resolve, reject) {
        dbConn.setEnv(start_env);
        dbConn.getStore().then(function (store) {
            dbConn.setEnv(end_env);
            dbConn.setStore(store).then(resolve).catch(resolve);
        }).catch(resolve);
    })
}

global.copyDB = function () {
    return copyDBfromEnvs('production', 'dev');
}

global.addAccount = function () {

}

global.addChannel = function (args) {
    var name = args.n || args.name;
    if (!name) {
        console.log("Missing -n");
        return;
    }

    return Twitch.api({url: 'channels/' + name}).then(function (channel) {
        return dbConn.addChannel({
            id: channel._id,
            name: name,
            type: "twitch" // HARDCODE
        });
    });
}

function execute(args) {
    var fn = args._[0];

    if (args.env) {
        dbConn.setEnv(args.env);
    }

    if (fn in global && typeof global[fn] === "function") {
        var promise = global[fn](args)

        if (promise) {
            promise.then(function () {
                console.log("done");
            }).catch(function () {
                console.log("failed");
            }).then(function () {
                process.exit();
            });
        } else {
            process.exit();
        }
    }
}

execute(minimist(process.argv.slice(2)));
