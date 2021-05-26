import { BusConnector } from "./BusConnector.js";
export class Bus {
    constructor() {
        this[0] = this.connection0 = new BusConnector();
        this[1] = this.connection1 = new BusConnector();
        this.connection0.Pair = this.connection1;
        this.connection1.Pair = this.connection0;
    }
}
//# sourceMappingURL=Bus.js.map