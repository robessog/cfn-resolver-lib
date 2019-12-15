class ArnResolver {
    constructor(defaultArnSchemaMap, userDefinedArnSchemaMap, refResolvers) {
        this.defaultArnSchemaMap = defaultArnSchemaMap;
        this.userDefinedArnSchemaMap = userDefinedArnSchemaMap;
        this.refResolvers = refResolvers;
    }

    getResolvedArn(resourceNode) {
        let result = undefined;
        const arnSchema = this.findArnSchema(resourceNode);
        if (arnSchema) {
            let arn = this.replaceStackParams(arnSchema);
            const placeHolderAttrName = this.getResourceNamePlaceholderAttrName(arn);
            const arnSchemePlaceHolderAttrPath = [placeHolderAttrName];
            if (resourceNode.isPropertyDefined(arnSchemePlaceHolderAttrPath)) {
                const attrValue = resourceNode.getResolvedProperyValue(arnSchemePlaceHolderAttrPath);
                result = arn.replace("${" + placeHolderAttrName + "}", attrValue);
            }
        }
        return result;
    }

    replaceStackParams(arnTemplate) {
        let arn = arnTemplate.replace('${Account}', this.refResolvers["AWS::AccountId"]);
        arn = arn.replace('${Partition}', this.refResolvers["AWS::Partition"]);
        arn = arn.replace('${Region}', this.refResolvers["AWS::Region"]);
        return arn;
    }

    findArnSchema(resourceNode) {
        const resourceType = resourceNode.getType();
        return this.userDefinedArnSchemaMap[resourceType] || this.defaultArnSchemaMap[resourceType];
    }

    getResourceNamePlaceholderAttrName(arnSchema) {
        const arn = arnSchema.replace('${Account}', '').replace('${Partition}', '').replace('${Region}', '');
        const str = arn.split("${")[1];
        const result = str.substring(0, str.length - 1);
        return result;
    }
}

module.exports = ArnResolver;