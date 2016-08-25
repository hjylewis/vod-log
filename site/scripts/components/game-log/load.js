import React from 'react';
import classNames from 'classnames';


var GameLogLoad = React.createClass({
    render: function() {
        var classes = classNames({
            'no-more': this.props.noMore,
            'game-log-button-container': true,
            'loading': this.props.loading
        });
        return (
            <div className={classes}>
                <span className="button" onClick={this.props.onClick}>{this.props.loading ? 'Loading...' : 'Load more'}</span>
                <span className="message">No more matches</span>
            </div>
        );
    }
});

export default GameLogLoad
