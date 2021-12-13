const ArrayNode = require('./ArrayNode');

// TODO: Add support for
//  - template parameter names
//  - resource logical IDs
//  - resource attributes
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html
class FnSub extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, resolverMap) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.resolverMap = resolverMap;
    }

    evaluate() {
        let result = this.node;
        let templateStr;
        let dictionary = {};
        if(this.isLeaf) {
            templateStr = this.node;
            dictionary = this.resolverMap;
        } else if (this.directDependencies.length == 2) {
            templateStr = this.directDependencies[0].evaluate();
            dictionary = this.directDependencies[1].evaluate();
        }
        if(templateStr) {
            result = templateStr.replace(/\$\{([^}]+)\}/g, function(fullMatch, groupMatch) {
                if (dictionary.hasOwnProperty(groupMatch)) {
                    return dictionary[groupMatch];
                }
                return fullMatch;
            });
        }
        
        super.log("FnSub evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnSub;