const expect = require('chai').expect;

const { mockNodeAccessor } = require('../testUtils');
const { ResolveFromMapNode } = require('../../src/nodeTypes')

const resolverMap = {
  "OtherStackExportedKey": "MyFakeValue",
};

describe('ResolveFromMapNode', () => {

  let target;

  it('evaluates predefined values from input map', () => {
    target = new ResolveFromMapNode("OtherStackExportedKey", mockNodeAccessor, false, resolverMap);
    const actual = target.evaluate();
    expect(actual).to.deep.equal("MyFakeValue");
  });
});