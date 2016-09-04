import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import App from './scripts/app';
import {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog} from './scripts/components/game-log/index';
import {IndexPage} from './scripts/components/indexPage';
import Suggestion from './scripts/components/suggestion';

render((
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
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
