"use strict";

const express = require('express');
const path = require('path');

const renderToString = require('react-dom/server').renderToString;
const match = require('react-router').match;
const RouterContext = require('react-router').RouterContext;

const routes = require('./site/build/routes.js');

require('node-jsx').install();

const app = express();

app.use(express.static(path.join(__dirname, 'site/build')));
app.set('views', path.join(__dirname, 'site/views'));
app.set('view engine', 'ejs');

app.get('*', function(req, res) {
    res.render('index', {app: "this is the app"});

    match({ routes, location: req.url }, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            res.status(200).send(renderToString(new RouterContext (renderProps)));
        } else {
            res.status(404).send('Not found');
        }
    });
});

app.listen(8080);
console.log("Server running on port 8080");
