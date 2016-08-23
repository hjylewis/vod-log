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
}

export default new champions();
