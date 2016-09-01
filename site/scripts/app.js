import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './components/header';

export default React.createClass({
    render: function() {
        return (
            <DocumentTitle title='vodlog | League of Legends'>
                <div>
                    <Header />
                    {this.props.children}
                </div>
            </DocumentTitle>
        );
    }
});
