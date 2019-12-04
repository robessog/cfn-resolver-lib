const ArrayNode = require('./ArrayNode');

class FnJoinNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaulate() {
        let result = this.node;
        if (this.directDependencies.length >= 2) {
            const separator = this.directDependencies[0].evaulate();
            const items = this.directDependencies[1].evaulate();
            result = items.join(separator);
        }

        super.log("FnJoinNode evailated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnJoinNode;
