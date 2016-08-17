import channels from './channels.js';
import matches from './matches.js';

function db () {
    var db = this;

    var libs = [matches, channels];

    libs.forEach(function (lib) {
        for (var method in lib) {
            if (lib.hasOwnProperty(method)) {
                if (db[method]) {
                    console.error("db object already has property " + method);
                } else {
                    db[method] = lib[method];
                }
            }
        }
    });
}

export default new db();
