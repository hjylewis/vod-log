import connection from './connection.js';


function accounts () {
    var accounts = this;

    accounts.getAccount = function (id) {
        var ref = connection.store + "/accounts/" + id;
        return connection.getData(ref);
    };

}

export default new accounts();
