// Search ARNs from: https://github.com/aws-cloudformation/cfn-python-lint/blob/master/src/cfnlint/data/AdditionalSpecs/Policies.json
// AWS CloudFormation doc: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#genref-aws-service-namesspaces

const defaultArnSchemeMap = {
    "AWS::Lambda::Function":        "arn:${Partition}:lambda:${Region}:${Account}:function:${FunctionName}",
    "AWS::SNS::Topic":              "arn:${Partition}:sns:${Region}:${Account}:${TopicName}",
    "AWS::SQS::Queue":              "arn:${Partition}:sqs:${Region}:${Account}:${QueueName}",
    "AWS::CloudWatch::Alarm":       "arn:${Partition}:cloudwatch:${Region}:${Account}:alarm:${AlarmName}",
    "AWS::EC2::Subnet":             "arn:${Partition}:ec2:${Region}:${Account}:subnet/${SubnetId}",
    "AWS::EC2::VPC":                "arn:${Partition}:ec2:${Region}:${Account}:vpc/${VpcId}",
    "AWS::S3::Bucket":              "arn:${Partition}:s3:::${BucketName}",
    "AWS::EC2::SecurityGroup":      "arn:${Partition}:ec2:${Region}:${Account}:security-group/${SecurityGroupId}",
    "AWS::DynamoDB::Table":         "arn:${Partition}:dynamodb:${Region}:${Account}:table/${TableName}"
    // "AWS::SNS::Subscription": "", // not found maybe because it has a generated guid suffix
    // "AWS::Events::Rule": "",
    // "AWS::IAM::Role": "",
    // "AWS::IAM::Policy": "",
    // "AWS::KMS::Key": "",
    // "AWS::IAM::ManagedPolicy": "",
};

module.exports = defaultArnSchemeMap;