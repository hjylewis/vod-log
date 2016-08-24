function champions () {
    var champions = this;

    var championEndpoint = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-2EFFBEA3-3500-443C-934E-1E212B9FE551";
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

    var realmEndpoint = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/realm?api_key=RGAPI-2EFFBEA3-3500-443C-934E-1E212B9FE551";
    var realmPromise = fetch(realmEndpoint).then(function (response) {
        return response.json();
    });

    champions.get = function (key) {
        return promise.then(function (champions) {
            var stripped = key.toLowerCase().replace(/[^a-zA-z]/g, '');
            return champions[stripped];
        });
    };

    champions.getById = function (id) {
        return promise.then(function (champions) {
            for (var key in champions) {
                var champion = champions[key];
                if (champion.id === id) {
                    return champion;
                }
            }
        });
    };

    champions.getImagePath = function (id) {
        var endPoint = `https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/${id}?champData=image&api_key=RGAPI-2EFFBEA3-3500-443C-934E-1E212B9FE551`;
        return fetch(endPoint).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            return response.image.full;
        });
    };

    champions.getImage = function (version, champion) {
        return `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}`;
    };

    champions.getChampionHead = function (id) {
        return Promise.all([
            champions.getById(id),
            champions.getImagePath(id),
            realmPromise
        ]).then(function ([champion, path, realm]) {
            return {
                type: 'champion',
                name: champion.name,
                logo: champions.getImage(realm.dd, path),
            };
        });
    };
}

export default new champions();
