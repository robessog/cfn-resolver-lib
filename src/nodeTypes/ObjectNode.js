const Node = require('./Node');

class ObjectNode extends Node {
    constructor(node, nodeAccessor, enableVerboseLogging){
        super(node, nodeAccessor, enableVerboseLogging);
        this.directDependencies = [];
        this.wrappedObj = undefined;
    }

    addChild(key, child){
        if(!this.wrappedObj){
            this.wrappedObj = {};
        }

        this.wrappedObj[key] = child;
        this.directDependencies.push(child);
    }

    get wrappedObject() {
        return this.wrappedObj;
    }

    evaluate(){
        super.log("Eval: ", this.nodeAccessor.path.join('/'));
        let result = this.node; // by default or simple value (number, string)
        
        if(this.isLeaf){
            super.log("Leaf: ",  this.node, this.nodeAccessor.path.join('/'));
        } 
        else if(this.hasSingleDependency && this.directDependencies[0].shouldReplaceParent()){
            result = this.directDependencies[0].evaluate();
        } 
        else {
            result = {};
            this.directDependencies.forEach( (dep) => {
                result[dep.nodeAccessor.key] = dep.evaluate();
            });
        }
        
        super.log("ObjectNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = ObjectNode;