const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { ObjectNode } = require('../../src/nodeTypes')

describe('ObjectNode', () => {

  let target;

  beforeEach(() => {
    target = new ObjectNode(mockNode, mockNodeAccessor, false);
  })

  it('evaluate with single child that needs to replace parent (e.g. RefNode)', () => {
    addChildToNode(target, "originalKey", "MyBucketLogicalId", true);

    const actual = target.evaluate();

    expect(actual).to.deep.equal("MyBucketLogicalId")
  });

  it('evaluate with single child that should not replace parent (e.g. PropertyConditionNode)', () => {
    addChildToNode(target, "originalKey", "evaluatedValue", false);

    const actual = target.evaluate();

    expect(actual).to.deep.equal({ originalKey: "evaluatedValue" })
  });

  it('evaluate with multiple children', () => {
    addChildToNode(target, "originalKey1", "evaluatedValue1");
    addChildToNode(target, "originalKey2", "evaluatedValue2");
    addChildToNode(target, "originalKey3", "evaluatedValue3");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(
      {
        originalKey1: "evaluatedValue1",
        originalKey2: "evaluatedValue2",
        originalKey3: "evaluatedValue3"
      }
    );
  });
});