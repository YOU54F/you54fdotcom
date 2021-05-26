import { BusConnector } from './BusConnector.js';
import { CPU } from './CPU.js';

/**
 * The TS86 class.
 *
 * @export
 * @class TS86
 */
export class TS86
{

    /**
     * The running value indicates whether the emulator is running.
     *
     * @private
     * @type {boolean}
     * @memberof TS86
     */
    private running: boolean;

    /**
     * The stopped value indicates whether the emulator is stopped.
     *
     * @private
     * @type {boolean}
     * @memberof TS86
     */
    private stopped: boolean;

    /**
     * The virtual CPU that the emulator will run on.
     *
     * @private
     * @type {CPU}
     * @memberof TS86
     */
    private cpu: CPU;

    /**
     * The bus that allows for communication between modules.
     *
     * @private
     * @type {BusConnector}
     * @memberof TS86
     */
    private busConnector: BusConnector;

    /**
     *
     *
     * @private
     * @memberof TS86
     */
    private static readonly MAGIC_POST_MESSAGE = 0xAA55;

    /**
     * Creates an instance of TS86.
     * 
     * @param {BusConnector} busConnector
     * @memberof TS86
     */
    constructor(busConnector: BusConnector)
    {
        this.running = false;
        this.stopped = false;
        this.cpu = new CPU(busConnector);

        this.busConnector = busConnector;
        busConnector.Register("cpu-init", this.init, this);
        busConnector.Register("cpu-run", this.run, this);
        busConnector.Register("cpu-stop", this.stop, this);
        busConnector.Register("cpu-restart", this.restart, this);
    }

    /**
     *
     *
     * @param {Object} settings
     * @memberof TS86
     */
    private init(settings: Object): void
    {
        this.cpu.Init(settings, this.busConnector);
        this.busConnector.Send("emulator-ready");
    }

    /**
     *
     *
     * @memberof TS86
     */
    private run(): void
    {
        if (!this.running)
        {
            this.busConnector.Send("emulator-started");
            this.fastNextTick();
        }
    }

    /**
     *
     *
     * @memberof TS86
     */
    private stop(): void
    {
        if (this.running)
        {
            this.stopped = true;
        }
    }

    /**
     * 
     *
     * @memberof TS86
     */
    private restart(): void
    {
        this.cpu.Reset();
        this.cpu.LoadBios();
    }

    /**
     * 
     *
     * @private
     * @memberof TS86
     */
    private doTick(): void
    {
        if (this.stopped)
        {
            this.stopped = this.running = false;
            this.busConnector.Send("emulator-stopped");
            return;
        }

        this.running = true;
        var deltaT = this.cpu.MainRun();

        if (deltaT <= 0)
        {
            this.fastNextTick();
        }
        else
        {
            this.nextTick(deltaT);
        }
    }

    /**
     * 
     *
     * @private
     * @memberof TS86
     */
    private fastNextTick(): void
    {
        window.postMessage(TS86.MAGIC_POST_MESSAGE, "*");
    }

    /**
     *
     *
     * @private
     * @memberof TS86
     */
    private registerTick(): void
    {
        window.addEventListener("message", this.magicTickEventHandler, false);
    }

    /**
     *
     *
     * @private
     * @param {MessageEvent} messageEvent
     * @memberof TS86
     */
    private magicTickEventHandler(messageEvent: MessageEvent): void
    {
        //TODO: Test if first condition can be removed.
        if (messageEvent.source === window && messageEvent.data === TS86.MAGIC_POST_MESSAGE)
        {
            this.doTick();
        }
    }

    /**
     * 
     *
     * @private
     * @param {number} tickTime
     * @memberof TS86
     */
    private nextTick(tickTime: number): void
    {
        if (tickTime < 4 || document.hidden)
        {
            this.fastNextTick();
            return;
        }

        //Original: setTimeout(() => { this.doTick(); }, tickTime);
        setTimeout(this.doTick(), tickTime);

    }

    /**
     *
     *
     * @private
     * @returns {number}
     * @memberof TS86
     */
    private microTick(): number
    {
        return performance.now();
    }

    //TODO: Create state type.
    /**
     *
     *
     * @private
     * @returns {*}
     * @memberof TS86
     */
    private saveState(): any
    {
        return this.cpu.SaveState();
    }

    /**
     *
     *
     * @private
     * @returns {*}
     * @memberof TS86
     */
    private restoreState(): any
    {
        return this.cpu.RestoreState();
    }

}
