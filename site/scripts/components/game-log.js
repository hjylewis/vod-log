import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import db from '../database/database.js';
import champions from '../champions';
import {camelCase} from '../util.js';

var SummaryImage = React.createClass({
    render: function () {
        return (
            <Link to={this.props.link}><img src={this.props.image}></img></Link>
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

        var image, link;
        if (this.props.type !== "champion") {
            image = player_data.champion.image;
            link = "/league/champion/" + player_data.champion.name.toLowerCase();
        } else {
            image = this.props.data.channelLogo;
            link = "/league/channel/" + this.props.data.channelID;
        }

        return (
            <div className={classes}>
                <div className="summary-image">
                    <SummaryImage image={image} link={link} />
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
                    <a target="_blank" href={this.props.data.twitch.video_url}>Watch</a>
                    <p className="small-text duration">{durationStr}</p>
                </div>
            </div>
        );
    }
});

var GameLogHead = React.createClass({
    getInitialState: function () {
        return {expanded: false};
    },
    expandToggle: function () {
        this.setState({expanded: !this.state.expanded});
    },
    render: function() {
        var classes = classNames(this.props.type, {
            "game-log-head": true,
            "empty": this.props.empty
        });
        var accounts = (this.props.headData.accounts || []).map(function (account, index) {
            return (
                <li key={index}>{account}</li>
            )
        });
        var shortAccounts;
        if (accounts.length > 4) {
            shortAccounts = accounts.slice(0,3);
            shortAccounts.push(<a key="4" onClick={this.expandToggle}>...</a>);
            accounts.push(<a key={accounts.length} onClick={this.expandToggle}><em>(less)</em></a>);
        }

        var logo = this.props.headData.logo ? <img className="logo" src={this.props.headData.logo} /> : null;
        var name = (camelCase(this.props.headData.name) || '').replace('Ad', 'AD');
        var nameElement = this.props.headData.url ? <a href={this.props.headData.url} target="_blank">{name}</a> : <span className="stripped">{name}</span>;
        var accountInfo = function () {
            if (accounts.length > 0 ) {
                return (
                    <span>
                        <div className="accounts">
                            <h3 className="accounts-header">Accounts</h3>
                            <ul>
                                {shortAccounts && !this.state.expanded ? shortAccounts : accounts}
                            </ul>
                        </div>
                        <a className="suggestion" href="/suggestion"><em>Missing information?</em></a>
                    </span>
                )
            } else {
                return null;
            }
        }.bind(this);
        return (
            <div className={classes}>
                {logo}
                <div className="info">
                    <h1>{nameElement}</h1>
                    <span className="champion-title">{camelCase(this.props.headData.championTitle)}</span>
                    {accountInfo()}
                </div>
            </div>
        );
    }
});

var GameLogBody = React.createClass({
    render: function() {
        var data = this.props.data;
        var log = data.map(function (match) {
            return (
                <GameSummary type={this.props.type} key={match.id} data={match}/>
            )
        }.bind(this));
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
        var logType = this.props.logType || {};
        var name = logType.channel || logType.champion || logType.role;
        return {
            matches: [],
            headData: {name: name},
            loading: false,
            noMore: false
        }
    },
    componentDidMount: function() {
        this.loadMatches(this.props.logType);
        this.loadHead(this.props.logType);
    },
    componentWillReceiveProps: function(nextProps) {
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
            loading: false
        });

        this.lastMatchTime = matches[matches.length - 1].creation;
    },
    loadMatches: function (dbParam, force) {
        if (this.state.loading && !force) return;
        this.setState({loading: true});
        var dbParam = dbParam || this.props.logType;
        if (dbParam) {
            dbParam.next = this.lastMatchTime;
            db.getMatchesPage(dbParam).then(function (newMatches) {
                this.addMatches(newMatches);
            }.bind(this)).catch(function (error) {
                console.error(error.stack);
            });
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
                    this.setState({headData: champion});
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
                    <GameLogHead type={type} headData={this.state.headData} empty={!this.state.matches.length}/>
                    <GameLogBody type={type} data={this.state.matches} />
                </div>
                <GameLogLoad loading={this.state.loading} noMore={this.state.noMore} onClick={() => this.loadMatches()}/>
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
    getInitialState: function () {
        return {
            logType: null
        };
    },
    componentDidMount: function () {
        champions.get(this.props.params.championKey).then(function (champion) {
            this.setState({
                logType: { champion: champion.id }
            });
        }.bind(this));
    },
    render: function () {
        return (
            <GameLog logType={this.state.logType} />
        );
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
