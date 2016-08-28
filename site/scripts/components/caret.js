import React from 'react';

var Caret = React.createClass({
    render: function () {
        return (
            <div className="dropdown-caret">
                <div className="caret-outer"></div>
                <div className="caret-inner"></div>
            </div>
        );
    }
});

export default Caret;
