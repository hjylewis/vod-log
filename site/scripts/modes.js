class ModeController {
    constructor () {
        this.body = document.body;
    }

    getModes() {
        var modes = {}
        var modesArray = this.body.className.split(' ');
        modesArray.forEach(function (mode) {
            modes[mode] = true;
        });
        return modes;
    }

    getMode(mode) {
        var modes = this.getModes();
        return modes[mode];
    }

    setModes(modes) {
        var modesArray = Object.keys(modes).filter(function (mode) {
            return modes[mode];
        });
        this.body.className = modesArray.join(' ');
    }

    addMode(mode) {
        var modes = this.getModes();
        modes[mode] = true;
        this.setModes(modes);
    }

    removeMode(mode) {
        var modes = this.getModes();
        modes[mode] = false;
        this.setModes(modes);
    }

    toggleMode(mode) {
        var modes = this.getModes();
        modes[mode] = !modes[mode];
        this.setModes(modes);
    }

    setMode(mode, value) {
        var modes = this.getModes();
        modes[mode] = value;
        this.setModes(modes);
    }
}

export default new ModeController();
