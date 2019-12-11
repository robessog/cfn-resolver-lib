const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnSelect } = require('../../src/nodeTypes')

describe('FnSelect', () => {

  let target;

  beforeEach(() => {
    target = new FnSelect(mockNode, mockNodeAccessor, false);
  })

  it('evaluate single item list', () => {
    addChildToNode(target, 0, 0)
    addChildToNode(target, 1, [ 12 ]);

    const actual = target.evaluate();

    expect(actual).to.deep.equal(12);
  });

  it('evaluate when index 0', () => {
    addChildToNode(target, 0, 0)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaluate();

    expect(actual).to.deep.equal("apples");
  });

  it('evaluate when index middle', () => {
    addChildToNode(target, 0, 2)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaluate();

    expect(actual).to.deep.equal("oranges");
  });

  it('evaluate when index last item', () => {
    addChildToNode(target, 0, 3)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaluate();

    expect(actual).to.deep.equal("mangoes");
  });

  it('evaluate when index is out of bound by 1', () => {
    addChildToNode(target, 0, 4)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    expect( () => target.evaluate()).to.throw("Index 4 is out of bound.");
  });
});