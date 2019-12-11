const assert = require('assert');

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnIf } = require('../../src/nodeTypes')


const convertedConditions = {
  wrappedObject: {
    False: { evaluate: () => false },
    True: { evaluate: () => true }
  }
};

describe('FnIf', () => {

  let target;

  beforeEach(()=> {
    target = new FnIf(mockNode, mockNodeAccessor, false, convertedConditions);
  })

  it('evaluate if false', () => {
    addChildToNode(target,  0, "False")
    addChildToNode(target,  1, "testTrueValue")
    addChildToNode(target,  2, "testFalseValue")
    const actual = target.evaluate();
    assert.equal(actual, "testFalseValue");
  });

  it('evaluate if true', () => {
    addChildToNode(target,  0, "True")
    addChildToNode(target,  1, "testTrueValue")
    addChildToNode(target,  2, "testFalseValue")
    const actual = target.evaluate();
    assert.equal(actual, "testTrueValue");
  });

  // TODO: Add test case when
  // - array length is not exactly 3
  // - condition is not found
});