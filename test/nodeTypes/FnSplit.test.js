const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnSplit } = require('../../src/nodeTypes')

describe('FnSplit', () => {

  let target;

  beforeEach(() => {
    target = new FnSplit(mockNode, mockNodeAccessor, false);
  })

  it('single char delimiter', () => {
    addChildToNode(target, 0, "-")
    addChildToNode(target, 1, "hello-world");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(["hello", "world"]);
  });

  it('multiple char delimiter', () => {
    addChildToNode(target, 0, "::")
    addChildToNode(target, 1, "hello::world");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(["hello", "world"]);
  });

  it('delimiter is not present in string to split', () => {
    addChildToNode(target, 0, ":")
    addChildToNode(target, 1, "hello-world");

    const actual = target.evaluate();

    expect(actual).to.deep.equal(["hello-world"]);
  });

  it('delimiter is empty string', () => {
    addChildToNode(target, 0, "")
    addChildToNode(target, 1, "split me");

    expect( () => target.evaluate()).to.throw("Delimiter is invalid: empty string");
  });
});