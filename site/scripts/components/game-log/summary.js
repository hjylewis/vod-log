import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import {camelCase} from '../../util';
import modes from '../../modes';
import settings from '../../settings';
import analytics from '../../analytics';

import AutoplayOverlay from '../autoplay';
import DefaultImg from '../defaultImg';


var SummaryImage = React.createClass({
    render: function () {
        return (
            <Link to={this.props.link}>
                {this.props.image ?
                    <img src={this.props.image}></img> :
                    <DefaultImg />
                }
            </Link>
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
        if (!Array.isArray(this.props.items)) {
            throw "Items should be an array";
        }

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
                <Items items={this.props.player.stats.items || []} />
            </div>
        )
    }
});

var OtherChannelsList = React.createClass({
    render: function () {
        var channels = this.props.channels.map(function (channel) {
            var href = "/league/channel/" + channel.id;
            return (
                <Link key={channel.id} to={href}>{channel.displayName}</Link>
            );
        })

        return (
            <div className="other-channels">
                <span>In game with: </span>
                {channels}
            </div>
        )
    }
});

var GameSummary = React.createClass({
    getInitialState: function () {
        return {
            video: null,
            autoplayShow: false,
            fullscreen: false
        };
    },
    componentDidMount: function () {
        this.props.addOpenVideo(function () {
            this.openVideo();
        }.bind(this));
    },
    openVideo: function (event) {
        analytics.playVideo();
        if (!!Twitch && !settings.get().newtab) {
            if (event) event.preventDefault();
            if (!this.state.video) {
                this.props.closeVideos();

                if (modes.getMode('fullscreen')) {
                    this.toggleFullscreen();
                }

                var twitchID = this.props.data.twitch.id;
                var elementID = "twitch-" + this.props.data.id;

                var width = this.refs.gameSummary.offsetWidth || 550;
                var height = width / (16/9);
                var options = {
                    width: width,
                    height: height,
                    video: twitchID,
                    time: this.props.data.twitch.timestamp_s + "s",
                    allowfullscreen: false
                };
                var player = new Twitch.Player(elementID, options);
                var interval = setInterval(function () {
                    if (player.getCurrentTime() > (this.props.data.twitch.end_timestamp_s + 60)){
                        var autoplaySettings = settings.get().autoplay || {};
                        if (autoplaySettings.enabled) {
                            this.setState({
                                autoplayShow: true
                            })
                        }
                        clearInterval(interval);
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
        analytics.closeVideo();

        this.state.video.player.destroy();
        clearInterval(this.state.video.interval);
        this.setState({
            video: null,
            autoplayShow: false
        });
        if (this.state.fullscreen) {
            this.closeFullscreen();
        }
        this.props.setCloseVideos(() => {});
    },
    cancelAutoplay: function () {
        clearInterval(this.state.video.interval);
        this.setState({autoplayShow: false});
    },
    toggleFullscreen: function () {
        var mode = !this.state.fullscreen;
        if (mode) {
            document.onkeydown = function (e) {
                if (e.keyCode === 27) {
                    this.toggleFullscreen();
                }
            }.bind(this);
        } else {
            document.onkeydown = () => {};
        }

        analytics.fullscreenVideo(mode);
        modes.setMode('fullscreen', mode);
        this.setState({
            fullscreen: mode
        });
    },
    closeFullscreen: function () {
        document.onkeydown = () => {};
        this.setState({ fullscreen: false });
    },
    render: function() {
        var channel = this.props.data.channel.displayName;
        var channelLink = "/league/channel/" + this.props.data.channel.id;
        var match_data = this.props.data.match_data;
        var player_data = match_data.player_data;

        var kda = `${player_data.stats.kills}/${player_data.stats.deaths}/${player_data.stats.assists}`;
        var duration = moment.duration(match_data.duration, 'seconds');
        var durationStr = duration.minutes() + "m " + duration.seconds() + "s";
        var creation = moment(match_data.creation).fromNow();
        var patch = /^[0-9]+\.[0-9]+/.exec(match_data.matchVersion);
        var role = player_data.role ? camelCase(player_data.role).replace('Ad', 'AD') : '';
        var roleLink = '/league/role/' + role.toLowerCase();

        var summaryClasses = classNames({
            'game-summary': true,
            'win': match_data.win,
            'loss': !match_data.win
        });

        var containerClasses = classNames({
            'game-summary-container': true,
            'last': this.props.last,
            'open': this.state.video
        })

        var image, link;
        if (this.props.type !== "champion") {
            image = player_data.champion.image;
            link = "/league/champion/" + player_data.champion.name.toLowerCase();
        } else {
            image = this.props.data.channelLogo;
            link = "/league/channel/" + this.props.data.channel.id;
        }

        return (
            <div className={containerClasses}>
                <div className={summaryClasses} ref="gameSummary">
                    <div className="game-summary-main">
                        <div className="summary-image">
                            <SummaryImage image={image} link={link} />
                        </div>
                        <div className="summary-detail">
                            <p><Link to={channelLink}>{channel}</Link></p>
                            <div className="rule"></div>
                            <p><Link to={roleLink}>{role}</Link></p>
                            <div className="rule"></div>
                            <p>{kda}</p>
                        </div>
                        <IconStrip player={player_data}/>
                        <div className="watch-button">
                            <p className="small-text creation">{creation}</p>
                            <a target="_blank" onClick={this.openVideo} href={this.props.data.twitch.video_url} rel="nofollow">
                                {this.state.video ? "Close" : "Watch"}
                            </a>
                            <p className="small-text duration">{durationStr}</p>
                        </div>
                    </div>
                    {match_data.otherChannels ? <OtherChannelsList channels={match_data.otherChannels} /> : ''}
                </div>
                <div
                    id={"twitch-" + this.props.data.id}
                    className={classNames('twitch-container', {'fullscreen': this.state.fullscreen})}
                    ref="twitchContainer"
                >
                    <AutoplayOverlay show={this.state.autoplayShow} next={this.props.openNext} cancelAutoplay={this.cancelAutoplay}/>
                    <a onClick={this.toggleFullscreen} className="fullscreen-button">
                        <svg className="player-icon-fullscreen">
                            {!this.state.fullscreen ?
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/twitch.svg#icon_fullscreen"></use> :
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/twitch.svg#icon_unfullscreen"></use>}
                        </svg>
                    </a>
                </div>
            </div>
        );
    }
});

export default GameSummary;
