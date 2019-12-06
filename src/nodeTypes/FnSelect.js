const ArrayNode = require('./ArrayNode');
const _ = require('lodash');

class FnSelect extends ArrayNode {
    constructor(node, nodeAccessor, enableVerboseLogging) {
        super(node, nodeAccessor, enableVerboseLogging);
    }

    evaulate() {
        let result = this.node;
        if(this.directDependencies.length == 2){
            let index = this.directDependencies[0].evaulate();
            const listOfObjects = this.directDependencies[1].evaulate();
            console.log(`Evaulate FnSelect, listOfObjects: `);
            console.log(listOfObjects);
            if(_.isArray(listOfObjects) && index < listOfObjects.length){
                result = listOfObjects[index];
            } else{
                const error = `Index ${index} is out of bound.`;
                console.warn(error);
                throw error;
            }
        }
        
        super.log("FnSelect evaulated: ");
        super.log(result);
        return result;
    }
}

module.exports = FnSelect;