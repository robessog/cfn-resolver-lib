const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor, getMockNode } = require('../testUtils');
const { FnGetAttNode } = require('../../src/nodeTypes')

const testGetAttResolvers = {
  "AuditLogsBucket": {
    "Arn": "arn:aws:s3:::us-east-1-beta-redshift-clusters-log"
  }
};

const TEST_QUEUE_NAME = "testSqs-beta";
const mockQueueNameNode = getMockNode("QueueName", TEST_QUEUE_NAME);

const convertedQueue = {
  wrappedObject: {
    Properties: {
      wrappedObject: {
        QueueName: mockQueueNameNode
      }
    },
    Type: "AWS::SQS::Queue"
  },
  isPropertyDefinedOnObjectPath: () => true,
  getResolvedProperyValueOnObjectPath: () => TEST_QUEUE_NAME
};

const mockFindWrappedResource = (logicalId) => {
  switch (logicalId) {
    case "FooSrvQueue":
      return convertedQueue;
  }
}

const existingResourceMockConvRoot = {
  wrappedObject: {
    Resources: {
      hasAncestorOnPath: () => true,
      findWrappedAncestorByPathArray: () => mockQueueNameNode,
      wrappedObject: {
        FooSrvQueue: convertedQueue
      },
      findWrappedResource: mockFindWrappedResource,
      getResolvedArn: () => "arn:aws:sqs:us-east-2:123123123123:testSqs-beta"
    }
  }
};

const attResolverTestMockConvRoot = {
  wrappedObject: {
    Resources: {
      hasAncestorOnPath: () => false,
      findWrappedAncestorByPathArray: () => undefined,
      wrappedObject: {
        FooSrvQueue: convertedQueue
      },
      findWrappedResource: () => undefined
    }
  }
};

describe('FnGetAttNode', () => {

  const createTarget = (mockConvRoot) => {
    return new FnGetAttNode(mockNode,
      mockNodeAccessor,
      false,
      testGetAttResolvers,
      mockConvRoot,
      {}
    );
  }

  it('finds single attribute value in template object', () => {
    const target = createTarget(existingResourceMockConvRoot);
    addChildToNode(target, 0, "FooSrvQueue");
    addChildToNode(target, 1, "QueueName");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(TEST_QUEUE_NAME);
  });

  it('finds attribute value in Fn::GetAttResolvers object', () => {
    const target = createTarget(attResolverTestMockConvRoot);
    addChildToNode(target, 0, "AuditLogsBucket");
    addChildToNode(target, 1, "Arn");

    const actual = target.evaluate();

    expect(actual).to.deep.equal("arn:aws:s3:::us-east-1-beta-redshift-clusters-log")
  });

  it('resolves Arn from built in Arn schemas', () => {
    const target = createTarget(existingResourceMockConvRoot);
    addChildToNode(target, 0, "FooSrvQueue");
    addChildToNode(target, 1, "Arn");

    const actual = target.evaluate();

    expect(actual).to.deep.equal("arn:aws:sqs:us-east-2:123123123123:testSqs-beta");
  });

  // TODO: testcase when
  // - array is empty
  // - array has < 2 item
  // - array has >= 3 items
  // - add test for nested attributes lookups from template (e.g. "Foo.Bar")
  // - item is not found in Fn::GetAttResolvers (e.g. incorrect addressing in different levels)
});