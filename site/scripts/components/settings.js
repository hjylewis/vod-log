import React from 'react';
import classNames from 'classnames';

import settings from '../settings';

var Settings = React.createClass({
    render: function () {
        return (
            <div className={classNames({
                dropdown: true,
                hide: this.props.hide
            })}>
                SETTINGS
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
