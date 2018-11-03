
/**
 * Create a new set of AutoIDs
 * @class AutoId
 */
export default class AutoId{
    constructor(){
        let curr = 0;
        /**
         * Retrieve the next auto-id
         * @method
         * @name next
         * @memberof AutoId
         * @instance
         * @returns {number}
         */
        this.next = () => curr++;
        /**
         * Reset this auto-id instance to its original starting value
         * @method
         * @name reset
         * @memberof AutoId
         * @instance
         * @returns {void}
         */
        this.set = (val) => {
            curr = val ? val : 0;
        };
    }
}