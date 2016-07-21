var request = require('request');
var querystring = require('querystring');

var headers = {
    'Accept': 'application/vnd.twitchtv.v3+json'
}

module.exports.api = function (params) {
    var url = 'https://api.twitch.tv/kraken/' + params.url
    if (params.query) {
        url = url + "?" + querystring.stringify(params.query);
    }

    var options = {
        url: url,
        headers: headers
    }
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                console.error("Twitch api call failed: " + error);
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};
