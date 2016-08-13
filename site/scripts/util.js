Promise.forEach = function (array, promise) {
    var promises = [];

    array.forEach(function (item) {
        promises.push(promise(item));
    });

    return Promise.all(promises);
};
