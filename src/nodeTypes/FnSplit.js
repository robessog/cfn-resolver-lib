const ArrayNode = require('./ArrayNode');
const _ = require('lodash');

class FnSplit extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaluate() {
        let result = this.node;
        if(this.directDependencies.length == 2){
            const delimiter = this.directDependencies[0].evaluate();
            const strToSplit = this.directDependencies[1].evaluate();
            if( ("" + delimiter).length < 1) {
                console.warn("delimiter is empty");
                throw "Delimiter is invalid: empty string";
            }
            result = strToSplit.split(delimiter);
        }
        
        super.log("FnSplit evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnSplit;