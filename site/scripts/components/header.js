import React from 'react';
import { Link } from 'react-router';

import Search from './search';
import Settings from './settings';



var Logo = React.createClass({
    render: function() {
        return (
            <Link to="/league"><span className="logo">VODLOG</span></Link>
        );
    }
});

export default React.createClass({
    render: function() {
        return (
            <div className="header">
                <Logo />
                <Settings />
                <Search />
            </div>
        );
    }
});
