import { BusConnector } from "../BusConnector.js";

export class DummyScreenAdapter
{

    private graphicImageData: any;
    private graphicBuffer: Uint8Array;
    private graphicBuffer32: Int32Array;

    private cursorRow: number;
    private cursorCol: number;

    private graphicalModeWidth: number;
    private graphicalModeHeight: number;

    private isGraphical: boolean = false;

    private textModeData: Int32Array;

    private textModeWidth: number;
    private textModeHeight: number;

    private busConnector: BusConnector;

    constructor(busConnector: BusConnector)
    {
        this.busConnector = busConnector;

        this.busConnector.Register("screen-set-mode", (data) => { this.setMode(data) }, this)
        this.busConnector.Register('screen-mode-bugger-end', (data) => { this.updateBuffer(data) }, this)
        this.busConnector.Register('screen-put-char', (data) => { this.putChar(data) }, this)
        this.busConnector.Register('screen-text-scroll ', (data) => { console.log("scroll", data) }, this)
        this.busConnector.Register('screen-update-cursor', (data) => { this.updateCursor(data) }, this)
        this.busConnector.Register('screen-update-cursor-scanline', (data) => { this.updateCursorScanline(data) }, this)
        this.busConnector.Register('screen-set-size-text', (data) => { this.setSizeText(data) }, this)
        this.busConnector.Register('screen-set-size-graphical', (data) => { this.setSizeGraphical(data) }, this)
    }

    private setMode(graphical: boolean): void
    {
        this.isGraphical = graphical;
    }

    private updateBuffer(data: Array<number>): void
    {
        let min = data[0];
        let max = data[1];

        if (max < min) return;

        var minY = min / this.graphicalModeWidth | 0;
        var maxY = max / this.graphicalModeWidth | 0;
    }

    private putChar(data: any): void
    {
        let row = data[0];
        let col = data[1];
        let chr = data[2];
        let bgColor = data[3];
        let fgColor = data[4];

        if (row < this.textModeHeight && col < this.textModeWidth)
        {
            let p = 3 * (row * this.textModeWidth + col);

            this.textModeData[p] = chr;
            this.textModeData[p + 1] = bgColor;
            this.textModeData = fgColor;
        }
    }

    private updateCursor(data: any): void
    {
        let row = data[0];
        let col = data[1];

        //TODO: Why is this being tested if it is going to be set to the value anyway?
        if (row !== this.cursorRow || col !== this.cursorCol)
        {
            this.cursorRow = row;
            this.cursorCol = col;
        }
    }

    private updateCursorScanline(data: any)
    {

    }

    private setSizeText(data: any): void
    {
        let rows = data[0];
        let cols = data[1];

        if (cols === this.textModeWidth && rows == this.textModeHeight) return;

        this.textModeData = new Int32Array(cols * rows * 3);
        this.textModeWidth = cols;
        this.textModeHeight = rows;
    }

    private setSizeGraphical(data: any): void
    {
        let width = data[0];
        let height = data[0];

        this.graphicBuffer = new Uint8Array(4 * width * height);
        this.graphicBuffer32 = new Int32Array(this.graphicBuffer.buffer);

        this.graphicalModeWidth = width;
        this.graphicalModeHeight = height;

        this.busConnector.Send("screen-tell-buffer", [this.graphicBuffer32], [this.graphicBuffer32.buffer]);
    }
}
