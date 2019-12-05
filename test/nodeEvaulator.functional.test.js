const expect = require('chai').expect;

const NodeEvaulator = require('../src/index');

const enableLogging = false


const getExpectedObject = (templteStackName, paramsQaulifier) => {
    const expectedContent = require(`./testData/${templteStackName}/expected/expected-${paramsQaulifier}.json`);
    return expectedContent;
}

const getNewTargetInstance = (templteStackName, paramsQaulifier) => {
    const templatePath = `./testData/${templteStackName}/template.json`;
    const srcObject = require(templatePath);
    const paramsPath = `./testData/${templteStackName}/params/params-${paramsQaulifier}.json`;
    const paramsObject = require(paramsPath);
    return new NodeEvaulator(srcObject, paramsObject, enableLogging);
}

describe('NodeEvaulator', () => {
    it('evaulate stack1 example in us-east-1 Prod', () => {
        const methodParams = ["stack1", "us-east-1-prod"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaulateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaulate stack1 example in us-east-1 Beta', () => {
        const methodParams = ["stack1", "us-east-1-beta"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaulateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });

    it('evaulate stack1 example in us-west-2 Prod', () => {
        const methodParams = ["stack1", "us-west-2-prod"];
        const target = getNewTargetInstance(...methodParams);
        const actual = target.evaulateNodes();
        const expected = getExpectedObject(...methodParams)
        expect(actual).to.be.deep.equal(expected);
    });
});