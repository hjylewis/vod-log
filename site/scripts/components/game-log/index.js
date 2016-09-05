import React from 'react';
import DocumentTitle from 'react-document-title';

import db from '../../database/database.js';
import champions from '../../champions';
import channels from '../../database/channels';

import GameLogHead from './head';
import GameLogBody from './body';
import GameLogLoad from './load';

var GameLog = React.createClass({
    getInitialState: function () {
        var logType = this.props.logType || {};
        var name = logType.channel || logType.role || logType.name;
        return {
            matches: [],
            headData: {name: name},
            loading: false,
            noMore: false
        }
    },
    componentDidMount: function() {
        this.lastMatchTime = null;
        this.loadMatches(this.props.logType);
        this.loadHead(this.props.logType);
    },
    componentWillReceiveProps: function(nextProps) {
        var logType = nextProps.logType || {};
        this.lastMatchTime = null;
        this.setState({
            matches: [],
            headData: {name: logType.channel || logType.role || logType.name},
            loading: false,
            noMore: false
        });
        this.loadMatches(nextProps.logType, true);
        this.loadHead(nextProps.logType);
    },
    addMatches: function (newMatches) {
        var matches = this.state.matches;
        if (newMatches.length === 0) {
            return this.setState({
                loading: false,
                noMore: true
            });
        }

        matches = matches.concat(newMatches)
        this.setState({
            matches: matches,
            loading: false,
            noMore: false
        });

        this.lastMatchTime = matches[matches.length - 1].creation;
    },
    loadMatches: function (dbParam, force) {
        if (this.state.loading && !force) return;
        this.setState({loading: true});
        var dbParam = dbParam || this.props.logType;
        if (dbParam) {
            dbParam.next = this.lastMatchTime;
            if (dbParam.channel || dbParam.champion || dbParam.role || dbParam.all) {
                return db.getMatchesPage(dbParam).then(function (newMatches) {
                    this.addMatches(newMatches);
                    return newMatches;
                }.bind(this)).catch(function (error) {
                    console.error(error.stack);
                });
            }
        }
    },
    loadHead: function (logType) {
        if (logType) {
            if (logType.channel) {
                db.getChannelHead(logType.channel).then(function (channel) {
                    this.setState({headData: channel});
                }.bind(this));
            } else if (logType.champion) {
                champions.getChampionHead(logType.champion).then(function (champion) {
                    if (champion) {
                        this.setState({headData: champion});
                    }
                }.bind(this));
            } else if (logType.role) {

            }
        }
    },
    render: function() {
        var logType = this.props.logType || {};
        var type;
        if (logType.channel) {
            type = "channel";
        } else if (logType.champion) {
            type = "champion"
        } else if (logType.role) {
            type = "role"
        }

        return (
            <div className="game-log">
                <div className="game-log-main">
                    {!this.props.logType.noHeader ? <GameLogHead type={type} headData={this.state.headData} empty={!this.state.matches.length}/> : ''}
                    <GameLogBody solo={this.props.logType.noHeader} type={type} data={this.state.matches} loadMore={this.loadMatches}/>
                </div>
                <GameLogLoad loading={this.state.loading} noMore={this.state.noMore} onClick={() => this.loadMatches()}/>
            </div>
        );
    }
});

// GameLog Wrappers
var IndexGameLog = React.createClass({
    render: function () {
        var logType = { all: true, noHeader: true };
        return (
            <GameLog logType={logType} />
        )
    }
});

var ChannelGameLog = React.createClass({
    getInitialState: function () {
        return {
            channel: this.props.params.channelID
        };
    },
    componentDidMount: function () {
        channels.getChannel(this.props.params.channelID).then(function (channel) {
            this.ready = true;
            this.setState({channel: channel.displayName});
        }.bind(this));
    },
    componentWillReceiveProps: function (newProps) {
        this.ready = false;
        channels.getChannel(newProps.params.channelID).then(function (channel) {
            this.ready = true;
            this.setState({channel: channel.displayName});
        }.bind(this));
    },
    render: function () {
        var logType = {
            name: this.props.params.channelID,
            channel: this.ready ? this.props.params.channelID : null
        };
        return (
            <DocumentTitle title={"vodlog | " + this.state.channel}>
                <div className="main">
                    <GameLog logType={logType} />
                </div>
            </DocumentTitle>
        )
    }
});

var ChampionGameLog = React.createClass({
    getInitialState: function () {
        return {
            logType: { name: this.props.params.championKey }
        };
    },
    componentDidMount: function () {
        champions.get(this.props.params.championKey).then(function (champion) {
            this.setState({
                logType: {
                    champion: champion.id,
                    name: this.props.params.championKey
                 }
            });
        }.bind(this));
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            logType: { name: newProps.params.championKey }
        });
        champions.get(newProps.params.championKey).then(function (champion) {
            this.setState({
                logType: {
                    champion: champion.id,
                    name: newProps.params.championKey
                }
            });
        }.bind(this));
    },
    render: function () {
        return (
            <DocumentTitle title={"vodlog | " + this.props.params.championKey}>
                <div className="main">
                    <GameLog logType={this.state.logType} />
                </div>
            </DocumentTitle>
        );
    }
});

var RoleGameLog = React.createClass({
    render: function () {
        var logType = {
            role: this.props.params.role.toUpperCase()
        };
        return (
            <DocumentTitle title={"vodlog | " + logType.role.toLowerCase()}>
                <div className="main">
                    <GameLog logType={logType} />
                </div>
            </DocumentTitle>
        )
    }
});

export {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog}
