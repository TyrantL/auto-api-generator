const { expect } = require('chai');
const { getAllApis, filterApiByTags, generateStandardApiData, formatApiData } = require('../src/data.js');
const data = require('./data/generateStandardApiData');
const formatApiDataObject = require('./data/formatApiData');

describe('test generateStandardApiData', () => {
  const key = 'case1';
  const testData = data[key];
  const result = getAllApis(testData.input);
  it(`getAllApis ${key}`, () => {
    expect(result).to.deep.eq(testData.result);
  });

  it(`filterApiByTags ${key}`, () => {
    expect(filterApiByTags(result, ['公文管理--草稿箱'])).to.deep.eq(testData.result.slice(2));
    expect(filterApiByTags(result, ['V1.0.0-公文审批'])).to.deep.eq(testData.result.slice(1, 2));
    expect(filterApiByTags(result, ['V2.0.0-基础设置'])).to.deep.eq(testData.result.slice(0, 1));
  });

  it(`filterApiByTags ${key} no tags`, () => {
    expect(filterApiByTags(result, [])).to.deep.eq(testData.result);
    expect(filterApiByTags(result)).to.deep.eq(testData.result);
  });

  it(`filterApiByTags ${key} unExist tags`, () => {
    expect(filterApiByTags(result, ['公文管理--'])).to.deep.eq([]);
    expect(filterApiByTags(result, [''])).to.deep.eq([]);
  });

  it(`generateStandardApiData ${key}`, () => {
    expect(generateStandardApiData(result, testData.input))
      .to
      .deep
      .eq(testData.standardResult);
  });
});

describe('test generateStandardApiData 2', () => {
  const key = 'case2';
  const testData = data[key];
  const result = getAllApis(testData.input);
  it(`getAllApis ${key}`, () => {
    expect(result).to.deep.eq(testData.result);
  });

  it(`generateStandardApiData ${key}`, () => {
    expect(generateStandardApiData(result, testData.input))
      .to
      .deep
      .eq(testData.standardResult);
  });
});

describe('test generateStandardApiData 数据异常场景 ', () => {
  const key = 'case3';
  const testData = data[key];
  const result = getAllApis(testData.input);
  it(`getAllApis ${key}`, () => {
    expect(result).to.deep.eq(testData.result);
  });

  it(`generateStandardApiData ${key}`, () => {
    expect(generateStandardApiData(result, testData.input))
      .to
      .deep
      .eq(testData.standardResult);
  });
});

describe('test formatApiData function ', () => {
  Object.keys(formatApiDataObject).forEach((key) => {
    it(`formatApiData ${key}`, () => {
      const testData = formatApiDataObject[key];
      const result = formatApiData(
        testData.input,
        testData.config,
      );
      expect(result).to.deep.eq(testData.result);
    });
  });
});
