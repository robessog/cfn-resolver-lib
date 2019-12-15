const ObjectNode = require('./ObjectNode');
const { getPathArrayFromObjectPath } = require('../wrappingHelpers');

class ResourceNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    getType() {
        return this.findWrappedAncestorByPathArray(["Type"]).evaluate();
    }

    isPropertyDefined(pathArray) {
        return this.hasAncestorOnPath(["Properties", ...pathArray]);
    }

    isPropertyDefinedOnObjectPath(objectPathStr) {
        return this.isPropertyDefined([...getPathArrayFromObjectPath(objectPathStr)]);
    }

    getProperyNode(pathArray) {
        return this.findWrappedAncestorByPathArray(["Properties", ...pathArray]);
    }

    getResolvedProperyValueOnObjectPath(objectPathStr) {
        return this.getResolvedProperyValue([...getPathArrayFromObjectPath(objectPathStr)]);
    }

    getResolvedProperyValue(pathArray) {
        const attrNode = this.getProperyNode(pathArray);
        const evaluatedAttrValue = attrNode.evaluate();
        return evaluatedAttrValue;
    }
}

module.exports = ResourceNode;