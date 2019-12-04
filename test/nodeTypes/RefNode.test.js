const expect = require('chai').expect;

const { mockNodeAccessor } = require('../testUtils');
const { RefNode } = require('../../src/nodeTypes')

const refResolvers = {
  "AWS::Region": "us-east-1",
  "AWS::Partition": "aws",
  "AWS::AccountId": "666666666666",
  "Stage": "beta",
  "AWS::StackId": "MyEvaulatedFakeStack"
};

describe('RefNode', () => {

  let target;

  it('evaulates predefined AWS::Region parameters', () => {
    target = new RefNode("AWS::Region", mockNodeAccessor, false, refResolvers);
    const actual = target.evaulate();
    expect(actual).to.deep.equal("us-east-1");
  });

  it('evaulates LogicalId references', () => {
    target = new RefNode("MyS3BucketLogicalId", mockNodeAccessor, false, refResolvers);
    const actual = target.evaulate();
    expect(actual).to.deep.equal("MyS3BucketLogicalId");
  });
});