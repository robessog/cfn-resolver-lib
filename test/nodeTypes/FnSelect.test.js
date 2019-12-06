const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnSelect } = require('../../src/nodeTypes')

describe('FnSelect', () => {

  let target;

  beforeEach(() => {
    target = new FnSelect(mockNode, mockNodeAccessor, false);
  })

  it('evaulate single item list', () => {
    addChildToNode(target, 0, 0)
    addChildToNode(target, 1, [ 12 ]);

    const actual = target.evaulate();

    expect(actual).to.deep.equal(12);
  });

  it('evaulate when index 0', () => {
    addChildToNode(target, 0, 0)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaulate();

    expect(actual).to.deep.equal("apples");
  });

  it('evaulate when index middle', () => {
    addChildToNode(target, 0, 2)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaulate();

    expect(actual).to.deep.equal("oranges");
  });

  it('evaulate when index last item', () => {
    addChildToNode(target, 0, 3)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    const actual = target.evaulate();

    expect(actual).to.deep.equal("mangoes");
  });

  it('evaulate when index is out of bound by 1', () => {
    addChildToNode(target, 0, 4)
    addChildToNode(target, 1, [ "apples", "grapes", "oranges", "mangoes" ]);

    expect( () => target.evaulate()).to.throw("Index 4 is out of bound.");
  });
});