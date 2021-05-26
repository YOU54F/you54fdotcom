/**
 * The BusConnector Class
 *
 * @export
 * @class BusConnector
 */
export class BusConnector
{

    /**
     * An interface for storing multiple Listener objects.
     * TODO: I wish there was a better way to do this.
     *
     * @private
     * @type ListenerArray
     * @memberof BusConnector
     */
    private listeners: ListenerArray;

    /**
     * The BusConnector instance the current BusConnector is paired to.
     *
     * @private
     * @type {BusConnector}
     * @memberof BusConnector
     */
    private pair: BusConnector;

    /**
     * Creates an instance of BusConnector.
     * 
     * @memberof BusConnector
     * @constructor
     */
    constructor()
    {
        this.listeners = {};
        this.pair = undefined;
    }

    //TODO: Think of a better name for this_value/thisValue.
    //TODO: A way to completely get rid of callbacks and thisValues. 
    //Promises?
    /**
     * Registers a message with a given name, callback, and this value.
     *
     * @param {string} name
     * @param {*} callback
     * @param {Object} this_value
     * @memberof BusConnector
     */
    public Register(name: string, callback: (data?: any) => void, thisValue: Object): void
    {
        this.listeners[name] = {
            callback,
            thisValue
        }
    }

    /**
     * Unregisters one message with the given name and callback.
     *
     * @param {string} name
     * @param {*} callback
     * @memberof BusConnector
     */
    public Unregister(name: string, callback: () => void): void
    {
        delete this.listeners[name];
    }

    /**
     * Sends a message.
     *
     * @param {String} name
     * @param {Object} [value]
     * @param {Object} [unused_transfer]
     * @memberof BusConnector
     */
    public Send(name: string, value?: Object, unused_transfer?: Object): void
    {
        if (!this.pair)
            return;

        let listener = this.pair.Listeners[name];

        if (listener === undefined)
            return;

        listener.callback(listener.thisValue, value);
    }

    get Pair(): BusConnector
    {
        return this.pair;
    }

    set Pair(pair: BusConnector)
    {
        this.pair = pair;
    }

    get Listeners(): ListenerArray
    {
        return this.listeners;
    }

}


//TODO: I don't really like this.
interface Listener
{
    callback: (thisValue?: Object, value?: Object) => void;
    thisValue: Object;
}

interface ListenerArray
{
    [key: string]: Listener;
}