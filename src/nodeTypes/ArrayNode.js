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

    evaulateResultedArray(array) {
        // simple array
        return array;
    }

    evaulate() {
        super.log("Eval: ", this.nodeAccessor.path.join('/'));
        if(this.isLeaf){
            super.log("Leaf: ",  this.node, this.nodeAccessor.path.join('/'));
            console.warn("Invalid Array: has no items, how to evaulate??");
            throw "Invalid Array: has no items, how to evaulate??";
            return ""; // Simple value (number, string)
        } else {
            const result = []
            this.directDependencies.forEach( (dep) => {
                const depRes = dep.evaulate();
                result[dep.nodeAccessor.key] = depRes;
            });
            
            super.log("Array evaulated: ");
            super.log(result);

            return this.evaulateResultedArray(result);
        }
    }
}

module.exports = ArrayNode;