const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnGetAZsNode } = require('../../src/nodeTypes')

const azMapping = {
  'us-east-1': [
    'us-east-1a',
    'us-east-1b',
    'us-east-1c',
    'us-east-1d',
    'us-east-1e',
    'us-east-1f'
  ],
  "us-west-2": [
    "us-west-2a",
    "us-west-2b",
    "us-west-2c",
    "us-west-2d"
  ]
};

describe('FnGetAZsNode', () => {
  it('finds AZs for current region', () => {
    const target = new FnGetAZsNode(mockNode, mockNodeAccessor, false, azMapping, "us-east-1");
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal([
      'us-east-1a',
      'us-east-1b',
      'us-east-1c',
      'us-east-1d',
      'us-east-1e',
      'us-east-1f'
    ]);
  });

  it('finds AZs when Fn::GetAZs is called with region parameter', () => {
    const target = new FnGetAZsNode(mockNode, mockNodeAccessor, false, azMapping, "us-east-1");
    addChildToNode(target, 0, "us-west-2");
    const actual = target.evaulate();

    expect(actual).to.deep.equal([
      "us-west-2a",
      "us-west-2b",
      "us-west-2c",
      "us-west-2d"
    ]);
  });

  // TODO: testcase when
  // - no AZ found
});