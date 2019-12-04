const assert = require('assert');

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { ConditionNode } = require('../../src/nodeTypes')


const convertedConditions = {
  wrappedObject: {
    False: { evaulate: () => false },
    True: { evaulate: () => true },
    IsRegionIAD: { evaulate: () => true },
    IsRegionPDX: { evaulate: () => false }
  }
};

describe('ConditionNode', () => {

  let target;


  it('evaulate False condition', () => {
    target = new ConditionNode("False", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaulate();
    assert.equal(actual, false);
  });

  it('evaulate True condition', () => {
    target = new ConditionNode("True", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaulate();
    assert.equal(actual, true);
  });

  it('evaulate IsRegionIAD condition', () => {
    target = new ConditionNode("IsRegionIAD", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaulate();
    assert.equal(actual, true);
  });

  it('evaulate IsRegionPDX condition', () => {
    target = new ConditionNode("IsRegionPDX", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaulate();
    assert.equal(actual, false);
  });
});