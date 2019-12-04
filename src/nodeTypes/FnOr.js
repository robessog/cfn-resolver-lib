const ArrayNode = require('./ArrayNode');
const _ = require('lodash');

class FnOr extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaulateResultedArray(array) {
        let result = false;
        array.forEach((boolVal) => {
            if(!_.isBoolean(boolVal)) {
                throw "Array should only contain booleans";
            }
            result = result || boolVal;
        });
        return result;
    }
}

module.exports = FnOr;