const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnNot } = require('../../src/nodeTypes')

describe('FnNot', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnNot(mockNode, mockNodeAccessor, false);
  })

  it('evaulate (FnNot true) to false', () => {
    addChildToNode(target, 0, true);

    const actual = target.evaulate();

    expect(actual).to.deep.equal(false)
  });

  it('evaulate (FnNot false) to true', () => {
    addChildToNode(target, 0, false);
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(true)
  });

  // TODO: testcase when array length is not 1 or is not an array
});