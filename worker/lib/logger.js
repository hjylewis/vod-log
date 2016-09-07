var env = require("../../env.json").worker_env || 'dev';

log = function (log) {
    console.log(log);
};

error = function (err) {
    console.error(err);
};

debug = function (log) {
    if (env === 'dev') {
        console.log(log);
    }
};



module.exports = {
    log,
    error,
    debug
};
