const expect = require('chai').expect;

const ArnResolver = require('../src/ArnResolver');
const { getMockNode } = require('./testUtils');

const testRefResolvers = {
  "AWS::AccountId": "123123123123",
  "AWS::Partition": "aws",
  "AWS::Region": "us-east-2"
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
    Type: "AWS::SQS::Queue",
  },
  isPropertyDefinedOnObjectPath: () => true,
  getResolvedProperyValueOnObjectPath: () => TEST_QUEUE_NAME,
  getType: () => "AWS::SQS::Queue",
  isPropertyDefined: () => true,
  getResolvedProperyValue: () => TEST_QUEUE_NAME
};

const TEST_BUCKET_NAME = "test-bucket-beta";
const mockBucketNameNode = getMockNode("BucketName", TEST_BUCKET_NAME);
const convertedBucket= {
  wrappedObject: {
    Properties: {
      wrappedObject: {
        BucketName: mockBucketNameNode
      }
    },
    Type: "AWS::S3::Bucket",
  },
  isPropertyDefinedOnObjectPath: () => true,
  getResolvedProperyValueOnObjectPath: () => TEST_BUCKET_NAME,
  getType: () => "AWS::S3::Bucket",
  isPropertyDefined: () => true,
  getResolvedProperyValue: () => TEST_BUCKET_NAME
};

describe('ArnResolver', () => {

  const target = new ArnResolver({
    "AWS::S3::Bucket": "arn:${Partition}:s3:::${BucketName}"
  }, {
    "AWS::SQS::Queue": "arn:${Partition}:sqs:${Region}:${Account}:${QueueName}"
  }, testRefResolvers);

  it('resolves build-in arn schema', () => {
    const actual = target.getResolvedArn(convertedQueue);
    expect(actual).to.be.deep.equal("arn:aws:sqs:us-east-2:123123123123:testSqs-beta");
  });

  it('resolves user-defined arn schema', () => {
    const actual = target.getResolvedArn(convertedBucket);
    expect(actual).to.be.deep.equal("arn:aws:s3:::test-bucket-beta");
  });

  it('user-defined schama can override built-in schema', () => {
    const target = new ArnResolver({
      "AWS::SQS::Queue": "incorrectBuiltInArnSchema"
    }, {
      "AWS::SQS::Queue": "arn:${Partition}:sqs:${Region}:${Account}:${QueueName}"
    }, testRefResolvers);

    const actual = target.getResolvedArn(convertedQueue);
    expect(actual).to.be.deep.equal("arn:aws:sqs:us-east-2:123123123123:testSqs-beta");
  });
});