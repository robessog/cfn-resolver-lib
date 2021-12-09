const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnSub } = require('../../src/nodeTypes')

describe('FnSub with dictionary', () => {

  let target;

  beforeEach(() => {
    target = new FnSub(mockNode, mockNodeAccessor, false);
  })

  it('evaluate single instance', () => {
    addChildToNode(target, 0, "hello ${replaceMe} test!")
    addChildToNode(target, 1, { replaceMe: "world" });

    const actual = target.evaluate();

    expect(actual).to.deep.equal("hello world test!");
  });

  it('evaluate multiple instance of same key', () => {
    addChildToNode(target, 0, "hello ${replaceMe} test! ${replaceMe}")
    addChildToNode(target, 1, { replaceMe: "world" });

    const actual = target.evaluate();

    expect(actual).to.deep.equal("hello world test! world");
  });

  it('evaluate multiple instance of same key with 2 dictionary items', () => {
    addChildToNode(target, 0, "${placeHolder1} ${placeHolder2}, ${placeHolder1}!")
    addChildToNode(target, 1, {
      placeHolder1: "Hello",
      placeHolder2: "World"
    });

    const actual = target.evaluate();

    expect(actual).to.deep.equal("Hello World, Hello!");
  });

  //
  // TODO: Add test case when
  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html
  // - Variables can be 
  //  - resource logical IDs
  //  - resource attributes
  // - no value provided in the dictionary
  // - recursive replacement?
});

describe('FnSub using template parameters', () => {

  let target;
  let refResolver;

  beforeEach(() => {
    refResolver = {};
  })

  function givenNodeValue(nodeValue) {
    target = new FnSub(nodeValue, mockNodeAccessor, false, refResolver);
  }

  function givenParamValue(name, value) {
    refResolver[name] = value;
  }

  it('evaluate single instance', () => {
    givenNodeValue("hello ${replaceMe} test!")
    givenParamValue('replaceMe', 'world');

    const actual = target.evaluate();

    expect(actual).to.deep.equal("hello world test!");
  });

  it('evaluate multiple instance of same key', () => {
    givenNodeValue("hello ${replaceMe} test! ${replaceMe}")
    givenParamValue("replaceMe", "world");

    const actual = target.evaluate();

    expect(actual).to.deep.equal("hello world test! world");
  });

  it('evaluate multiple instance of same key with 2 dictionary items', () => {
    givenNodeValue("${placeHolder1} ${placeHolder2}, ${placeHolder1}!")
    givenParamValue("placeHolder1", "Hello");
    givenParamValue("placeHolder2", "World");

    const actual = target.evaluate();

    expect(actual).to.deep.equal("Hello World, Hello!");
  });
  
});