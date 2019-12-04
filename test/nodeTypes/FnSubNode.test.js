const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnSub } = require('../../src/nodeTypes')

describe('FnSub', () => {

  let target;

  beforeEach(() => {
    target = new FnSub(mockNode, mockNodeAccessor, false);
  })

  it('evaulate single instance', () => {
    addChildToNode(target, 0, "hello ${replaceMe} test!")
    addChildToNode(target, 1, { replaceMe: "world" });

    const actual = target.evaulate();

    expect(actual).to.deep.equal("hello world test!");
  });

  it('evaulate multiple instance of same key', () => {
    addChildToNode(target, 0, "hello ${replaceMe} test! ${replaceMe}")
    addChildToNode(target, 1, { replaceMe: "world" });

    const actual = target.evaulate();

    expect(actual).to.deep.equal("hello world test! world");
  });

  it('evaulate multiple instance of same key with 2 dictionary items', () => {
    addChildToNode(target, 0, "${placeHolder1} ${placeHolder2}, ${placeHolder1}!")
    addChildToNode(target, 1, { 
      placeHolder1: "Hello",
      placeHolder2: "World"
   });

    const actual = target.evaulate();

    expect(actual).to.deep.equal("Hello World, Hello!");
  });

  // TODO: Add test case when
  // - no value provided in the dictionary
  // - recursive replacement?
});