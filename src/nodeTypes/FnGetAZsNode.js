const ObjectNode = require('./ObjectNode');

class FnGetAZsNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging, azMapping, currentRegion) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.azMapping = azMapping;
        this.currentRegion = currentRegion;
    }

    shouldReplaceParent() {
        return true;
    }

    evaluate() {
        let result = this.node;
        let regionName = this.currentRegion;
        if (!this.isLeaf) {
            regionName = this.directDependencies[0].evaluate();
        }
        result = this.azMapping[regionName];
        super.log("FnGetAZsNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnGetAZsNode;