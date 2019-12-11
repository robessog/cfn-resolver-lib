const ArrayNode = require('./ArrayNode');
class FnGetAttNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, getAttrResolvers) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.getAttrResolvers = getAttrResolvers;
    }

    evaluate() {
        let result = this.node;
        const resourceLogicalId = this.directDependencies[0].evaluate();
        const attrName = this.directDependencies[1].evaluate();

        if (!this.getAttrResolvers[resourceLogicalId]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId);
        }
        else if (!this.getAttrResolvers[resourceLogicalId][attrName]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId + "." + attrName);
        } else {
            result = this.getAttrResolvers[resourceLogicalId][attrName];
        }

        super.log("FnGetAttNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnGetAttNode;
