const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnEqualsNode } = require('../../src/nodeTypes')

describe('FnEqualsNode', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnEqualsNode(mockNode, mockNodeAccessor, false);
  })

  it('evaluate when not the same strings', () => {
    addChildToNode(target, 0, "hello");
    addChildToNode(target, 1, "bello");
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(false)
  });

  it('evaluate when same strings', () => {
    addChildToNode(target, 0, "hello");
    addChildToNode(target, 1, "hello");
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(true)
  });

  it('evaluate when same object reference', () => {
    const sameObject = { myKey: "MyVal" };
    addChildToNode(target, 0, sameObject);
    addChildToNode(target, 1, sameObject);
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(true)
  });

  it('evaluate when same object content but different object reference', () => {
    addChildToNode(target, 0, { myKey: "MyVal" });
    addChildToNode(target, 1, { myKey: "MyVal" });
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(true)
  });

  it('evaluate comparing boolean with string: true == "true" should be false', () => {
    addChildToNode(target, 0, "true" );
    addChildToNode(target, 1, true);
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(false)
  });

  it('evaluate comparing number with string: 143 == "143" should be false', () => {
    addChildToNode(target, 0, "143" );
    addChildToNode(target, 1, 143);
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(false)
  });

  it('evaluate comparing number 0 with falsy value: 0 == false should be false', () => {
    addChildToNode(target, 0, 0 );
    addChildToNode(target, 1, false);
    
    const actual = target.evaluate();

    expect(actual).to.deep.equal(false)
  });

  // TODO: testcase when array
  // - is empty
  // - has only 1 item
  // - has more then 2 items
});