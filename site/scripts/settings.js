import sessionstorage from 'sessionstorage';

class Settings {
    constructor () {
        var defaults = {
            autoplay: {
                enabled: true,
                directionDown: true
            }
        };
        this.settings = this.getSession();
        Object.assign(this.settings, defaults);
        this.setSession();
        console.log(this.settings);
    }

    getSession () {
        var session = sessionstorage.getItem("settings");
        return session ? JSON.parse(session) : {};
    }

    setSession () {
        this.settings.updated = new Date();
        sessionstorage.setItem("settings", JSON.stringify(this.settings));
    }

    update (update) {
        Object.assign(this.settings, update);
        this.setSession();
    }

    get () {
        return this.settings();
    }

    setOpen (fn) {
        this.open = fn;
    }

    open () {
        if (this.open) this.open();
    }
}

export default new Settings();
