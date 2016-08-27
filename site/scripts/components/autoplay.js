import React from 'react';

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
            if (progress > 0) {
                clearInterval(stepInterval);
            } else {
                this.setState({
                    progress: progress
                });
            }
        }.bind(this), 60);
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

        var cancel = function () {
            this.props.cancelAutoplay();
        }.bind(this);

        return (
            <div className="twitch-autoplay-overlay" style={style}>
                <h3>Autoplay next game:</h3>
                {this.props.show ? <AutoplayLoader radius="50" timeout={timeout} play={this.props.next}/> : ''}
                <a onClick={cancel}>Cancel</a>
            </div>
        );
    }
});
