const ArrayNode = require('./ArrayNode');
class FnFindInMapNode extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging, mappings) {
        super(node, nodeAccessor, enableVerboseLogging);
        this.mappings = mappings;
    }

    evaulate() {
        let result = this.node;
        const mappingName = this.directDependencies[0].evaulate();
        const level1Key = this.directDependencies[1].evaulate();
        const level2Key = this.directDependencies[2].evaulate();
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

        super.log("FnFindInMapNode evaulated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnFindInMapNode;
