class Node {
    constructor(node, nodeAccessor, enableVerboseLogging){
        this.node = node;
        this.nodeAccessor = nodeAccessor;
        this.directDependencies = [];
        this.enableVerboseLogging = enableVerboseLogging;
    }

    log(str) {
        if(this.enableVerboseLogging){
            console.log(str);
        }
    }

    get wrappedObject() {
        throw 'Method needs to be implemented by child class'
    }

    shouldReplaceParent(){
        return false;
    }

    get isLeaf(){
        return this.directDependencies.length === 0;
    }

    get hasSingleDependency(){
        return this.directDependencies.length === 1;
    }

    evaulate(){
        throw "Should not happen, child class implementations should handle this case";
    }
}

module.exports = Node;