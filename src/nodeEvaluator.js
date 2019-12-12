const traverse = require('traverse');
const { convertNode } = require("./convertNode");
const { getFieldValueAtWrappedPath } = require('./wrappingHelpers');

class NodeEvaluator {
    constructor(srcObj, params, enableVerboseLogging) {
        this.srcObj = srcObj;
        this.params = params || {};
        this.enableVerboseLogging = enableVerboseLogging;
    }

    evaluateNodes() {
        let convRoot = {};

        const self = this;
        traverse(this.srcObj).forEach(function (x) {
            const convNode = convertNode(x, this, self.srcObj, self.params, convRoot, self.enableVerboseLogging);
            if (this.isRoot) {
                convRoot = convNode;
            }

            if (this.parent) {
                let convParent;
                if (this.parent.isRoot) {
                    convParent = convRoot;
                } else {
                    convParent = getFieldValueAtWrappedPath(convRoot, this.parent.path);
                }
                convParent.addChild(this.key, convNode);
            }
        });

        let evaluatedObj = {};

        convRoot.directDependencies.forEach((depNode) => {
            evaluatedObj[depNode.nodeAccessor.key] = depNode.evaluate();
        });

        return evaluatedObj;
    }

    // The only reason for this API is to keep backward compatibility because of a typo in previous versions
    evaulateNodes() {
        return this.evaluateNodes();
    }
}

module.exports = NodeEvaluator;