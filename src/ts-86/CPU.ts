import {BusConnector} from './BusConnector.js';

export class CPU
{

    /**
     * 
     * @param bus 
     */
    constructor(busConnector: BusConnector)
    {
        
    }

    public Init(settings: Object, busConnector: BusConnector): void
    {

    }

    public SaveState(): any
    {
        return null;
    }

    public RestoreState(): any
    {
        return null;
    }

    public Reset(): void
    {

    }

    public LoadBios(): void
    {

    }

    public MainRun(): number
    {
        return;
    }

}
