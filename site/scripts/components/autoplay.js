import React from 'react';

var AutoplayLoader = React.createClass({
    render: function () {
        var radius = this.props.radius;
        var circumference = 2 * radius * Math.PI;

        return (
            <svg className="autoplay-loader">
                <circle className="center" r="54" cx="60" cy="60"></circle>
                <circle className="progress ring" r="50" cx="60" cy="60" strokeDasharray={circumference} strokeDashoffset={circumference}></circle>
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

        var timeout = 30;

        var cancel = function () {
            this.props.cancelAutoplay();
        }.bind(this);

        return (
            <div className="twitch-autoplay-overlay" style={style}>
                <h3>Autoplay next game:</h3>
                <AutoplayLoader radius="50" timeout={timeout} play={this.props.next}/>
                <a onClick={cancel}>Cancel</a>
            </div>
        );
    }
});
