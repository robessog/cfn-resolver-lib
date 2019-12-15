const ArrayNode = require('./ArrayNode');

class FnGetAttNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, getAttrResolvers, convRoot) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.getAttrResolvers = getAttrResolvers;
        this.convRoot = convRoot;

        this.convertedResources = convRoot.wrappedObject.Resources;
    }

    evaluate() {
        let result = this.node;
        const resourceLogicalId = this.directDependencies[0].evaluate();
        const attrPath = this.directDependencies[1].evaluate();

        const resource = this.convertedResources.findWrappedResource(resourceLogicalId);

        // Handle ARN resolutions if resource is present in the template
        if (attrPath === "Arn" && resource) {
            const resolvedArn = this.convertedResources.getResolvedArn(resourceLogicalId);
            result = resolvedArn || result;
        } // Try to resolve the attribute value from the current template (e.g. MySqs.QueuName)
        else if (resource && resource.isPropertyDefinedOnObjectPath(attrPath)) {
            result = resource.getResolvedProperyValueOnObjectPath(attrPath);
        }

        // Override values from the provided Fn::GetAttResolvers
        if (!this.getAttrResolvers[resourceLogicalId]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId);
        }
        else if (!this.getAttrResolvers[resourceLogicalId][attrPath]) {
            console.warn("Fn::GetAttResolvers not found in params file: " + resourceLogicalId + "." + attrPath);
        } else {
            result = this.getAttrResolvers[resourceLogicalId][attrPath];
        }

        super.log("FnGetAttNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnGetAttNode;