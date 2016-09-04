import connection from './connection.js';
import accounts from './accounts.js';


function channels () {
    var channels = this;

    channels.getChannel = function (id) {
        var ref = connection.store + "/channels/" + id;
        return connection.getData(ref);
    };

    channels.getAllChannels = function () {
        var ref = connection.store + "/channels";
        return connection.getData(ref);
    };

    channels.getChannelHead = function (id) {
        return channels.getChannel(id).then(function (channel) {
            return {
                type: 'channel',
                name: channel.name,
                displayName: channel.displayName,
                url: channel.url,
                logo: channel.logo,
                accounts: Object.keys(channel.accounts)
            };
        }).then(function (channel) {
            return Promise.forEach(channel.accounts, function (accountID) {
                return accounts.getAccount(accountID).then(function (account) {
                    return account.name;
                });
            }).then(function (accounts) {
                channel.accounts = accounts;
                return channel;
            });
        });
    };

}

export default new channels();
