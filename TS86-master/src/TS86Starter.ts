import { Bus } from "./Bus.js";
import { BusConnector } from "./BusConnector.js";
import { TS86 } from "./TS86.js";
import { NetworkAdapter } from "./adapters/NetworkAdapter.js";
import { KeyboardAdapter } from "./adapters/KeyboardAdapter.js";
import { MouseAdapter } from "./adapters/MouseAdapter.js";
import { ScreenAdapter } from "./adapters/ScreenAdapter.js";
import { SerialAdapter } from "./adapters/SerialAdapter.js";
import { SpeakerAdapter } from "./adapters/SpeakerAdapter.js";
import { DummyScreenAdapter } from "./adapters/DummyScreenAdapter.js";

export class TS86Starter
{

    private options: Options;
    private cpuIsRunning: boolean;
    private bus: Bus;
    private adapterBus: BusConnector;
    private emulatorBus: BusConnector;
    private emulator: TS86;

    private diskImages: Object;

    private networkAdapter: NetworkAdapter;
    private keyboardAdapter: KeyboardAdapter;
    private mouseAdapter: MouseAdapter;
    private screenAdapter: ScreenAdapter;
    private serialAdapter: SerialAdapter;
    private speakerAdapter: SpeakerAdapter

    constructor(options?: Options)
    {
        this.options = {
            memorySize: 64 * 1024 * 1024,
            vgaMemorySize: 8 * 1024 * 1024,
            bootOrder: 0x213,
            fastboot: false
        }

        Object.assign(this.options, options)
        this.cpuIsRunning = false;

        this.bus = new Bus();
        this.adapterBus = this.bus[0];
        this.emulatorBus = this.bus[1];
        this.emulator = new TS86(this.emulatorBus);

        this.adapterBus.Register("emulator-stopped", () => { this.cpuIsRunning = false }, this);
        this.adapterBus.Register("emulator-started", () => { this.cpuIsRunning = true }, this);

        this.diskImages = {
            "fda": undefined,
            "fdb": undefined,
            "hda": undefined,
            "hdb": undefined,
            "cdrom": undefined,
        }

        let Settings = {
            loadDevices: true,
            memorySize: this.options.memorySize,
            vgaMemorySize: this.options.vgaMemorySize,
            bootOrder: this.options.bootOrder,
            fastboot: this.options.fastboot,
            fda: false,
            fdb: false,
            enableNe2k: false
        }

        if (this.options.networkRelayUrl)
        {
            this.networkAdapter = new NetworkAdapter(this.options.networkRelayUrl, this.adapterBus);
            Settings.enableNe2k = true;
        }

        if (!this.options.disableKeyboard)
        {
            this.keyboardAdapter = new KeyboardAdapter(this.adapterBus);
        }
        if (!this.options.disableMouse)
        {
            this.mouseAdapter = new MouseAdapter(this.options.screenContainer, this.adapterBus);
        }

        if (this.options.screenContainer)
        {
            this.screenAdapter = new ScreenAdapter(this.options.screenContainer, this.adapterBus);
        }
        else if (this.options.screenDummy)
        {
            this.screenAdapter = new DummyScreenAdapter(this.adapterBus);
        }

        if (this.options.serialContainer)
        {
            this.serialAdapter = new SerialAdapter(this.options.serialContainer, this.adapterBus);
        }

        if (!this.options.disableSpeaker)
        {
            this.speakerAdapter = new SpeakerAdapter(this.adapterBus);
        }
    }
}

//TODO: I don't like this.

interface Settings
{
    loadDevices: boolean;
    memorySize: number;
    vgaMemorySize: number;
    bootOrder: number;
    fastboot: boolean;
    fda: any;
    fdb: any;
    enableNe2k: boolean
}

//TODO: Or this either.

interface Options
{
    memorySize?: number;
    vgaMemorySize?: number;
    bootOrder?: number;
    fastboot?: boolean;
    networkRelayUrl?: string
    disableKeyboard?: boolean
    disableMouse?: boolean
    screenContainer?: HTMLElement
    screenDummy?: boolean
    serialContainer?: HTMLElement
    disableSpeaker?: boolean
}

let ts86Starter = new TS86Starter();
