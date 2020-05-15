const ObjectNode = require('./ObjectNode');

class ResourcesNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging, arnResolver) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.arnResolver = arnResolver;
    }

    findWrappedResource(resourceLogicalId) {
        return this.wrappedObject ? this.wrappedObject[resourceLogicalId] : undefined;
    }

    getResolvedArn(resourceLogicalId) {
        const resourceNode = this.findWrappedAncestorByPathArray([resourceLogicalId]);
        return this.arnResolver.getResolvedArn(resourceNode);
    }
}

module.exports = ResourcesNode;