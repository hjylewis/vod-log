import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import db from '../database.js';
import {camelCase} from '../util.js';

var ChampionImage = React.createClass({
    render: function () {
        var link = "/league/champion/" + this.props.id;
        return (
            <Link to={link}><img className="champion-image" src={this.props.image}></img></Link>
        )
    }
});

var SummonerSpells = React.createClass({
    render: function () {
        var spell1Classes = classNames(this.props.spell1, "spell");
        var spell2Classes = classNames(this.props.spell2, "spell");
        return (
            <div className="summoner-spells">
                <div className="icon">
                    <div className={spell1Classes}/>
                </div>
                <div  className="icon">
                    <div className={spell2Classes}/>
                </div>
            </div>
        )
    }
});

var KeystoneImage = React.createClass({
    render: function () {
        return (
            <img className="keystone-image icon" src={this.props.image}></img>
        )
    }
});

var Items = React.createClass({
    render: function () {
        var items = this.props.items.map(function (item, i) {
            if (!item) {
                return (
                    <img className="icon" key={i}></img>
                )
            }
            return (
                <img className="icon" src={item} key={i}></img>
            )
        })
        var lastItem = items.pop();
        return (
            <div className="items">
                <span className="main-items">{items}</span>
                <span className="last-item">{lastItem}</span>
            </div>
        )
    }
});

var IconStrip = React.createClass({
    render: function () {
        return (
            <div className="icon-strip">
                <SummonerSpells spell1={this.props.player.spell1} spell2={this.props.player.spell2} />
                <KeystoneImage image={this.props.player.keystone.image} />
                <Items items={this.props.player.stats.items} />
            </div>
        )
    }
});

var GameSummary = React.createClass({
    render: function() {
        var channel = camelCase(this.props.data.channelID);
        var channelLink = "/league/channel/" + this.props.data.channelID;

        var match_data = this.props.data.match_data;
        var player_data = match_data.player_data;

        var kda = `${player_data.stats.kills}/${player_data.stats.deaths}/${player_data.stats.assists}`;
        var duration = moment.duration(match_data.duration, 'seconds');
        var durationStr = duration.minutes() + "m " + duration.seconds() + "s";
        var creation = moment(match_data.creation).fromNow();
        var patch = /^[0-9]+\.[0-9]+/.exec(match_data.matchVersion);
        var role = camelCase(player_data.role).replace('Ad', 'AD');
        var roleLink = '/league/role/' + role.toLowerCase();

        var classes = classNames({
            'game-summary': true,
            'win': match_data.win,
            'loss': !match_data.win
        });

        return (
            <div className={classes}>
                <div className="summary-image">
                    <ChampionImage image={player_data.champion.image} id={player_data.championId} />
                </div>
                <div className="summary-detail">
                    <p><Link to={channelLink}>{channel}</Link></p>
                    <div className="bar"></div>
                    <p><Link to={roleLink}>{role}</Link></p>
                    <div className="bar"></div>
                    <p>{kda}</p>
                </div>
                <IconStrip player={player_data}/>
                <div className="watch-button">
                    <p className="small-text creation">{creation}</p>
                    <a target="_blank" href={this.props.data.video_url}>Watch</a>
                    <p className="small-text duration">{durationStr}</p>
                </div>
            </div>
        );
    }
});

var GameLogHead = React.createClass({
    render: function() {
        return (
            <div className="game-log-head">
                Log head
            </div>
        );
    }
});

var GameLogBody = React.createClass({
    render: function() {
        var data = this.props.data;
        var log = data.map(function (match) {
            return (
                <GameSummary key={match.id} data={match}/>
            )
        });
        return (
            <div className="game-log-body">
                {log}
            </div>
        );
    }
});

var GameLogLoad = React.createClass({
    render: function() {
        var classes = classNames({
            'no-more': this.props.noMore,
            'game-log-button-container': true,
            'loading': this.props.loading
        });
        return (
            <div className={classes}>
                <span className="button" onClick={this.props.onClick}>{this.props.loading ? 'Loading...' : 'Load more'}</span>
                <span className="message">No more matches</span>
            </div>
        );
    }
});

var GameLog = React.createClass({
    getInitialState: function () {
        return {
            matches: [],
            loading: false,
            noMore: false
        }
    },
    componentDidMount: function() {
        this.loadMatches();
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
            loading: false
        });

        this.lastMatchTime = matches[matches.length - 1].creation;
    },
    loadMatches: function () {
        if (this.state.loading) return;
        this.setState({loading: true});
        var dbParam = this.props.logType;
        dbParam.next = this.lastMatchTime;
        db.getMatchesPage(dbParam).then(function (newMatches) {
            this.addMatches(newMatches);
        }.bind(this)).catch(function (error) {
            console.error(error.stack);
        });
    },
    render: function() {
        return (
            <div className="game-log">
                <div className="game-log-main">
                    <GameLogHead />
                    <GameLogBody data={this.state.matches} />
                </div>
                <GameLogLoad loading={this.state.loading} noMore={this.state.noMore} onClick={this.loadMatches}/>
            </div>
        );
    }
});

// GameLog Wrappers
var IndexGameLog = React.createClass({
    render: function () {
        var logType = {};
        return (
            <GameLog logType={logType} />
        )
    }
});

var ChannelGameLog = React.createClass({
    render: function () {
        var logType = {
            channel: this.props.params.channelID
        };
        return (
            <GameLog logType={logType} />
        )
    }
});

var ChampionGameLog = React.createClass({
    render: function () {
        var logType = {
            champion: this.props.params.championID
        };
        return (
            <GameLog logType={logType} />
        )
    }
});

var RoleGameLog = React.createClass({
    render: function () {
        var logType = {
            role: this.props.params.role.toUpperCase()
        };
        return (
            <GameLog logType={logType} />
        )
    }
});

export {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog}
