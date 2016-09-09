"use strict";

// Inspired by http://www.simoahava.com/analytics/use-page-visibility-api-google-tag-manager/
class Visibility {
    constructor () {
        this.visibilityPrefix = this._getVisibilityPrefix();
    }

    _getVisibilityPrefix () {
        var prefixes = ['moz', 'ms', 'o', 'webkit'];

        if ('hidden' in document) {
            return '';
        }

        // Loop through each prefix to see if it is supported.
        for (var i = 0; i < prefixes.length; i++) {
            var testPrefix = prefixes[i] + 'Hidden';
            if (testPrefix in document) {
                return prefixes[i];
            }
        }

        return;
    }

    getVisibility () {
        if (typeof this.visibilityPrefix !== 'undefined') {
            return !document[this.visibilityPrefix === '' ? 'hidden' : this.visibilityPrefix + 'Hidden'];
        }
    }

    addVisibilityListener (callback) {
        if (typeof this.visibilityPrefix === 'undefined') {
            return;
        }

        var visibilityEvent = this.visibilityPrefix + 'visibilitychange';

        var listener = function () {
            var visibility = this.getVisibility();
            callback(visibility);
        }.bind(this);

        document.addEventListener(visibilityEvent, listener, false);
        return listener;
    }

    removeVisibilityListener (listener) {
        if (typeof this.visibilityPrefix === 'undefined') {
            return;
        }

        var visibilityEvent = this.visibilityPrefix + 'visibilitychange';
        
        document.removeEventListener(visibilityEvent, listener);
    }
}

export default new Visibility();
