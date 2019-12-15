// Search ARNs from: https://github.com/aws-cloudformation/cfn-python-lint/blob/master/src/cfnlint/data/AdditionalSpecs/Policies.json
// AWS CloudFormation doc: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#genref-aws-service-namesspaces

const defaultArnSchemeMap = {
    // "AWS::SNS::Subscription": "", // not found maybe because it has a generated guid suffix
    "AWS::Lambda::Function":        "arn:${Partition}:lambda:${Region}:${Account}:function:${FunctionName}",
    "AWS::SNS::Topic":              "arn:${Partition}:sns:${Region}:${Account}:${TopicName}",
    "AWS::SQS::Queue":              "arn:${Partition}:sqs:${Region}:${Account}:${QueueName}",
    "AWS::CloudWatch::Alarm":       "arn:${Partition}:cloudwatch:${Region}:${Account}:alarm:${AlarmName}",
    // "AWS::Events::Rule": "",
    // "AWS::IAM::Role": "",
    // "AWS::IAM::Policy": "",
    // "AWS::KMS::Key": "",
    // "AWS::IAM::ManagedPolicy": "",
    "AWS::S3::Bucket":               "arn:${Partition}:s3:::${BucketName}"
};

module.exports = defaultArnSchemeMap;