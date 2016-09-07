import React from 'react';

import settings from '../settings';
import analytics from '../analytics';

var AutoplayLoader = React.createClass({
    getInitialState: function () {
        this.radius = this.props.radius;
        this.circumference = 2 * this.radius * Math.PI;
        return {
            progress: 0
        }
    },
    componentDidMount: function () {
        var step = 1 / (this.props.timeout * 1000 / 60);
        console.log(step);
        var stepInterval = setInterval(function () {
            var progress = this.state.progress + step;
            if (progress > 1) {
                clearInterval(stepInterval);
                this.props.play();
                return;
            }
            this.setState({
                progress: progress
            });
        }.bind(this), 60);

        this.props.setCancel(function () {
            clearInterval(stepInterval);
        });
    },
    render: function () {
        var offset = this.circumference * (1 - this.state.progress);
        return (
            <svg className="autoplay-loader">
                <circle className="center" r={parseInt(this.radius) + 4} cx="60" cy="60"></circle>
                <circle className="progress ring" r={this.radius} cx="60" cy="60" strokeDasharray={this.circumference} strokeDashoffset={offset}></circle>
                <polygon onClick={this.props.play} className="play-button" points="80,47.5 60,82.5 40,47.5"></polygon>
            </svg>
        )
    }
});

export default React.createClass({
    render: function () {
        var style = this.props.show ? {} : {
            display: 'none'
        };

        var timeout = 10;
        var cancelLoader;

        var setCancel = function (fn) {
            cancelLoader = fn;
        }

        var play = function () {
            if (cancelLoader) {
                cancelLoader();
            }
            analytics.autoplayVideo();
            this.props.next();
        }.bind(this);

        var cancel = function () {
            if (cancelLoader) {
                cancelLoader();
            }
            analytics.autoplayCancelVideo();
            this.props.cancelAutoplay();
        }.bind(this);

        var openSettings = function () {
            window.scrollTo(0, 0);
            settings.open();
        }

        return (
            <div className="twitch-autoplay-overlay" style={style}>
                <h3>Autoplay next game:</h3>
                {this.props.show ? <AutoplayLoader radius="50" setCancel={setCancel} timeout={timeout} play={play}/> : ''}
                <a onClick={cancel}>Cancel</a>
            </div>
        );
    }
});
