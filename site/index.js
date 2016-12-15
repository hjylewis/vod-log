import './style/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes/index.js';

import analytics from './scripts/analytics';


var onUpdate = function () {
    //Scroll to top
    window.scrollTo(0, 0);

    // Analytics
    analytics.updatePage(window.location.pathname);
};

render((
    <Router history={browserHistory} onUpdate={onUpdate}>
        {routes}
    </Router>
), document.getElementById('app'))
