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
                            <div className="body">
                                <p>If you think the vodlog is missing a streamer or an associated account, shoot us a <a href="mailto:info@thevodlog.com">message</a>!</p>
                                <br />
                                <p>Just make sure that your email contains the necessary information:</p>
                                <ul>
                                    <li>Twitch channel, IGN information, and region</li>
                                    <li>Screenshot of Twitch VOD where streamer uses that IGN</li>
                                    <li>Link to Twich VOD where streamer uses that IGN (with the relevant timestamp)</li>
                                </ul>
                                <br />
                                <p>Suggestions without the necessary information will be ignored.</p>
                                <br />
                                <p>Thanks for all your help!</p>
                                <p><a href="mailto:info@thevodlog.com">info@thevodlog.com</a></p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
});
