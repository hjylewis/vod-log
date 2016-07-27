"use strict";

var request = require('request');
var querystring = require('querystring');
var api_key = require('../cert/riotgamesapi.json').api_key;

var TEN_SEC_MAX = 10,
    TEN_MIN_MAX = 500;

class ApiState {
    constructor () {
        this.buffer = [];
        this.tenSecCount = 0;
        this.tenMinCount = 0;
    }

    pushRequest (params) {
        if (this._requestPossible()) {
            this._makeRequst(params);
        } else {
            this.buffer.push(params);
        }
    }

    _requestPossible () {
        return this.tenSecCount < TEN_SEC_MAX && this.tenMinCount < TEN_MIN_MAX;
    }

    _makeRequst (params) {
        var request = params.request,
            url = params.url;

        request();
        this.tenSecCount++;
        this.tenMinCount++;

        console.log(`RiotGames Api request (${this.tenSecCount}/${TEN_SEC_MAX}) (${this.tenMinCount}/${TEN_MIN_MAX}): ${url}`);

        var that = this;
        setTimeout(function () {
            that.tenSecCount--;
            that._flushBuffer();
        }, 11000);

        setTimeout(function () {
            that.tenMinCount--;
            that._flushBuffer();
        }, 601000);
    }

    _flushBuffer () {
        while(this._requestPossible() && this.buffer.length > 0) {
            this._makeRequst(this.buffer.shift());
        }
    }
}

var apiState = new ApiState();

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
};

// Make Riot Games api request
var makeRequest = function(params) {
    var options = {
        url: constructURL(params)
    };

    return new Promise(function (resolve, reject) {
        apiState.pushRequest({
            url: params.path,
            request: function () {
                request(options, function (error, response, body) {
                    if (error) {
                        console.log("Riot Games Api request failed: " + error);
                        reject(error);
                    } else {
                        body = JSON.parse(body);
                        if (body.status && body.status.status_code === 429) {
                            reject(new Error("Riot Game Api limit exceeded"));
                        } else {
                            resolve(body);
                        }
                    }
                });
            }
        });
    });
};

// Get given account's matches
var getMatches = function (account, query) {
    var params = {
        region: account.region.toLowerCase(),
        version: "v2.2",
        path: "matchlist/by-summoner/" + account.id,
        query: query
    };
    return makeRequest(params);
};

// Get match info
var getMatch = function (region, matchID) {
    var params = {
        region: region.toLowerCase(),
        version: "v2.2",
        path: "match/" + matchID
    };
    return makeRequest(params);
};

// Get account by name
var getAccountByName = function (region, name) {
    var params = {
        region: region,
        version: "v1.4",
        path: "summoner/by-name/" + name,
    };
    return makeRequest(params);
};

module.exports = {
    getMatches: getMatches,
    getMatch: getMatch,
    getAccountByName: getAccountByName
};
