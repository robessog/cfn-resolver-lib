const ArrayNode = require('./ArrayNode');

class FnIf extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, convConditions) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.convConditions = convConditions;
    }

    evaulate() {
        let result = this.node;
        if (this.directDependencies.length >= 3) {
            const conditionName = this.directDependencies[0].evaulate();
            const evaulatedCondition = this.convConditions.wrappedObject[conditionName].evaulate();
            const valueIfTrue = this.directDependencies[1].evaulate();
            const valueIfFalse = this.directDependencies[2].evaulate();
            result = evaulatedCondition ? valueIfTrue : valueIfFalse;
        }

        super.log("FnIf evaulated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnIf;