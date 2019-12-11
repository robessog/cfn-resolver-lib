const traverse = require('traverse');
const { convertNode } = require("./convertNode");

class NodeEvaluator {
    constructor(srcObj, params, enableVerboseLogging){
        this.srcObj = srcObj;
        this.params = params;
        // backward compatibility
        this.params.RefResolveres = this.params.RefResolvers;
        this.enableVerboseLogging = enableVerboseLogging;
    }

    evaluateNodes(){
        let convRoot = {};

        const getFieldValueAtWrappedPath = (node, path) => {
            let result = node;
            for(let i = 0; i < path.length; i++) {
                result = result.wrappedObject[path[i]];
            }
            return result;
        }

        const self = this;
        traverse(this.srcObj).forEach(function (x) {
            const convNode = convertNode(x, this, self.srcObj, self.params, convRoot, self.enableVerboseLogging);
            if(this.isRoot) {
                convRoot = convNode;
            }

            if(this.parent) {
                let convParent;
                if(this.parent.isRoot) {
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
}

module.exports = NodeEvaluator;