import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import db from '../database.js';

var ChampionImage = React.createClass({
    render: function () {
        return (
            <img className="champion-image" src={this.props.image}></img>
        )
    }
});

var SummonerSpells = React.createClass({
    render: function () {
        return (
            <div className="summoner-spells">
                <div className={this.props.spell1}/>
                <div className={this.props.spell2}/>
            </div>
        )
    }
});

var KeystoneImage = React.createClass({
    render: function () {
        return (
            <img className="keystone-image" src={this.props.image}></img>
        )
    }
});

var Items = React.createClass({
    render: function () {
        var items = this.props.items.map(function (item, i) {
            if (!item) {
                return (
                    <img key={i}></img>
                )
            }
            return (
                <img src={item} key={i}></img>
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
    onClick: function () {
        var url = this.props.data.video_url;

        // Open in new tab
        var win = window.open(url, '_blank');
        win.focus();
    },
    render: function() {
        var match_data = this.props.data.match_data;
        var player_data = match_data.player_data;

        var kda = `${player_data.stats.kills}/${player_data.stats.deaths}/${player_data.stats.assists}`;
        var duration = moment.duration(match_data.duration, 'seconds');
        var durationStr = duration.minutes() + "m " + duration.seconds() + "s";
        var creation = moment(match_data.creation).fromNow();
        var patch = /^[0-9]+\.[0-9]+/.exec(match_data.matchVersion);
        var role = player_data.role;
        role = role.charAt(0).toUpperCase() + role.substr(1).toLowerCase();

        var classes = classNames({
            'game-summary': true,
            'win': match_data.win,
            'loss': !match_data.win
        });
        return (
            <div onClick={this.onClick} className={classes}>
                <div className="summary-image">
                    <ChampionImage image={player_data.champion.image} />
                </div>
                <div className="summary-detail">
                    <p>Role: {role}</p>
                    <p>KDA: {kda}</p>
                    <p>Duration: {durationStr}</p>
                    <p>Creation: {creation}</p>
                    <p>Patch: {patch}</p>
                </div>
                <IconStrip player={player_data}/>
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
            'no-more': this.props.noMore
        })
        return (
            <button className={classes} onClick={this.props.onClick}>{this.props.loading ? 'Loading...' : 'Load more'}</button>
        );
    }
});

export default React.createClass({
    getInitialState: function () {
        return {
            matches: [],
            loading: true,
            noMore: false
        }
    },
    componentDidMount: function() {
        this.setState({loading: true});
        db.getChannelMatches(this.props.params.channelID).then(function (matches) {
            this.addMatches(matches);
        }.bind(this)).catch(function (error) {
            console.error(error.stack);
        });
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
    loadMore: function () {
        this.setState({loading: true});
        db.getChannelMatches(this.props.params.channelID, this.lastMatchTime).then(function (newMatches) {
            this.addMatches(newMatches);
        }.bind(this)).catch(function (error) {
            console.error(error.stack);
        });
    },
    render: function() {
        return (
            <div className="game-log">
                <GameLogHead />
                <GameLogBody data={this.state.matches} />
                <GameLogLoad loading={this.state.loading} noMore={this.state.noMore} onClick={this.loadMore}/>
            </div>
        );
    }
});
