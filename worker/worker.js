var dbConn = require('./lib/database');
var Twitch = require("./lib/twitch");

// dbConn.getChannels().then(function (channels) {
//     console.log(channels);
// });
// dbConn.addChannel({
//     name: 'c9sneaky',
//     type: 'twitch',
//     id: 24538518
// });


// dbConn.addAccount({
//     id: 51405,
//     name: "C9 Sneaky",
//     type: "League of Legends",
//     region: "NA"
// }, 'c9sneaky');


var getVideos = function (channelID) {
    return Twitch.api({
        url: 'channels/' + channelID + '/videos',
        query: { broadcasts: true }
    });
}

var getAccountsByChannel = function (channelID) {
    accounts = [];
    return new Promise(function (resolve, reject) {
        getChannel(channelID).then(function (channel) {
            var accountIDs = Object.keys(channel.accounts);
            accountIDs.forEach(function (accountID) {
                getAccount(accountID).then(function (account) {
                    accounts.push(account);
                    if (accounts.length === accountIDs.length) {
                        resolve(accounts);
                    }
                });
            });
        }).catch(reject);
    })
}


dbConn.getChannels().then(function (channels) {
    Object.keys(channels).forEach(function (channelID) {
        getAccountsByChannel(channelID).then(function (accounts) {
            console.log(accounts);
            getVideos(channelID).then(function (videos) {
                videos.videos.forEach(function (video) {
                    
                });
            });
        })
    });
});
