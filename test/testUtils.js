const getMockNode = (key, evaulatedValue, shouldReplaceParent = false) => {
    return {
        nodeAccessor: {
            key: key
        },
        evaulate() {
            return evaulatedValue;
        },
        shouldReplaceParent: () => {
            return !!shouldReplaceParent;
        }
    }
}

const addChildToNode = (node, key, childsEvaulatedValue, shouldReplaceParent = false) => {
    node.addChild(key, getMockNode(key, childsEvaulatedValue, shouldReplaceParent));
}

const mockNode = { fakeKey: "fakeVal" };
const mockNodeAccessor = {
    path: [ "fakePathSegment1", "fakePathSegment2"]
};

module.exports = {
    addChildToNode,
    mockNode,
    mockNodeAccessor
}