import React from 'react';
import { Link } from 'react-router';

import Search from './search';


var Logo = React.createClass({
    render: function() {
        return (
            <Link to="/league"><span className="logo">VOD-LOG</span></Link>
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
