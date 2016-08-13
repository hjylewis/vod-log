import React from 'react';

var Logo = React.createClass({
    render: function() {
        return (
            <span className="logo">VOD-LOG</span>
        );
    }
});

var Search = React.createClass({
    render: function() {
        return (
            <span className="search">Search</span>
        );
    }
});

export default React.createClass({
    render: function() {
        return (
            <div className="header">
                <Logo />
                <Search />
            </div>
        );
    }
});
