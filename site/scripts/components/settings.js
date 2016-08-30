import React from 'react';
import classNames from 'classnames';

import settings from '../settings';

var Settings = React.createClass({
    render: function () {
        var autoplaySettings = this.props.data.autoplay || {};
        return (
            <div className={classNames({
                'settings-panel': true,
                dropdown: true,
                hide: this.props.hide
            })}>
                <h2>Settings</h2>
                <p><span>Open videos in new tab: </span><input type="checkbox" onChange={this.props.handleNewTabChange} checked={this.props.data.newtab || false}></input></p>
                <p><span>Autoplay:</span> <input type="checkbox" disabled={this.props.data.newtab} onChange={this.props.handleAutoplayChange} checked={autoplaySettings.enabled || false}></input></p>
                <p>
                    <span>Autoplay direction:</span>
                    <select disabled={this.props.data.newtab || !autoplaySettings.enabled} onChange={this.props.handleAutoplayDirectionChange} value={autoplaySettings.directionDown ? "down" : "up"}>
                        <option value="down">Down</option>
                        <option value="up">Up</option>
                    </select>
                </p>
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
    handleAutoplayChange: function (e) {
        this.state.settings.autoplay.enabled = e.target.checked;
        this.setState({settings: this.state.settings});
        settings.update(this.state.settings);
    },
    handleAutoplayDirectionChange: function (e) {
        this.state.settings.autoplay.directionDown = e.target.value === "down";
        this.setState({settings: this.state.settings});
        settings.update(this.state.settings);
    },
    handleNewTabChange: function (e) {
        this.state.settings.newtab = e.target.checked;
        this.setState({settings: this.state.settings});
        settings.update(this.state.settings);
    },
    render: function () {
        return (
            <div className="settings" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <span onClick={this.toggleOpen} className="settings-button icon-cog"></span>
                <Settings
                    hide={!this.state.open}
                    data={this.state.settings}
                    handleAutoplayChange={this.handleAutoplayChange}
                    handleAutoplayDirectionChange={this.handleAutoplayDirectionChange}
                    handleNewTabChange={this.handleNewTabChange}
                />
            </div>
        );
    }
});
