"use strict";

var path = require('path');
var fs = require('fs');

var env = require("../../env.json").worker_env || 'dev';
var moment = require('moment');


class Logger {
    constructor (env) {
        this.env = env;
        this.logDir = path.join(__dirname, '../../logs');

        if (this.env === 'production') {
            this._openFile();
            this._addHeaderToFile();

            this._cleanUp();
        }
    }

    _openFile () {
        if (this.env !== 'production') {
            console.warn("Worker is not in production mode.");
        }

        if (!fs.existsSync(this.logDir)){
            fs.mkdirSync(this.logDir);
        }

        this.date = moment().format('YYYY-MM-DD');
        var filePath = path.join(this.logDir, this.date);
        this.file = fs.openSync(filePath, 'a');
    }

    _addToFile (log) {
        if (this.file) {
            log = log + '\n';
            fs.writeSync(this.file, log);
        } else {
            throw "File Not Open";
        }
    }

    _cleanUp () {
        if (this.env !== 'production') {
            console.warn("Worker is not in production mode.");
        }

        fs.readdir(this.logDir, (err, files)=> {
            if (err) {
                console.error(err);
                return;
            }

            var monthAgo = moment().subtract(1, 'months');
            files.forEach((file) => {
                var date = moment(file, 'YYYY-MM-DD');
                var old = date.isBefore(monthAgo);

                if (old) {
                    var filePath = path.join(this.logDir, file);
                    fs.unlink(filePath);
                }
            });
        });
    }

    _addHeaderToFile () {
        var top_bar = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>';
        var bot_bar = '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<';

        this.time = moment().format('HH:mm:ss');

        var header = top_bar + '\n' + this.time + '\n' + bot_bar;
        this._addToFile(header);
    }

    error (err) {
        if (this.env === 'production') this._addToFile(err);
        console.error(err);
    }

    debug (log) {
        if (this.env === 'production') this._addToFile(log);
        if (this.env === 'dev') {
            console.log(log);
        }
    }

    dateAndTime () {
        console.log(this.date + ' ' + this.time);
    }

    close () {
        fs.close(this.file);
    }
}

module.exports = new Logger(env);
