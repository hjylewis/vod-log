import env from './environment';
import timer from './timer';

var ga;

// Analytics
if (env === 'production') {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga = (...args) => {
        window.ga(...args);
    };

    console.log("analytics on");

    ga('create', 'UA-83616899-1', 'auto');
} else {
    ga = function () {
        return;
    };
}

var updatePage = function (page) {
    ga('set', 'page', page);
    ga('send', 'pageview');
};

var playVideo = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'play'
    });
};

var closeVideo = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'close'
    });
};

var autoplayVideo = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'autoplay'
    });
};

var autoplayCancelVideo = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'autoplayCancel'
    });
};

var fullscreenVideo = function (on) {
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video',
        eventAction: 'fullscreen',
        eventValue: on
    });
};

var search = function (query) {
    ga('send', {
        hitType: 'event',
        eventCategory: 'SearchBar',
        eventAction: 'search',
        eventValue: (query || '')
    });
};

var settings = function (open) {
    ga('send', {
        hitType: 'event',
        eventCategory: 'SettingsPanel',
        eventAction: 'click',
        eventValue: open
    });
};

var loadMore = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'GameLog',
        eventAction: 'loadMore'
    });
};

var emailSignupToggle = function (open) {
    ga('send', {
        hitType: 'event',
        eventCategory: 'EmailSignup',
        eventAction: 'toggle',
        eventValue: open
    });
};

var emailSignupSubscribe = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: 'EmailSignup',
        eventAction: 'subscribe'
    });
};

// When window is closed
window.addEventListener('unload', function () {
    if (timer) {
        timer.stop();
        var time = timer.getTimes();

        ga('send', {
            hitType: 'timing',
            timingCategory: 'Session Timing',
            timingVar: 'visible',
            timingValue: time.totalVisibleTime
        }, {'transport': 'beacon'});

        ga('send', {
            hitType: 'timing',
            timingCategory: 'Session Timing',
            timingVar: 'hidden',
            timingValue: time.totalHiddenTime
        }, {'transport': 'beacon'});

        ga('send', {
            hitType: 'timing',
            timingCategory: 'Session Timing',
            timingVar: 'total',
            timingValue: time.totalTime
        }, {'transport': 'beacon'});
    }
}, false);

export default {
    updatePage,

    playVideo,
    closeVideo,
    autoplayVideo,
    autoplayCancelVideo,
    fullscreenVideo,

    search,
    settings,

    loadMore,

    emailSignupToggle,
    emailSignupSubscribe
};
