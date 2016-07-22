var request = require('request');
var querystring = require('querystring');
var api_key = require('../cert/riotgamesapi.json').api_key;

/* {
 *     path,
 *     region,
 *     version,
 *     query
 * }
 */
var constructURL = function(params) {
    var url = `https://${params.region}.api.pvp.net/api/lol/${params.region}/${params.version}/`;

    url = url + params.path;

    params.query = params.query || {};
    params.query.api_key = api_key;
    url = url + "?" + querystring.stringify(params.query);
    return url;
}

var makeRequest = function(params) {
    var options = {
        url: constructURL(params)
    }

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                console.log("Riot Games Api request failed: " + error);
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

var getMatches = function (account, query) {
    params = {
        region: account.region.toLowerCase(),
        version: "v2.2",
        path: "matchlist/by-summoner/" + account.id,
        query: query
    }
    return makeRequest(params);
}

module.exports = {
    getMatches: getMatches
};
