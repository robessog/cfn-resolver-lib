const assert = require('assert');

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { ConditionNode } = require('../../src/nodeTypes')


const convertedConditions = {
  wrappedObject: {
    False: { evaluate: () => false },
    True: { evaluate: () => true },
    IsRegionIAD: { evaluate: () => true },
    IsRegionPDX: { evaluate: () => false }
  }
};

describe('ConditionNode', () => {

  let target;


  it('evaluate False condition', () => {
    target = new ConditionNode("False", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaluate();
    assert.equal(actual, false);
  });

  it('evaluate True condition', () => {
    target = new ConditionNode("True", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaluate();
    assert.equal(actual, true);
  });

  it('evaluate IsRegionIAD condition', () => {
    target = new ConditionNode("IsRegionIAD", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaluate();
    assert.equal(actual, true);
  });

  it('evaluate IsRegionPDX condition', () => {
    target = new ConditionNode("IsRegionPDX", mockNodeAccessor, false, convertedConditions);
    const actual = target.evaluate();
    assert.equal(actual, false);
  });
});