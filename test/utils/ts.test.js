const { expect } = require('chai');
const utils = require('../../utils/ts');

describe('getTsType', () => {
  it('should return any if the type is not in TYPE_MAPPING', () => {
    expect(utils.getTsType('')).eq('any');
    expect(utils.getTsType(null)).eq('any');
    expect(utils.getTsType(undefined)).eq('any');
    expect(utils.getTsType('testA')).eq('any');
  });
});
