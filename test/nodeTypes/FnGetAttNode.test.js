const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor, getMockNode } = require('../testUtils');
const { FnGetAttNode } = require('../../src/nodeTypes')

const testGetAttResolvers = {
  "AuditLogsBucket": {
    "Arn": "arn:aws:s3:::us-east-1-beta-redshift-clusters-log"
  }
};

const TEST_QUEUE_NAME = "testSqs-beta"
const mockConvRoot = {
  wrappedObject: {
    Resources: {
      wrappedObject: {
        FooSrvQueue: {
          wrappedObject: {
            Properties: {
              wrappedObject:{
                QueueName: getMockNode("QueueName", TEST_QUEUE_NAME)
              }
            }
          }
        } 
      }
    }
  }
};

describe('FnGetAttNode', () => {

  let target;

  beforeEach(() => {
    target = new FnGetAttNode(mockNode, mockNodeAccessor, false, testGetAttResolvers, mockConvRoot.wrappedObject.Resources);
  })

  it('finds single attribute value in template object', () => {
    addChildToNode(target, 0, "FooSrvQueue");
    addChildToNode(target, 1, "QueueName");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(TEST_QUEUE_NAME);
  });

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
  // - add test for nested attributes lookups from template (e.g. "Foo.Bar")
  // - item is not found in Fn::GetAttResolvers (e.g. incorrect addressing in different levels)
});