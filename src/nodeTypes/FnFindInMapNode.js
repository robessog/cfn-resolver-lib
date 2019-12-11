const ArrayNode = require('./ArrayNode');
class FnFindInMapNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, mappings) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.mappings = mappings;
    }

    evaluate() {
        let result = this.node;
        const mappingName = this.directDependencies[0].evaluate();
        const level1Key = this.directDependencies[1].evaluate();
        const level2Key = this.directDependencies[2].evaluate();
        if (!this.mappings.hasOwnProperty(mappingName)) {
            console.warn("Not found mapping: " + mappingName);
        }
        else if (!this.mappings[mappingName].hasOwnProperty(level1Key)) {
            console.warn("Not foud direct child " + level1Key + " in map: " + mappingName);
        }
        if (!this.mappings[mappingName][level1Key].hasOwnProperty(level2Key)) {
            console.warn("Not foud second level map key " + level2Key + " in mapping: " + mappingName + "." + level1Key);
        }
        else {
            result = this.mappings[mappingName][level1Key][level2Key];
        }

        super.log("FnFindInMapNode evaluated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnFindInMapNode;
