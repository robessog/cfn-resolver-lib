const ArrayNode = require('./ArrayNode');

// TODO: Add support for
//  - template parameter names
//  - resource logical IDs
//  - resource attributes
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html
class FnSub extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaluate() {
        let result = this.node;
        if(this.directDependencies.length == 2){
            let templateStr = this.directDependencies[0].evaluate();
            const dictionary = this.directDependencies[1].evaluate();
            for (const key in dictionary) {
                if (dictionary.hasOwnProperty(key)) {
                    const element = dictionary[key];
                    const strToReplace = "${" + key + "}";
                    // Replace all occurances
                    templateStr = templateStr.split(strToReplace).join(element);
                }
            }
            result = templateStr;
        }
        
        super.log("FnSub evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnSub;