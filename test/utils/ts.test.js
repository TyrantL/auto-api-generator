const { expect } = require('chai');
const utils = require('../../utils/ts');
const data = require('./ts-data');

describe('getTsType', () => {
  it('should return any if the type is not in TYPE_MAPPING', () => {
    expect(utils.getTsType('')).eq('any');
    expect(utils.getTsType(null)).eq('any');
    expect(utils.getTsType(undefined)).eq('any');
    expect(utils.getTsType('testA')).eq('any');
  });
});

describe('transform2TsTypesCode', () => {
  Object.keys(data).forEach((key) => {
    it(`transform2TsTypesCode ${key}`, () => {
      const testData = data[key];
      const result = utils.transform2TsTypesCode(
        testData.inputData.response,
        testData.config,
        testData.inputData,
        [],
      );
      expect(result).to.deep.eq(testData.expectResult);
    });
  });
});
