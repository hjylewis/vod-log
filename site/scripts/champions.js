function champions () {
    var champions = this;

    fetch("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-2EFFBEA3-3500-443C-934E-1E212B9FE551")
    .then(function (response) {
        console.log(response.body);
    }).catch(function (error) {
        console.log(error);
    });

}

export default new champions();
