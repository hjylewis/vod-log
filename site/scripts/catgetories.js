import Fuse from 'fuse.js';
import Champions from './champions';
import Channels from './database/channels';
import Bootcamps from './database/bootcamps';

class Catgetories {
    initCatgetories () {
        if (this.catgetories) {
            return Promise.resolve(this.catgetories);
        }

        return Promise.all([
            Champions.getAll(),
            Channels.getAllChannels(),
            Bootcamps.getAllBootcamps()
        ]).then(function ([champions, channels, bootcamps]) {
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
            bootcamps = Object.keys(bootcamps).map(function (key) {
                var bootcamp = bootcamps[key];
                bootcamp.name = key;
                bootcamp.type = "bootcamp";
                return bootcamp;
            });
            var roles = ["Top", "Jungle", "Mid", "AD Carry", "Support"].map(function (role) {
                return {
                    type: "role",
                    name: role
                };
            });
            this.catgetories = champions.concat(channels).concat(roles).concat(bootcamps);
            return this.catgetories;
        }.bind(this));
    }

    search (search) {
        return this.initCatgetories().then(function (catgetories) {
            var options = {
                caseSensitive: false,
                shouldSort: true,
                tokenize: false,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                keys: [
                    "name",
                    "displayName"
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
