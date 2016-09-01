import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import App from './scripts/app';
import {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog} from './scripts/components/game-log/index';
import {IndexPage} from './scripts/components/indexPage';

render((
    <Router history={browserHistory}>
        <Redirect from="/" to="league" />
        <Route path="/league" component={App}>
            <IndexRoute component={IndexPage}/>
            <Route path="/league/channel/:channelID" component={ChannelGameLog} />
            <Route path="/league/role/:role" component={RoleGameLog} />
            <Route path="/league/champion/:championKey" component={ChampionGameLog} />
        </Route>
    </Router>
), document.getElementById('app'))
