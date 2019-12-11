const getMockNode = (key, evaluatedValue, shouldReplaceParent = false) => {
    return {
        nodeAccessor: {
            key: key
        },
        evaluate() {
            return evaluatedValue;
        },
        shouldReplaceParent: () => {
            return !!shouldReplaceParent;
        }
    }
}

const addChildToNode = (node, key, childsEvaluatedValue, shouldReplaceParent = false) => {
    node.addChild(key, getMockNode(key, childsEvaluatedValue, shouldReplaceParent));
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