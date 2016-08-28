import Fuse from 'fuse.js';
import Champions from './champions';
import Channels from './database/channels';

class Catgetories {
    constructor () {
        this.promise = Promise.all([
            Champions.getAll(),
            Channels.getAllChannels()
        ]).then(function ([champions, channels]) {
            champions = Object.keys(champions).map(function (key) {
                var champion = champions[key];
                champion.type = "champion";
                return champion;
            });
            channels = Object.keys(channels).map(function (key) {
                var channel = channels[key];
                channel.type = "channel";
                return channel;
            });
            var roles = ["Top", "Jungle", "Mid", "AD Carry", "Support"].map(function (role) {
                return {
                    type: "role",
                    name: role
                };
            });
            this.catgetories = champions.concat(channels).concat(roles);
            return this.catgetories;
        }.bind(this));
    }

    search (search) {
        return this.promise.then(function (catgetories) {
            var options = {
                caseSensitive: false,
                shouldSort: true,
                tokenize: false,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                keys: [
                    "name"
                ]
            };
            var fuse = new Fuse(catgetories, options);
            var searched = fuse.search(search).splice(0,10)|| [];
            return Promise.forEach(searched, function (category) {
                if (category.type === "champion") {
                    return Champions.getImage(category.id).then(function (imageURL) {
                        category.logo = imageURL;
                        return category;
                    });
                } else {
                    return category;
                }
            });
        });
    }
}

export default new Catgetories();
