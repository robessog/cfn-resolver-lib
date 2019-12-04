const ArrayNode = require('./ArrayNode');
class FnGetAttNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, getAttrResolvers) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.getAttrResolvers = getAttrResolvers;
    }

    evaulate() {
        let result = this.node;
        const resourceLogicalId = this.directDependencies[0].evaulate();
        const attrName = this.directDependencies[1].evaulate();

        if (!this.getAttrResolvers[resourceLogicalId]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId);
        }
        else if (!this.getAttrResolvers[resourceLogicalId][attrName]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId + "." + attrName);
        } else {
            result = this.getAttrResolvers[resourceLogicalId][attrName];
        }

        super.log("FnGetAttNode evaulated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnGetAttNode;
