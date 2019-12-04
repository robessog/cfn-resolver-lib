const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { ObjectNode } = require('../../src/nodeTypes')

describe('ObjectNode', () => {

  let target;

  beforeEach(() => {
    target = new ObjectNode(mockNode, mockNodeAccessor, false);
  })

  it('evaulate with single child that needs to replace parent (e.g. RefNode)', () => {
    addChildToNode(target, "originalKey", "MyBucketLogicalId", true);

    const actual = target.evaulate();

    expect(actual).to.deep.equal("MyBucketLogicalId")
  });

  it('evaulate with single child that should not replace parent (e.g. PropertyConditionNode)', () => {
    addChildToNode(target, "originalKey", "evaulatedValue", false);

    const actual = target.evaulate();

    expect(actual).to.deep.equal({ originalKey: "evaulatedValue" })
  });

  it('evaulate with multiple children', () => {
    addChildToNode(target, "originalKey1", "evaulatedValue1");
    addChildToNode(target, "originalKey2", "evaulatedValue2");
    addChildToNode(target, "originalKey3", "evaulatedValue3");

    const actual = target.evaulate();

    expect(actual).to.deep.equal(
      {
        originalKey1: "evaulatedValue1",
        originalKey2: "evaulatedValue2",
        originalKey3: "evaulatedValue3"
      }
    );
  });
});