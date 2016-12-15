import React from 'react';
import { Route, Redirect, IndexRoute, createRoutes } from 'react-router';

import App from '../scripts/app';
import {ChannelGameLog, ChampionGameLog, RoleGameLog, BootcampGameLog} from '../scripts/components/game-log/index';
import {IndexPage} from '../scripts/components/indexPage';
import Suggestion from '../scripts/components/suggestion';

export default createRoutes([
    <Redirect from="/" to="league" />,
    <Route path="/league" component={App}>
        <IndexRoute component={IndexPage}/>
        <Route path="/league/channel/:channelID" component={ChannelGameLog} />
        <Route path="/league/role/:role" component={RoleGameLog} />
        <Route path="/league/champion/:championKey" component={ChampionGameLog} />
        <Route path="/league/bootcamp/:bootcampKey" component={BootcampGameLog} />
    </Route>,
    <Route path="/suggestion" component={Suggestion}></Route>
]);
