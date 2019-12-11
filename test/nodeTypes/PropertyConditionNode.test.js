const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { PropertyConditionNode } = require('../../src/nodeTypes')

describe('PropertyConditionNode', () => {

  let target;

  beforeEach(() => {
    target = new PropertyConditionNode(mockNode, mockNodeAccessor, false);
  })

  it('evaluate keeps condition node', () => {
    const expected = {"StringEqualsIgnoreCase":  { "aws:username" : "johndoe" }};
    addChildToNode(target, "StringEqualsIgnoreCase", { "aws:username" : "johndoe" });

    const actual = target.evaluate();
    expect(actual).to.deep.equal(expected);
  });

});