import { BusConnector } from "./BusConnector.js";

/**
 * 
 */
export class Bus
{

    [key: number]: BusConnector;

    //TODO: Think of better names for connections.
    private connection0: BusConnector;
    private connection1: BusConnector;

    constructor()
    {
        this[0] = this.connection0 = new BusConnector();
        this[1] = this.connection1 = new BusConnector();

        this.connection0.Pair = this.connection1;
        this.connection1.Pair = this.connection0;
    }
}
