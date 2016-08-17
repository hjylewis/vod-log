import matches from './matches.js';

function db () {
    var db = this;

    for (var method in matches) {
        if (matches.hasOwnProperty(method)) {
            if (db[method]) {
                console.error("db object already has property " + method);
            } else {
                db[method] = matches[method];
            }
        }
    }
}

export default new db();
