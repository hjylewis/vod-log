import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import {camelCase} from '../../util.js';

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

export default GameLogBody
