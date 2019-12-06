const {
    FnEqualsNode,
    FnFindInMapNode,
    FnJoinNode,
    FnSub,
    FnSplit,
    FnSelect,
    FnGetAZsNode,
    RefNode,
    ObjectNode,
    FnOr,
    FnAnd,
    FnNot,
    FnIf,
    ConditionNode,
    PropertyConditionNode,
    FnGetAttNode,
    ArrayNode
} = require('./nodeTypes');
const _ = require('lodash')
const azMapping = require('./AZMap.json');

const convertNode = (node, nodeAccessor, srcObj, params, convRoot, enableVerboseLogging) => {

    switch (nodeAccessor.key) {
        case "Fn::FindInMap":
            return new FnFindInMapNode(node, nodeAccessor, enableVerboseLogging, srcObj.Mappings);
        case "Fn::Join":
            return new FnJoinNode(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Sub":
            return new FnSub(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Split":
            return new FnSplit(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Select":
            return new FnSelect(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Equals":
            return new FnEqualsNode(node, nodeAccessor, enableVerboseLogging);
        case "Fn::And":
            return new FnAnd(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Or":
            return new FnOr(node, nodeAccessor, enableVerboseLogging);
        case "Fn::Not":
            return new FnNot(node, nodeAccessor, enableVerboseLogging);
        case "Fn::If":
            return new FnIf(node, nodeAccessor, enableVerboseLogging, convRoot.wrappedObject.Conditions);
        case "Fn::GetAZs":
            return new FnGetAZsNode(node, nodeAccessor, enableVerboseLogging, azMapping, params.RefResolveres["AWS::Region"]);
        case "Condition":
            if (nodeAccessor.path.length >= 3 && nodeAccessor.path[2] == "Properties") {
                return new PropertyConditionNode(node, nodeAccessor, enableVerboseLogging);
            }
            return new ConditionNode(node, nodeAccessor, enableVerboseLogging, convRoot.wrappedObject.Conditions);
        case "Ref":
            return new RefNode(node, nodeAccessor, enableVerboseLogging, params.RefResolveres);
        case "Fn::GetAtt":
            return new FnGetAttNode(node, nodeAccessor, enableVerboseLogging, params["Fn::GetAttResolvers"]);
    }

    if( _.isArray(nodeAccessor.node)){
        return new ArrayNode(node, nodeAccessor, enableVerboseLogging);
    }
    return new ObjectNode(node, nodeAccessor, enableVerboseLogging);
};

exports.convertNode = convertNode;