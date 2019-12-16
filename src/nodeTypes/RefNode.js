const ResolveFromMapNode = require('./ResolveFromMapNode');

class RefNode extends ResolveFromMapNode {
    constructor(node, nodeAccessor, enableVerboseLogging, resolverMap) {
        super(node, nodeAccessor, enableVerboseLogging, resolverMap);
    }
}

module.exports = RefNode;