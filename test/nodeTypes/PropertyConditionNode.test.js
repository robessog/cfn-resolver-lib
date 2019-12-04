const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { PropertyConditionNode } = require('../../src/nodeTypes')

describe('PropertyConditionNode', () => {

  let target;

  beforeEach(() => {
    target = new PropertyConditionNode(mockNode, mockNodeAccessor, false);
  })

  it('evaulate keeps condition node', () => {
    const expected = {"StringEqualsIgnoreCase":  { "aws:username" : "johndoe" }};
    addChildToNode(target, "StringEqualsIgnoreCase", { "aws:username" : "johndoe" });

    const actual = target.evaulate();
    expect(actual).to.deep.equal(expected);
  });

});