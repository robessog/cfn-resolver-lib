const ArrayNode = require('./ArrayNode');
const _ = require('lodash');

class FnNot extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaluate(){
        let result = this.node; // by default
        if(this.hasSingleDependency){
            result = !this.directDependencies[0].evaluate();
        }
        super.log("Evaluate FnNot: ");
        super.log(result);
        return result;
    }
}

module.exports = FnNot;