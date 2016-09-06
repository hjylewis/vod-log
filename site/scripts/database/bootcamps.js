import connection from './connection.js';


function bootcamps () {
    var bootcamps = this;

    bootcamps.getBootcamp = function (id) {
        var ref = connection.store + "/bootcamps/" + id;
        return connection.getData(ref);
    };

    bootcamps.getAllBootcamps = function () {
        var ref = connection.store + "/bootcamps";
        return connection.getData(ref);
    };

}

export default new bootcamps();
