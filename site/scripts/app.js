import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './components/header';
import Footer from './components/footer';

export default React.createClass({
    render: function() {
        return (
            <DocumentTitle title='vodlog | League of Legends'>
                <div>
                    <Header />
                    <div className="page">
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
});
