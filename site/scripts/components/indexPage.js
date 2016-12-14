import React from 'react';
import {IndexGameLog} from './game-log/index.js';
import { Link } from 'react-router';

import channels from '../database/channels';

var ActionButton = React.createClass({
    getInitialState: function () {
        return {
            channel: null
        };
    },
    componentDidMount: function () {
        channels.getAllChannelKeys().then(function (channels_ids) {
            var index = Math.floor(Math.random() * channels_ids.length);
            channels.getChannel(channels_ids[index]).then(function(channel) {
                this.setState({channel: channel});
            }.bind(this));
        }.bind(this));
    },
    render: function () {
        return (
            <span>
                {this.state.channel ?
                    <Link className="korean-bootcamp-btn" to={"/league/channel/" + this.state.channel.name}>Check out {this.state.channel.displayName}'s VODs</Link> :
                    ""
                }
            </span>
        );
    }
});

var IndexPage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="hero">
                    <div className="hero-content">
                        <div className="title">SKIP TO THE GOOD PARTS</div>
                        <div className="subtitle">
                            <h3>Tired of watching streamers in queue and not in game?</h3>
                            <h3>Watch the VODs worth watching</h3>
                            <ActionButton />
                        </div>
                    </div>
                </div>
                <div className="main">
                    <IndexGameLog />
                </div>
            </div>
        );
    }
});

export {IndexPage}
