const ArrayNode = require('./ArrayNode');

class FnJoinNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaluate() {
        let result = this.node;
        if (this.directDependencies.length >= 2) {
            const separator = this.directDependencies[0].evaluate();
            const items = this.directDependencies[1].evaluate();
            result = items.join(separator);
        }

        super.log("FnJoinNode evailated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnJoinNode;
