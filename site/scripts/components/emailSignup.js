import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div id="mc_embed_signup" className="email-signup">
                <form action="//thevodlog.us14.list-manage.com/subscribe/post?u=bc3e148a75990dcfbfb051716&amp;id=1a97eb4038" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                        <label form="mce-EMAIL">Sign up for updates about the Bootcamp!</label>
                    	<input className="email" type="email" name="EMAIL" id="mce-EMAIL" placeholder="email address" required></input>
                        <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_bc3e148a75990dcfbfb051716_1a97eb4038" tabIndex="-1" value=""></input></div>
                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"></input>
                    </div>
                </form>
            </div>
        )
    }
})
