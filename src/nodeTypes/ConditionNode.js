const ObjectNode = require('./ObjectNode');

class ConditionNode extends ObjectNode {
    constructor(node, nodeAccessor, enableVerboseLogging, convConditions) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.convConditions = convConditions;
    }

    shouldReplaceParent(){
        return true;
    }
    
    evaulate(){
        let result = this.node;
        if(this.convConditions.wrappedObject.hasOwnProperty(this.node)){
            result = this.convConditions.wrappedObject[this.node].evaulate();
        } 
        // might not needed
        else if(this.hasSingleDependency){
            result = this.directDependencies[0].evaulate();
        }

        super.log("Evalulated ConditionNode: " + this.node);
        super.log(result);
        return result;
    }
}

module.exports = ConditionNode;