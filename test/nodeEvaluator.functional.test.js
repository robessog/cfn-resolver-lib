const expect = require('chai').expect;

const NodeEvaluator = require('../src/index');

const enableLogging = false


const getExpectedObject = (templateStackName, paramsQaulifier) => {
    const expectedContent = require(`./testData/${templateStackName}/expected/expected-${paramsQaulifier}.json`);
    return expectedContent;
}

const getNewTargetInstance = (templateStackName, paramsQaulifier) => {
    const templatePath = `./testData/${templateStackName}/template.json`;
    const srcObject = require(templatePath);
    const paramsPath = `./testData/${templateStackName}/params/params-${paramsQaulifier}.json`;
    const paramsObject = require(paramsPath);
    return new NodeEvaluator(srcObject, paramsObject, enableLogging);
}

describe('NodeEvaluator', () => {
    it('evaluate stack1 example in us-east-1 Prod', () => {
        const methodParams = ["stack1", "us-east-1-prod"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaluateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaluate stack1 example in us-east-1 Prod testing backward compatibility method "evaluateNodes()"', () => {
        const methodParams = ["stack1", "us-east-1-prod"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaulateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaluate stack1 example in us-east-1 Beta', () => {
        const methodParams = ["stack1", "us-east-1-beta"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaluateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaluate stack1 example in us-west-2 Prod', () => {
        const methodParams = ["stack1", "us-west-2-prod"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaluateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaluate stack1 example in us-east-1 Prod using override params', () => {
        const [templateStackName, paramsQaulifier] = methodParams = ["stack1", "us-east-1-prod"];
        const templatePath = `./testData/${templateStackName}/template.json`;
        const srcObject = require(templatePath);
        const paramsPath = `./testData/${templateStackName}/params/params-${paramsQaulifier}.json`;
        const paramsObject = require(paramsPath);
        const target = new NodeEvaluator(srcObject);
        const actual = target.evaluateNodes(paramsObject);
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    // TODO: run on these valid test data: https://github.com/martysweet/cfn-lint/tree/master/testData/valid/json
});