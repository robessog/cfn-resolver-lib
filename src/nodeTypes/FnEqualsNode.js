
const ArrayNode = require('./ArrayNode');

class FnEqualsNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaulateResultedArray(array) {
        const val1 = array[0];
        const val2 = array[1];

        // in theory at this point we only have primitive values (strings, numbers, booleans)
        // so simple === comparesion should sufficient
        // but we can make it even better to deep equal by comparing the serialized JSON strings
        return (JSON.stringify(val1) === JSON.stringify(val2));
    }
}

module.exports = FnEqualsNode;