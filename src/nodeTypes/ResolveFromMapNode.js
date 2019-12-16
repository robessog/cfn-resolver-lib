const ObjectNode = require('./ObjectNode');

// Generic node class that can resolve values from an input map.
// Used for Ref and Fn::ImportValue resolution.
class ResolveFromMapNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging, resolverMap) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.resolverMap = resolverMap;
    }

    shouldReplaceParent(){
        return true;
    }

    canResolve(str) {
        return Object.keys(this.resolverMap).includes(str);
    }

    resolveFromMap(str){
        if(this.canResolve(str)){
            return this.resolverMap[str];
        }
        return str;
    }

    evaluate() {
        let result = this.node; // by default
        if (this.canResolve(this.node)) {
            result = this.resolveFromMap(this.node);
        }

        super.log("ResolveFromMapNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = ResolveFromMapNode;