var request = require('request');
var querystring = require('querystring');
var api_key = require('../cert/riotgamesapi.json').api_key;


// Construct Riot Games api url
var constructURL = function(params) {
    var path = params.path,
        region = params.region,
        version = params.version,
        query = params.query;

    var url = `https://${region}.api.pvp.net/api/lol/${region}/${version}/`;

    url = url + path;

    query = query || {};
    query.api_key = api_key;
    url = url + "?" + querystring.stringify(query);
    return url;
}

// Make Riot Games api request
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

// Get given account's matches
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
