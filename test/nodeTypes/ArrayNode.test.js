const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { ArrayNode } = require('../../src/nodeTypes')

describe('ArrayNode', () => {

  let target;
  
  beforeEach(()=> {
    target = new ArrayNode(mockNode, mockNodeAccessor, false);
  })

  it('evaluate shallow values', () => {
    addChildToNode(target, 0, "item0");
    addChildToNode(target, 1, "item1");
    addChildToNode(target, 2, "item2");
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(["item0", "item1", "item2"])
  });

  it('evaluate nested arrays', () => {
    addChildToNode(target, 0, "item0");
    const nestedArray = [ 9, 8, "testValue" ]
    addChildToNode(target, 1, nestedArray);
    addChildToNode(target, 2, "item2");
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(["item0", nestedArray , "item2"])
  });

  // TODO: testcase when array is empty
});