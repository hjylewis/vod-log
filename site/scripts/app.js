import React from 'react';
import { render } from 'react-dom';
import Header from './components/header.js';
import GameLog from './components/game-log.js';


var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div className="main">
                    <GameLog />
                </div>
            </div>
        );
    }
});

render(
    <App />,
    document.getElementById('app')
);
