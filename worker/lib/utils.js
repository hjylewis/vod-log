var moment = require('moment');

// Format milliseconds to string
function milliToString(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + 'h' + mins + 'm' + secs + 's';
}

function convertISOtoUnix(iso) {
    return moment(iso).format('x');
}

// Adds duration to time in iso and returns unix
// Duration in seconds
function getEndTimeInUnix(iso, duration) {
    return moment(iso).add(duration, 'seconds').format('x');
}

module.exports = {
    milliToString: milliToString,
    convertISOtoUnix: convertISOtoUnix,
    getEndTimeInUnix: getEndTimeInUnix
};
