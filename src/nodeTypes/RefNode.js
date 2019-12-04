const ObjectNode = require('./ObjectNode');

class RefNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging, params) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.params = params;
    }

    shouldReplaceParent(){
        return true;
    }

    canResolve(str) {
        return Object.keys(this.params).includes(str);
    }

    resolveCfnPseudoParam(str){
        if(this.canResolve(str)){
            return this.params[str];
        }
        return str;
    }

    evaulate() {
        let result = this.node; // by default
        if (this.canResolve(this.node)) {
            result = this.resolveCfnPseudoParam(this.node);
        }

        super.log("Ref evaulated: ");
        super.log(result);
        return result;
    }
}

module.exports = RefNode;