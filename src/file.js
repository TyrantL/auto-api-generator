const path = require('path');
const fs = require('fs-extra');
const _fs = require('fs');
const prettier = require('prettier');
const chalk = require('chalk');
const { renderApiConfigCode } = require('../template/config');
const { renderApiCallTsCode } = require('../template/api');
const { renderApiTypesTsCode } = require('../template/api.types');

const tsCodeTemplateConfig = {
  'config.ts': {
    render: renderApiConfigCode,
  },
  'api.ts': {
    render: renderApiCallTsCode,
  },
  'api.types.ts': {
    render: renderApiTypesTsCode,
  },
};

function getLocalConfigData(localConfigFilePath, config) {
  if (!fs.pathExistsSync(localConfigFilePath)) {
    return {
      existPathAndNameMap: {},
      existConfigs: {},
    };
  }

  const localConfigFileContent = _fs.readFileSync(localConfigFilePath, 'utf8');
  const cjsCode = localConfigFileContent.replace(/export default\s*/, 'module.exports = ');
  fs.outputFileSync(localConfigFilePath, cjsCode, 'utf8');
  const existConfigs = require(localConfigFilePath);
  fs.outputFileSync(localConfigFilePath, localConfigFileContent, 'utf8');

  const apiNames = Object.keys(existConfigs);
  const existPathAndNameMap = {};

  for (let i = 0; i < apiNames.length; i++) {
    const n = apiNames[i];
    const api = existConfigs[n];
    const uniquePath = `${api.method}${api.baseURL || ''}${api.url}`;
    existPathAndNameMap[uniquePath] = n;
  }

  return {
    existPathAndNameMap,
    existConfigs,
  };
}

function mergeLocalAndRemoteApiConfig(data, config) {
  const outputFolder = path.resolve(config.output, config.folderName);
  const configFilename = 'config.ts';
  const localConfigFilePath = path.resolve(outputFolder, configFilename);
  let { existPathAndNameMap, existConfigs } = getLocalConfigData(localConfigFilePath, config);

  const existPathKeys = Object.keys(existPathAndNameMap);
  const apiDataMap = {};
  const addedApis = [];
  const removedApis = [];
  let distData = [];

  // 遍历接口返回的所有接口
  data.forEach(api => {
    const uniquePath = `${api.method}${api.basePath || ''}${api.path}`;
    apiDataMap[uniquePath] = api;

    // 如果本地不存在则为新增
    if (!existPathAndNameMap[uniquePath]) {
      addedApis.push(api);
    }
  });

  for (let i = 0; i < existPathKeys.length; i++) {
    const k = existPathKeys[i];
    let item = apiDataMap[k];

    // 如果本地存在，但是接口返回不存在，则可认为该接口被删除
    if (!item) {
      const existApiItem = existConfigs[existPathAndNameMap[k]];
      removedApis.push({
        name: existPathAndNameMap[k],
        path: k,
      });

      distData.push({
        apiName: existPathAndNameMap[k],
        path: existApiItem.url,
        basePath: existApiItem.baseURL,
        title: '',
        method: existApiItem.method,
        headers: existApiItem.headers ? `headers: ${JSON.stringify(existApiItem.headers)}` : '',
        codes: {
          req: null,
          res: null,
          models: [],
        },
      });

      console.log(chalk.yellow(`接口：${existPathAndNameMap[k]} 已被删除，请确认前端代码中是否使用，如未使用，则在${localConfigFilePath}中删除该方法配置后重新生成即可`));
    } else {
      distData.push({
        ...item,
        apiName: existPathAndNameMap[k],
      });
    }
  }

  console.log(chalk.green(`本地接口: ${existPathKeys.length}个，服务端删除${removedApis.length}个。\n重新生成 ${distData.length + addedApis.length}，其中新增${addedApis.length}个`));

  return distData.concat(addedApis);
}

async function generateCodeFile(data, config, opt) {
  const outputFolder = path.resolve(config.output, config.folderName);

  await fs.ensureDirSync(outputFolder);

  for (const fileName in tsCodeTemplateConfig) {
    const item = tsCodeTemplateConfig[fileName];

    /* istanbul ignore else */
    if (item && item.render) {
      const code = item.render(data, config);

      genFile(code, fileName, outputFolder, config);
    }
  }
}

function prettierCode(code) {
  return prettier.format(code, {
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    parser: 'babel-ts',
  });
}

function genFile(code, fileName, outputFolder, config) {
  const outputPath = path.resolve(outputFolder, fileName);
  fs.outputFileSync(outputPath, prettierCode(code), 'utf8');
  console.log(`${outputPath}更新完成!`);
}

/* istanbul ignore next */
async function generateAxiosTemplate(opts) {
  const outputFile = path.resolve(opts.output, 'request.js');

  // 如果request.js不存在，则生成一个request模板，后续考虑剥离axios模板成为一个独立的通用请求库
  const isExist = await fs.pathExists(outputFile);

  if (!isExist) {
    const template = await fs.readFileSync(path.resolve(__dirname, '../template/request.js'), 'utf8');
    fs.outputFileSync(path.resolve(opts.output, 'request.js'), template, 'utf8');
  }
}

module.exports = {
  mergeLocalAndRemoteApiConfig,
  generateCodeFile,
  generateAxiosTemplate,
  prettierCode,
};
