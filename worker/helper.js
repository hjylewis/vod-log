var dbConn = require('./lib/database');

var copyDBfromEnvs = function (start_env, end_env) {
    dbConn.getStore(start_env).then(function (store) {
        dbConn.setStore(end_env, store);
    })
}

var copyProductionDBtoDev = function () {
    copyDBfromEnvs('production', 'dev');
}


copyProductionDBtoDev();
