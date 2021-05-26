export class DummyScreenAdapter {
    constructor(busConnector) {
        this.isGraphical = false;
        this.busConnector = busConnector;
        this.busConnector.Register("screen-set-mode", (data) => { this.setMode(data); }, this);
        this.busConnector.Register('screen-mode-bugger-end', (data) => { this.updateBuffer(data); }, this);
        this.busConnector.Register('screen-put-char', (data) => { this.putChar(data); }, this);
        this.busConnector.Register('screen-text-scroll ', (data) => { console.log("scroll", data); }, this);
        this.busConnector.Register('screen-update-cursor', (data) => { this.updateCursor(data); }, this);
        this.busConnector.Register('screen-update-cursor-scanline', (data) => { this.updateCursorScanline(data); }, this);
        this.busConnector.Register('screen-set-size-text', (data) => { this.setSizeText(data); }, this);
        this.busConnector.Register('screen-set-size-graphical', (data) => { this.setSizeGraphical(data); }, this);
    }
    setMode(graphical) {
        this.isGraphical = graphical;
    }
    updateBuffer(data) {
        let min = data[0];
        let max = data[1];
        if (max < min)
            return;
        var minY = min / this.graphicalModeWidth | 0;
        var maxY = max / this.graphicalModeWidth | 0;
    }
    putChar(data) {
        let row = data[0];
        let col = data[1];
        let chr = data[2];
        let bgColor = data[3];
        let fgColor = data[4];
        if (row < this.textModeHeight && col < this.textModeWidth) {
            let p = 3 * (row * this.textModeWidth + col);
            this.textModeData[p] = chr;
            this.textModeData[p + 1] = bgColor;
            this.textModeData = fgColor;
        }
    }
    updateCursor(data) {
        let row = data[0];
        let col = data[1];
        if (row !== this.cursorRow || col !== this.cursorCol) {
            this.cursorRow = row;
            this.cursorCol = col;
        }
    }
    updateCursorScanline(data) {
    }
    setSizeText(data) {
        let rows = data[0];
        let cols = data[1];
        if (cols === this.textModeWidth && rows == this.textModeHeight)
            return;
        this.textModeData = new Int32Array(cols * rows * 3);
        this.textModeWidth = cols;
        this.textModeHeight = rows;
    }
    setSizeGraphical(data) {
        let width = data[0];
        let height = data[0];
        this.graphicBuffer = new Uint8Array(4 * width * height);
        this.graphicBuffer32 = new Int32Array(this.graphicBuffer.buffer);
        this.graphicalModeWidth = width;
        this.graphicalModeHeight = height;
        this.busConnector.Send("screen-tell-buffer", [this.graphicBuffer32], [this.graphicBuffer32.buffer]);
    }
}
//# sourceMappingURL=DummyScreenAdapter.js.map