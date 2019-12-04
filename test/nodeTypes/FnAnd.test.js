const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnAnd } = require('../../src/nodeTypes')

describe('FnAnd', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnAnd(mockNode, mockNodeAccessor, false);
  })

  it('evaulate multiple true items and single false item to false', () => {
    addChildToNode(target, 0, true);
    addChildToNode(target, 1, false);
    addChildToNode(target, 2, true);
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(false)
  });

  it('evaulate all items true to true', () => {
    addChildToNode(target, 0, true);
    addChildToNode(target, 1, true);
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(true)
  });

  // TODO: testcase when array is empty or contains only 1 item
});