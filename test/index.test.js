const { expect } = require('chai');
const { getAllApis, filterApiByTags, generateStandardApiData, formatApiData } = require('../src/data.js');
const data = require('./data/generateStandardApiData');
const formatApiDataObject = require('./data/formatApiData');
const generateCodeFileObject = require('./data/generateCodeFile');
const mergeLocalAndRemoteApiConfigObject = require('./data/mergeLocalAndRemoteApiConfig');
const { generateCodeFile, prettierCode, mergeLocalAndRemoteApiConfig } = require('../src/file.js');
const path = require('path');
const fs = require('fs-extra');

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

describe('test generateStandardApiData 数据异常场景2 ', () => {
  const key = 'case4';
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

describe('test formatApiData function', () => {
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

describe('test generateCodeFile function', () => {

  Object.keys(generateCodeFileObject).forEach(key => {

    it('generateCodeFile', async () => {
      const data = generateCodeFileObject[key];

      await generateCodeFile(data.input, data.config);

      const output = path.resolve(data.config.output, data.config.folderName ?? data.config.projectName);

      const expectConfigFile = fs.readFileSync(path.resolve(output, 'config.ts'), 'utf-8');
      expect(expectConfigFile).to.equal(prettierCode(data.result.config));

      const expectApiFile = fs.readFileSync(path.resolve(output, 'api.ts'), 'utf-8');
      expect(expectApiFile).to.equal(prettierCode(data.result.api));

      const expectTypesFile = fs.readFileSync(path.resolve(output, 'api.types.ts'), 'utf-8');
      expect(expectTypesFile).to.equal(prettierCode(data.result.types));

    });
  });
});

describe('test mergeLocalAndRemoteApiConfig function', () => {
  Object.keys(mergeLocalAndRemoteApiConfigObject).forEach(key => {
    it(`mergeLocalAndRemoteApiConfig ${key}`, () => {
      const data = mergeLocalAndRemoteApiConfigObject[key];
      const res = mergeLocalAndRemoteApiConfig(data.input, data.config);

      expect(res).to.deep.eq(data.result);
    });
  });
});
