import sessionstorage from 'sessionstorage';

const VERSION = 1;

class Settings {
    constructor () {
        var defaults = {
            autoplay: {
                enabled: true,
                directionDown: true
            }
        };
        this.settings = this.getSession();
        if (!this.settings.version || this.settings.version < VERSION) {
            this.deleteSession();
            this.settings = {};
        }
        Object.assign(this.settings, defaults);
        this.setSession();
        console.log(this.settings);
    }

    getSession () {
        var session = sessionstorage.getItem("settings");
        return session ? JSON.parse(session) : {};
    }

    setSession () {
        this.settings.version = VERSION;
        sessionstorage.setItem("settings", JSON.stringify(this.settings));
    }

    deleteSession () {
        sessionstorage.removeItem("settings");
    }

    update (update) {
        Object.assign(this.settings, update);
        this.setSession();
    }

    get () {
        return this.settings;
    }

    setOpen (fn) {
        this.open = fn;
    }

    open () {
        if (this.open) this.open();
    }
}

export default new Settings();
