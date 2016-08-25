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
    getInitialState: function () {
        return {
            video: null
        };
    },
    openVideo: function (event) {
        if (!!Twitch) {
            event.preventDefault();
            if (!this.state.video) {
                this.props.closeVideos();

                var twitchID = this.props.data.twitch.id;
                var elementID = "twitch-" + this.props.data.id;

                var width = this.refs.gameSummary.offsetWidth || 550;
                var height = width / (16/9);
                var options = {
                    width: width,
                    height: height,
                    video: twitchID,
                    time: this.props.data.twitch.timestamp_s + "s"
                };
                var player = new Twitch.Player(elementID, options);
                var interval = setInterval(function () {
                    if (player.getCurrentTime() > this.props.data.twitch.end_timestamp_s){
                        // TODO
                        this.closeVideo();
                    }
                }.bind(this),1000);
                this.setState({
                    video: {player, interval}
                });

                this.props.setCloseVideos(function () {
                    this.closeVideo();
                }.bind(this));
            } else {
                this.closeVideo();
            }
        }
    },
    closeVideo: function () {
        if (!this.state.video) return;

        this.state.video.player.destroy();
        clearInterval(this.state.video.interval);
        this.setState({
            video: null
        });
        this.props.setCloseVideos(() => {});
    },
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
            'loss': !match_data.win,
            'last': this.props.last
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
            <div>
                <div className={classes} ref="gameSummary">
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
                        <a target="_blank" onClick={this.openVideo} href={this.props.data.twitch.video_url}>{this.state.video ? "Close" : "Watch"}</a>
                        <p className="small-text duration">{durationStr}</p>
                    </div>
                </div>
                <div id={"twitch-" + this.props.data.id}></div>
            </div>
        );
    }
});

var GameLogBody = React.createClass({
    getInitialState: function () {
        return {
            closeVideos: () => {}
        }
    },
    setCloseVideos: function (closeFn) {
        this.setState({
            closeVideos: closeFn
        });
    },
    render: function() {
        var data = this.props.data;
        var log = data.map(function (match, i) {
            return (
                <GameSummary
                type={this.props.type}
                key={match.id} data={match}
                closeVideos={this.state.closeVideos}
                setCloseVideos={this.setCloseVideos}
                last={i === data.length - 1}/>
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
