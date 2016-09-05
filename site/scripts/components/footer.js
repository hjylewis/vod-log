import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render: function() {
        var year = new Date().getFullYear();
        return (
            <div className="footer">
                <p><a href="mailto:info@thevodlog.com">Email</a> | <a href="https://twitter.com/hjylewis">Twitter</a> | <a href="https://github.com/hjylewis/vod-log">Github</a></p>
                <p><a href="/suggestion">Help us with missing information</a></p>
                <p>&#169; {year} vodlog</p>
            </div>
        );
    }
});
