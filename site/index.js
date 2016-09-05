import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import App from './scripts/app';
import {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog} from './scripts/components/game-log/index';
import {IndexPage} from './scripts/components/indexPage';
import Suggestion from './scripts/components/suggestion';

import analytics from './scripts/analytics';


var onUpdate = function () {
    //Scroll to top
    window.scrollTo(0, 0);

    // Analytics
    analytics.updatePage(window.location.pathname);
};

render((
    <Router history={browserHistory} onUpdate={onUpdate}>
        <Redirect from="/" to="league" />
        <Route path="/league" component={App}>
            <IndexRoute component={IndexPage}/>
            <Route path="/league/channel/:channelID" component={ChannelGameLog} />
            <Route path="/league/role/:role" component={RoleGameLog} />
            <Route path="/league/champion/:championKey" component={ChampionGameLog} />
        </Route>
        <Route path="/suggestion" component={Suggestion}></Route>
    </Router>
), document.getElementById('app'))
