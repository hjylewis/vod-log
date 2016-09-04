import querystring from 'querystring';

function champions () {
    var champions = this;

    function constructEndpoint (region, version, path, query) {
        var api_key = "RGAPI-2EFFBEA3-3500-443C-934E-1E212B9FE551";
        var url = `https://global.api.pvp.net/api/lol/static-data/${region.toLowerCase()}/${version}/${path}`;
        query = query || {};
        query.api_key = api_key;
        url = url + "?" + querystring.stringify(query);
        return url;
    }

    var championEndpoint = constructEndpoint("na", "v1.2", "champion");
    var realmEndpoint = constructEndpoint("na", "v1.2", "realm");

    var promise = fetch(championEndpoint).then(function (response) {
        return response.json();
    }).then(function (response) {
        var champions = response.data;
        var formated = {};
        Object.keys(champions).forEach(function (key) {
            formated[key.toLowerCase()] = champions[key];
        });
        return formated;
    });

    var realmPromise = fetch(realmEndpoint).then(function (response) {
        return response.json();
    });

    champions.get = function (key) {
        return promise.then(function (champions) {
            var stripped = key.toLowerCase().replace(/[^a-zA-z]/g, '');
            return champions[stripped];
        });
    };

    champions.getAll = function () {
        return promise;
    };

    champions.getById = function (id) {
        if (/\d+/.test(id)) {
            return promise.then(function (champions) {
                for (var key in champions) {
                    var champion = champions[key];
                    if (champion.id === id) {
                        return champion;
                    }
                }
            });
        } else {
            Promise.resolve(null);
        }
    };

    champions.getImagePath = function (id) {
        if (/\d+/.test(id)) {
            var endPoint = constructEndpoint("na", "v1.2", `champion/${id}`, {
                champData: "image"
            });
            return fetch(endPoint).then(function (response) {
                return response.json();
            }).then(function (response) {
                return response.image.full;
            });
        } else {
            Promise.resolve(null);
        }
    };

    champions.getImageURL = function (version, champion) {
        return `//ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}`;
    };

    champions.getImage = function (id) {
        return Promise.all([
            champions.getImagePath(id),
            realmPromise
        ]).then(function ([path, realm]) {
            return champions.getImageURL(realm.dd, path);
        });
    };

    champions.getChampionHead = function (id) {
        return Promise.all([
            champions.getById(id),
            champions.getImage(id)
        ]).then(function ([champion, imageURL]) {
            if (!champion) {
                return null;
            }

            return {
                type: 'champion',
                name: champion.name,
                championTitle: champion.title,
                logo: imageURL,
            };
        });
    };
}

export default new champions();
