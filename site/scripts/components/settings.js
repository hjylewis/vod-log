import React from 'react';
import classNames from 'classnames';

import settings from '../settings';

var Settings = React.createClass({
    render: function () {
        console.log(this.props.data);
        var autoplaySettings = this.props.data.autoplay || {};
        return (
            <div className={classNames({
                dropdown: true,
                hide: this.props.hide
            })}>
                <h3>Settings</h3>
                <span>Autoplay:</span> <input type="checkbox" checked={autoplaySettings.enabled}></input>
                <span>Direction:</span> <span>{autoplaySettings.directionDown ? "Down" : "Up"}</span>
            </div>
        );
    }
});

export default  React.createClass({
    getInitialState: function () {
        return {
            open: false,
            settings: {}
        };
    },
    componentDidMount: function () {
        settings.setOpen(() => {
            this.setState({ open: true });
        });
        this.setState({
            settings: settings.get()
        });
        window.addEventListener('mousedown', this.pageClick, false);
    },
    pageClick: function (e) {
        if (this.mouseIsDownOnSettings) {
            return;
        }

        this.setState({ open: false });
    },
    toggleOpen: function () {
        this.setState({ open: !this.state.open });
    },
    onMouseDown: function () {
        this.mouseIsDownOnSettings = true;
    },
    onMouseUp: function () {
        this.mouseIsDownOnSettings = false;
    },
    render: function () {
        return (
            <div className="settings" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <span onClick={this.toggleOpen} className="settings-button icon-cog"></span>
                <Settings hide={!this.state.open} data={this.state.settings}/>
            </div>
        );
    }
});
