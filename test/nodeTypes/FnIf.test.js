const assert = require('assert');

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnIf } = require('../../src/nodeTypes')


const convertedConditions = {
  wrappedObject: {
    False: { evaulate: () => false },
    True: { evaulate: () => true }
  }
};

describe('FnIf', () => {

  let target;

  beforeEach(()=> {
    target = new FnIf(mockNode, mockNodeAccessor, false, convertedConditions);
  })

  it('evaulate if false', () => {
    addChildToNode(target,  0, "False")
    addChildToNode(target,  1, "testTrueValue")
    addChildToNode(target,  2, "testFalseValue")
    const actual = target.evaulate();
    assert.equal(actual, "testFalseValue");
  });

  it('evaulate if true', () => {
    addChildToNode(target,  0, "True")
    addChildToNode(target,  1, "testTrueValue")
    addChildToNode(target,  2, "testFalseValue")
    const actual = target.evaulate();
    assert.equal(actual, "testTrueValue");
  });

  // TODO: Add test case when
  // - array length is not exactly 3
  // - condition is not found
});