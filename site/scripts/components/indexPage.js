import React from 'react';
import {IndexGameLog} from './game-log/index.js';
import { Link } from 'react-router';

import channels from '../database/channels';

var IndexPage = React.createClass({
    getInitialState: function () {
        return {
            channel: null
        };
    },
    componentDidMount: function () {
        channels.getAllChannels().then(function (channels) {
            var channels_ids = Object.keys(channels);
            var index = Math.floor(Math.random() * channels_ids.length);
            var channel = channels[channels_ids[index]];
            this.setState({channel: channel});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <div className="hero">
                    <div className="hero-content">
                        <div className="title">SKIP TO THE GOOD PARTS</div>
                        <div className="subtitle">
                            <h3>Tired of watching streamers in queue and not in game?</h3>
                            <h3>Watch the VODs worth watching</h3>
                            {this.state.channel ?
                                <Link className="korean-bootcamp-btn" to={"/league/channel/" + this.state.channel.name}>Check out {this.state.channel.displayName}'s VODs</Link> :
                                ""
                            }

                        </div>
                    </div>
                </div>
                <div className="main">
                    {this.state.channel ? <IndexGameLog /> : ""}
                </div>
            </div>
        );
    }
});

export {IndexPage}
