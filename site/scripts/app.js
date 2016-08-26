import React from 'react';
import Header from './components/header';

export default React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
