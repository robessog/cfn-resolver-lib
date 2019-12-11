const expect = require('chai').expect;

const { mockNodeAccessor } = require('../testUtils');
const { RefNode } = require('../../src/nodeTypes')

const refResolvers = {
  "AWS::Region": "us-east-1",
  "AWS::Partition": "aws",
  "AWS::AccountId": "666666666666",
  "Stage": "beta",
  "AWS::StackId": "MyEvaluatedFakeStack"
};

describe('RefNode', () => {

  let target;

  it('evaluates predefined AWS::Region parameters', () => {
    target = new RefNode("AWS::Region", mockNodeAccessor, false, refResolvers);
    const actual = target.evaluate();
    expect(actual).to.deep.equal("us-east-1");
  });

  it('evaluates LogicalId references', () => {
    target = new RefNode("MyS3BucketLogicalId", mockNodeAccessor, false, refResolvers);
    const actual = target.evaluate();
    expect(actual).to.deep.equal("MyS3BucketLogicalId");
  });
});