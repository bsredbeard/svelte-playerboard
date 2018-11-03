/**
 * Truncate a number to a specified number of significant digits
 * @param {number} val a value to truncate
 * @param {number} positions the number of significant positions after the decimal that should be left
 * @returns {number} The truncated number
 */
export function truncate(val, positions) {
    if(Number.isFinite(val)){
        if(!Number.isFinite(positions)) positions = 3;
        const factor = Math.pow(10, positions);
        return Math.round(val * factor) / factor;
    }
};

/**
 * A Svelte action to prevent a default behavior for the specified event
 * @param {Node} node The node to be modified
 * @param {string} eventName The name of the event to prevent
 * @returns {object} A svelte action definiton
 */
export function preventDefault(node, eventName) {
    const theGreatPreventer = (ev) => { ev.preventDefault(); };
    node.addEventListener(eventName, theGreatPreventer);
    return {
        update: () => {},
        destroy: () => {
            node.removeEventListener(eventName, theGreatPreventer);
        }
    };
};

/**
 * A Svelte action to stop propagation of an event past the specified node
 * @param {Node} node The node to be modified
 * @param {string} eventName The name of the event to capture
 * @returns {object} A svelte action definition
 */
export function stopPropagation(node, eventName) {
    const stoppingPower = (ev) => { ev.stopPropagation(); };
    node.addEventListener(eventName, stoppingPower);
    return {
        update: () => {},
        destroy: () => {
            node.removeEventListener(eventName, stoppingPower);
        }
    }
};

export function autofocus(node, val) {
    const canFocus = (typeof node.focus === 'function');
    if(val && canFocus){
        node.focus();
    }
    return {
        update(newVal){
            if(newVal && canFocus){
                node.focus()
            }
        },
        destroy(){}
    }
}