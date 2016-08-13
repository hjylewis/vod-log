Promise.forEach = function (array, promise) {
    var promises = [];

    array.forEach(function (item) {
        promises.push(promise(item));
    });

    return Promise.all(promises);
};

function camelCase (str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

export {
    camelCase
};
