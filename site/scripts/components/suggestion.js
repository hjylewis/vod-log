import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './header';
import Footer from './footer';

export default React.createClass({
    render: function() {
        return (
            <DocumentTitle title='vodlog | League of Legends'>
                <div>
                    <Header />
                    <div className="page">
                        <div className="suggestion-page">
                            <div className="title">Missing Information?</div>
                            <p>If you think the vodlog is missing channel or account message, shoot us a message!</p>
                            <p>Just make sure that your email contains the necessary information:</p>
                            <ul>
                                <li>Twitch channel and IGN information</li>
                                <li>Screenshot of Twitch VOD where streamer uses that IGN</li>
                                <li>Link to Twich VOD where streamer uses that IGN</li>
                            </ul>
                        </div>
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
});
