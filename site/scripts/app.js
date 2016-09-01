import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './components/header';

export default React.createClass({
    render: function() {
        return (
            <DocumentTitle title='vodlog | League of Legends'>
                <div>
                    <Header />
                    <div className="page">
                        {this.props.children}
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});
