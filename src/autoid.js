
/**
 * Create a new set of AutoIDs
 * @class AutoId
 */
export default function AutoId(){
    let curr = 0;
    /**
     * Retrieve the next auto-id
     * @method
     * @name next
     * @memberof AutoId
     * @instance
     * @returns {number}
     */
    this.next = () => curr++,
    /**
     * Reset this auto-id instance to its original starting value
     * @method
     * @name reset
     * @memberof AutoId
     * @instance
     * @returns {void}
     */
    this.reset = () => { curr = 0; }
}