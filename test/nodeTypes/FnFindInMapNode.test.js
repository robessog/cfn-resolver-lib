const expect = require('chai').expect;

const { addChildToNode, mockNode, mockNodeAccessor } = require('../testUtils');
const { FnFindInMapNode } = require('../../src/nodeTypes')

const testMapping = {
  Mapping1: {
    key1: {
      key1SubKey1: "true",
      key1SubKey2: "false"
    },
    key2: {
      key2SubKey1: "m5.large",
      key2SubKey2: "m5.xlarge"
    },
  },
  Mapping2: {
    key1: {
      key1SubKey1: 2,
      key1SubKey2: 5
    },
    key2: {
      key2SubKey1: true,
      key2SubKey2: false
    },
  }
};

describe('FnFindInMapNode', () => {

  let target;
  
  beforeEach(()=> {
    target = new FnFindInMapNode(mockNode, mockNodeAccessor, false, testMapping);
  })

  it('finds string value in map', () => {
    addChildToNode(target, 0, "Mapping1");
    addChildToNode(target, 1, "key2");
    addChildToNode(target, 2, "key2SubKey2");
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal("m5.xlarge")
  });

  it('finds number in map', () => {
    addChildToNode(target, 0, "Mapping2");
    addChildToNode(target, 1, "key1");
    addChildToNode(target, 2, "key1SubKey1");
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(2)
  });

  it('finds boolean in map', () => {
    addChildToNode(target, 0, "Mapping2");
    addChildToNode(target, 1, "key2");
    addChildToNode(target, 2, "key2SubKey1");
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal(true)
  });

  it('finds boolean as string ("true") in map', () => {
    addChildToNode(target, 0, "Mapping1");
    addChildToNode(target, 1, "key1");
    addChildToNode(target, 2, "key1SubKey1");
    
    const actual = target.evaulate();

    expect(actual).to.deep.equal("true")
  });

  // TODO: testcase when
  // - array is empty
  // - array has <= 2 item
  // - array has > 3 items
  // - item is not found in map (e.g. incorrect addressing in different levels)
});