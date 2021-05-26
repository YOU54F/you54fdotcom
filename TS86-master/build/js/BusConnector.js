export class BusConnector {
    constructor() {
        this.listeners = {};
        this.pair = undefined;
    }
    Register(name, callback, thisValue) {
        this.listeners[name] = {
            callback,
            thisValue
        };
    }
    Unregister(name, callback) {
        delete this.listeners[name];
    }
    Send(name, value, unused_transfer) {
        if (!this.pair)
            return;
        let listener = this.pair.Listeners[name];
        if (listener === undefined)
            return;
        listener.callback(listener.thisValue, value);
    }
    get Pair() {
        return this.pair;
    }
    set Pair(pair) {
        this.pair = pair;
    }
    get Listeners() {
        return this.listeners;
    }
}
//# sourceMappingURL=BusConnector.js.map