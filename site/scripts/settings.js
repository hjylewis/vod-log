import store from 'store';

const VERSION = 1;

class Settings {
    constructor () {
        var defaults = {
            autoplay: {
                enabled: true,
                directionDown: true
            },
            newtab: false
        };
        this.settings = this.getStore();
        if (!this.settings.version || this.settings.version < VERSION) {
            this.deleteStore();
            this.settings = {};
        }
        this.settings = Object.assign(defaults, this.settings || {});
        this.setStore();
    }

    getStore () {
        return store.get("settings") || {};
    }

    setStore () {
        this.settings.version = VERSION;
        store.set("settings", this.settings);
    }

    deleteStore () {
        store.remove("settings");
    }

    update (update) {
        Object.assign(this.settings, update);
        this.setStore();
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
