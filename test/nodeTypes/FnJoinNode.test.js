const assert = require('assert');

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnJoinNode } = require('../../src/nodeTypes')

describe('FnJoin', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnJoinNode(mockNode, mockNodeAccessor, false);
  })

  it('evaluate strings', () => {
    addChildToNode(target, 0, "<separator>")
    addChildToNode(target, 1, [
      "valFirst",
      "valMiddle1",
      "valMiddle2"
    ]);


    const actual = target.evaluate();

    assert.equal(actual, "valFirst<separator>valMiddle1<separator>valMiddle2");
  });

  it('evaluate integeres', () => {
    addChildToNode(target, 0, "-");
    addChildToNode(target, 1, [
      1234,
      0,
      -99,
    ]);
    const actual = target.evaluate();

    assert.equal(actual, "1234-0--99");
  });

  it('evaluate floats', () => {
    addChildToNode(target, 0, "/");
    addChildToNode(target, 1, [
      0.1920,
      1.2,
      -99,
    ]);

    const actual = target.evaluate();

    assert.equal(actual, "0.192/1.2/-99");
  });
});