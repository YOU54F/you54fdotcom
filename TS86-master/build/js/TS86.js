import { CPU } from './CPU.js';
export class TS86 {
    constructor(busConnector) {
        this.running = false;
        this.stopped = false;
        this.cpu = new CPU(busConnector);
        this.busConnector = busConnector;
        busConnector.Register("cpu-init", this.init, this);
        busConnector.Register("cpu-run", this.run, this);
        busConnector.Register("cpu-stop", this.stop, this);
        busConnector.Register("cpu-restart", this.restart, this);
    }
    init(settings) {
        this.cpu.Init(settings, this.busConnector);
        this.busConnector.Send("emulator-ready");
    }
    run() {
        if (!this.running) {
            this.busConnector.Send("emulator-started");
            this.fastNextTick();
        }
    }
    stop() {
        if (this.running) {
            this.stopped = true;
        }
    }
    restart() {
        this.cpu.Reset();
        this.cpu.LoadBios();
    }
    doTick() {
        if (this.stopped) {
            this.stopped = this.running = false;
            this.busConnector.Send("emulator-stopped");
            return;
        }
        this.running = true;
        var deltaT = this.cpu.MainRun();
        if (deltaT <= 0) {
            this.fastNextTick();
        }
        else {
            this.nextTick(deltaT);
        }
    }
    fastNextTick() {
        window.postMessage(TS86.MAGIC_POST_MESSAGE, "*");
    }
    registerTick() {
        window.addEventListener("message", this.magicTickEventHandler, false);
    }
    magicTickEventHandler(messageEvent) {
        if (messageEvent.source === window && messageEvent.data === TS86.MAGIC_POST_MESSAGE) {
            this.doTick();
        }
    }
    nextTick(tickTime) {
        if (tickTime < 4 || document.hidden) {
            this.fastNextTick();
            return;
        }
        setTimeout(this.doTick(), tickTime);
    }
    microTick() {
        return performance.now();
    }
    saveState() {
        return this.cpu.SaveState();
    }
    restoreState() {
        return this.cpu.RestoreState();
    }
}
TS86.MAGIC_POST_MESSAGE = 0xAA55;
//# sourceMappingURL=TS86.js.map