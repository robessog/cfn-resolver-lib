const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnOr } = require('../../src/nodeTypes')

describe('FnOr', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnOr(mockNode, mockNodeAccessor, false);
  })

  it('evaulate multiple false items and single true item to true', () => {
    addChildToNode(target, 0, false);
    addChildToNode(target, 1, true);
    addChildToNode(target, 2, false);
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(true)
  });

  it('evaulate all items false to false', () => {
    addChildToNode(target, 0, false);
    addChildToNode(target, 1, false);
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(false)
  });

  // TODO: testcase when array is empty or contains only 1 item
});