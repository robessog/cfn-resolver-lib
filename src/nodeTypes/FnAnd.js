const ArrayNode = require('./ArrayNode');
const _ = require('lodash');

class FnAnd extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaulateResultedArray(array) {
        let result = true;
        array.forEach((boolVal) => {
            if(!_.isBoolean(boolVal)) {
                throw "Array should only contain booleans";
            }
            result = result && boolVal;
        });
        return result;
    }
}

module.exports = FnAnd;