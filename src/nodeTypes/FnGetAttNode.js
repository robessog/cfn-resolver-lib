const ArrayNode = require('./ArrayNode');
const { getPathArrayFromObjectPath, isDefeinedOnPath, getFieldValueAtWrappedPath } = require('../wrappingHelpers');

class FnGetAttNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, getAttrResolvers, convertedResources) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.getAttrResolvers = getAttrResolvers;
        this.convertedResources = convertedResources;
    }

    evaluate() {
        let result = this.node;
        const resourceLogicalId = this.directDependencies[0].evaluate();
        const attrName = this.directDependencies[1].evaluate();

        // Try to resolve the attribute value from the current template (e.g. QueuName)
        if (this.convertedResources.wrappedObject.hasOwnProperty(resourceLogicalId)) {
            const wrappedResourceNode = this.convertedResources.wrappedObject[resourceLogicalId];
            const pathArray = getPathArrayFromObjectPath(attrName);
            const propertiesNode = wrappedResourceNode.wrappedObject.Properties;
            if (isDefeinedOnPath(propertiesNode, pathArray)) {
                const attrNode = getFieldValueAtWrappedPath(propertiesNode, pathArray);
                const evaluatedAttrValue =  attrNode.evaluate();
                result = evaluatedAttrValue;
            }
        }

        // Override values from the provided Fn::GetAttResolvers
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