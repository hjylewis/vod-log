import './style/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import App from './scripts/app';
import GameLog from './scripts/components/game-log';

render((
    <Router history={browserHistory}>
        <Redirect from="/" to="league" />
        <Route path="/league" component={App}>
            <Route path="/league/channel/:channelID" component={GameLog} />
            <Route path="/league/role/:role" component={GameLog} />
            <Route path="/league/champion/:championID" component={GameLog} />
        </Route>
    </Router>
), document.getElementById('app'))
