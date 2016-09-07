"use strict";

var request = require('request');
var querystring = require('querystring');
var api_key = require('../cert/riotgamesapi.json').api_key;
var logger = require('./logger');

var TEN_SEC_MAX = 10,
    TEN_MIN_MAX = 500;

class ApiState {
    constructor () {
        this.buffer = [];
        this.tenSecCount = 0;
        this.tenMinCount = 0;
        this.suspended = false;
    }

    pushRequest (params) {
        if (this._requestPossible()) {
            this._execute(params);
        } else {
            this.buffer.push(params);
        }
    }

    _requestPossible () {
        return !this.suspended && this.tenSecCount < TEN_SEC_MAX && this.tenMinCount < TEN_MIN_MAX;
    }

    _suspend (retrySeconds) {
        logger.debug(`RiotGames Api suspended for ${retrySeconds}`);
        this.suspended = true;
    }

    _unsuspend () {
        logger.debug("RiotGames Api unsuspended");
        this.suspended = false;
    }

    _makeRequest(params) {
        var options = params.options,
            callback = params.callback;

        var self = this;
        request(options, function (error, response, body) {
            if (!error) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    throw body;
                }
                if (body.status && body.status.status_code === 429) {
                    var retrySeconds = response.headers['retry-after'] ? parseInt(response.headers['retry-after']) : 0;
                    self.pushRequest(params); // re-add
                    if (!self.suspended) {
                        self._suspend(retrySeconds);
                        setTimeout(function () {
                            self._unsuspend();
                            self._flushBuffer();
                        }, retrySeconds * 1000);
                    }
                    return;
                }
            }
            callback(error, response, body);
        });
    }

    _execute (params) {
        var url = params.url;

        this._makeRequest(params);
        this.tenSecCount++;
        this.tenMinCount++;

        logger.debug(`RiotGames Api request (${this.tenSecCount}/${TEN_SEC_MAX}) (${this.tenMinCount}/${TEN_MIN_MAX}): ${url}`);

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
            this._execute(this.buffer.shift());
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

// Construct Riot Games static api url
var constructStaticURL = function(params) {
    var path = params.path,
        region = params.region,
        version = params.version,
        query = params.query;

    var url = `https://global.api.pvp.net/api/lol/static-data/${region}/${version}/`;
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
            options: options,
            callback: function (error, response, body) {
                if (error) {
                    logger.error("Riot Games Api request failed: " + error);
                    reject(error);
                } else {
                    resolve(body);
                }
            }
        });
    });
};

var makeStaticRequest = function (params) {
    var options = {
        url: constructStaticURL(params)
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                logger.error("Riot Games Api request failed: " + error);
                reject(error);
            } else {
                body = JSON.parse(body);
                resolve(body);
            }
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

// Get champion
var getChampion = function (championID) {
    var params = {
        region: 'na',
        version: "v1.2",
        path: "champion/" + championID,
        query: {
            champData: "image"
        }
    };
    return makeStaticRequest(params);
};

// Get summoner spell
var getSummonerSpell = function (id) {
    var params = {
        region: 'na',
        version: "v1.2",
        path: "summoner-spell/" + id
    };
    return makeStaticRequest(params);
};



var getChampionImage = function (path) {
    // TODO fetch data dragon version https://developer.riotgames.com/api/methods#!/1055/3632
    return `//ddragon.leagueoflegends.com/cdn/6.16.2/img/champion/${path}`;
};

var getKeystoneMasteries = function () {
    // TODO
    return [6161, 6162, 6164, 6361, 6362, 6363, 6261, 6262, 6263];
};

var getMasteryImage = function (id) {
    // TODO fetch data dragon version https://developer.riotgames.com/api/methods#!/1055/3632
    return `//ddragon.leagueoflegends.com/cdn/6.16.2/img/mastery/${id}.png`;
};

var getItemImage = function (id) {
    // TODO fetch data dragon version https://developer.riotgames.com/api/methods#!/1055/3632
    if (id === 0) {
        return null;
    }
    return `//ddragon.leagueoflegends.com/cdn/6.16.2/img/item/${id}.png`;
};

module.exports = {
    getMatches: getMatches,
    getMatch: getMatch,
    getAccountByName: getAccountByName,
    getChampion: getChampion,
    getChampionImage: getChampionImage,
    getSummonerSpell: getSummonerSpell,
    getKeystoneMasteries: getKeystoneMasteries,
    getMasteryImage: getMasteryImage,
    getItemImage: getItemImage
};
