const _ = require('lodash');

class Node {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        this.node = node;
        this.nodeAccessor = nodeAccessor;
        this.directDependencies = [];
        this.enableVerboseLogging = enableVerboseLogging;
    }

    log(...str) {
        if (this.enableVerboseLogging) {
            console.log(...str);
        }
    }

    get wrappedObject() {
        throw 'Method needs to be implemented by child class'
    }

    shouldReplaceParent() {
        return false;
    }

    get isLeaf() {
        return this.directDependencies.length === 0;
    }

    get hasSingleDependency() {
        return this.directDependencies.length === 1;
    }

    evaluate() {
        throw "Should not happen, child class implementations should handle this case";
    }

    /* Find an ancestor wrapped node with object path (e.g. ["FooSrvQueue" , "Properties", "QueueName") */
    findWrappedAncestorByPathArray(pathArray) {
        if (!this.hasAncestorOnPath(pathArray)) {
            throw `ancestor with ${pathArray} not found`;
        }

        let result = this;
        for (let i = 0; i < pathArray.length; i++) {
            result = result.wrappedObject[pathArray[i]];
        }
        return result;
    }

    /* Find an ancestor wrapped node with object path (e.g. FooSrvQueue.Properties.QueueName)*/
    findWrappedAncestorByObjectPath(objectPathString) {
        this.findWrappedAncestorByPathArray(getPathArrayFromObjectPath(objectPathString));
    }

    hasAncestorOnPath(pathArray) {
        if (!_.isArray(pathArray)) {
            throw "pathArray should be an array";
        }
        let currentNode = this;
        for (let i = 0; i < pathArray.length; i++) {
            const pathItem = pathArray[i];
            if (!currentNode.wrappedObject.hasOwnProperty(pathItem)) {
                return false;
            }
            currentNode = currentNode.wrappedObject[pathItem];
        }
        return true;
    }
}

module.exports = Node;