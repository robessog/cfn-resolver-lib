const Node = require('./Node');

class ArrayNode extends Node {
    constructor(node, nodeAccessor, enableVerboseLogging){
        super(node, nodeAccessor, enableVerboseLogging)
        this.directDependencies = [];
    }

    shouldReplaceParent(){
        return true;
    }

    addChild(key, child){
        this.directDependencies[key] = child;
    }

    get wrappedObject() {
        return this.directDependencies;
    }

    evaluateResultedArray(array) {
        // simple array
        return array;
    }

    evaluate() {
        super.log("Eval: ", this.nodeAccessor.path.join('/'));
        if(this.isLeaf){
            super.log("Leaf: ",  this.node, this.nodeAccessor.path.join('/'));
        }

        const result = []
        this.directDependencies.forEach( (dep) => {
            const depRes = dep.evaluate();
            result[dep.nodeAccessor.key] = depRes;
        });
        
        super.log("Array evaluated: ");
        super.log(result);

        return this.evaluateResultedArray(result);
    }
}

module.exports = ArrayNode;