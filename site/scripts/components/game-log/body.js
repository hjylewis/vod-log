import React from 'react';
import classNames from 'classnames';
import settings from '../../settings';

import GameSummary from './summary';

var GameLogBody = React.createClass({
    getInitialState: function () {
        return {
            closeVideos: () => {},
            openVideos: {}
        }
    },
    setCloseVideos: function (closeFn) {
        this.setState({
            closeVideos: closeFn
        });
    },
    addOpenVideo: function (index, openFn) {
        this.state.openVideos[index] = openFn;
        this.setState({
            openVideos: this.state.openVideos
        });
    },
    openNext: function (index) {
        var autoplaySettings = settings.get().autoplay || {};
        var next = autoplaySettings.directionDown === false ? index - 1 : index + 1;
        if (next < 0) {
            this.state.closeVideos();
            return;
        }

        if (next > this.props.data.length - 1) {
            this.props.loadMore().then(function (newMatches) {
                if (newMatches.length === 0) {
                    this.state.closeVideos();
                } else {
                    this.state.openVideos[next]();
                }
            }.bind(this))
            return;
        }

        this.state.openVideos[next]();
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
                addOpenVideo={(openFn) => this.addOpenVideo(i, openFn)}
                openNext={() => this.openNext(i)}
                last={i === data.length - 1}
                />
            )
        }.bind(this));
        return (
            <div className={classNames({
                "game-log-body": true,
                "solo": this.props.solo
            })}>
                {log}
            </div>
        );
    }
});

export default GameLogBody
