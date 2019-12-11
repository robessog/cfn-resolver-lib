const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnGetAttNode } = require('../../src/nodeTypes')

const testGetAttResolvers = {
  "AuditLogsBucket": {
    "Arn": "arn:aws:s3:::us-east-1-beta-redshift-clusters-log"
  }
};

describe('FnGetAttNode', () => {

  let target;

  beforeEach(() => {
    target = new FnGetAttNode(mockNode, mockNodeAccessor, false, testGetAttResolvers);
  })

  it('finds attribute value in Fn::GetAttResolvers object', () => {
    addChildToNode(target, 0, "AuditLogsBucket");
    addChildToNode(target, 1, "Arn");

    const actual = target.evaluate();

    expect(actual).to.deep.equal("arn:aws:s3:::us-east-1-beta-redshift-clusters-log")
  });

  // TODO: testcase when
  // - array is empty
  // - array has < 2 item
  // - array has >= 3 items
  // - item is not found in Fn::GetAttResolvers (e.g. incorrect addressing in different levels)
});