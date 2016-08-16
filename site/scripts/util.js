Promise.forEach = function (array, promise) {
    var promises = [];

    array.forEach(function (item) {
        promises.push(promise(item));
    });

    return Promise.all(promises);
};

function camelCase (str) {
    var words = str.split(' ');
    words = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
    return words.join(' ');
}

export {
    camelCase
};
