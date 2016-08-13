import React from 'react';
import { Link } from 'react-router';


var Logo = React.createClass({
    render: function() {
        return (
            <Link to="/league"><span className="logo">VOD-LOG</span></Link>
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
