const ArrayNode = require('./ArrayNode');

class FnIf extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, convConditions) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.convConditions = convConditions;
    }

    evaluate() {
        let result = this.node;
        if (this.directDependencies.length >= 3) {
            const conditionName = this.directDependencies[0].evaluate();
            const evaluatedCondition = this.convConditions.wrappedObject[conditionName].evaluate();
            const valueIfTrue = this.directDependencies[1].evaluate();
            const valueIfFalse = this.directDependencies[2].evaluate();
            result = evaluatedCondition ? valueIfTrue : valueIfFalse;
        }

        super.log("FnIf evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnIf;