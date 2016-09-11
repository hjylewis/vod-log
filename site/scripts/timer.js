"use strict";

import visibility from './visibility';

class Timer {
    constructor () {
        this.totalVisibleTime = 0;
        this.totalHiddenTime = 0;
        this.totalTime = 0;

        this.visibility = visibility.getVisibility();

        performance.mark("start");
        this.listener = visibility.addVisibilityListener(this.listen.bind(this));
    }

    static support () {
        return window.performance && window.performance.mark;
    }

    listen (visibility) {
        if (visibility !== this.visibility) {
            // get time difference
            performance.mark("end");
            performance.measure("measure", "start", "end");
            var difference = performance.getEntriesByName("measure")[0].duration;

            if (this.visibility) {
                this.totalVisibleTime += difference;
            } else {
                this.totalHiddenTime += difference;
            }
            this.totalTime += difference;

            // reset timer
            performance.clearMarks();
            performance.clearMeasures();
            performance.mark("start");

            this.visibility = visibility;
        }
    }

    stop () {
        this.listen(false);
        visibility.removeVisibilityListener(this.listener);
        performance.clearMarks();
    }

    getTimes () {
        return {
            totalVisibleTime: Math.round(this.totalVisibleTime),
            totalHiddenTime: Math.round(this.totalHiddenTime),
            totalTime: Math.round(this.totalTime)
        };
    }
}

export default Timer.support() ? new Timer() : null;
