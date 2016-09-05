import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render: function() {
        var year = new Date().getFullYear();
        return (
            <div className="footer">
                <p>Email | <a href="https://twitter.com/hjylewis">Twitter</a> | <a href="https://github.com/hjylewis/vod-log">Github</a></p>
                <p>&#169; {year} vodlog</p>
            </div>
        );
    }
});
