"use strict";

var request = require('request');
var querystring = require('querystring');
var api_key = require('../cert/riotgamesapi.json').api_key;

class ApiState {
    constructor () {
        this.buffer = [];
        this.tenSecCount = 0;
        this.tenMinCount = 0;
    }

    pushRequest (request) {
        if (this._requestPossible()) {
            this._makeRequst(request);
        } else {
            this.buffer.push(request);
            console.log("Buffering api request...");
        }
    }

    _requestPossible () {
        return this.tenSecCount < 10 && this.tenMinCount < 500;
    }

    _makeRequst (request) {
        request();
        this.tenSecCount++;
        this.tenMinCount++;

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
}

// Make Riot Games api request
var makeRequest = function(params) {
    var options = {
        url: constructURL(params)
    }

    return new Promise(function (resolve, reject) {
        apiState.pushRequest(function () {
            request(options, function (error, response, body) {
                if (error) {
                    console.log("Riot Games Api request failed: " + error);
                    reject(error);
                } else {
                    var body = JSON.parse(body);
                    if (body.status && body.status.status_code === 429) {
                        reject(new Error("Riot Game Api limit exceeded"));
                    } else {
                        resolve(body);
                    }
                }
            });
        });
    });
}

// Get given account's matches
var getMatches = function (account, query) {
    var params = {
        region: account.region.toLowerCase(),
        version: "v2.2",
        path: "matchlist/by-summoner/" + account.id,
        query: query
    }
    return makeRequest(params);
}

// Get account by name
var getAccountByName = function (region, name) {
    var params = {
        region: region,
        version: "v1.4",
        path: "summoner/by-name/" + name,
    }
    return makeRequest(params);
}

module.exports = {
    getMatches: getMatches,
    getAccountByName: getAccountByName
};
