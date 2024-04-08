const { firstCharUpper } = require('../utils/index');

function renderCodeUnit(apiItem, config) {
  return `${apiItem.apiName}: (req, options={}) => axios({...config.${apiItem.apiName}, data: req, ...options }),\n`;
}

// function renderTsCodeUnit(apiItem, config) {
//   const name = firstCharUpper(apiItem.apiName);
//
//   const comment = config.comment && apiItem.description ? `/** ${apiItem.description} */\n` : '';
//
//   const context = `${apiItem.apiName}: `;
// }

function renderApiCallJsCode(apiData, config) {
  let content = '';

  content += config.apiCallTips ?? '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n/* eslint-disable */\n';
  content += 'import axios from \'../request\';\n';
  content += 'import config from \'./config\';\n';
  content += 'export default {\n';

  apiData.forEach((apiItem) => {
    content += renderCodeUnit(apiItem, config);
  });

  content += '}';

  return content;
}

function renderApiCallTsCode(apiData, config) {
  config.apiCallTips = '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n/* eslint-disable */\n// @ts-nocheck\nimport AT from \'./api.types\';\nimport { AxiosPromise as Promise } from \'axios\';\n';

  return renderApiCallJsCode(apiData, config);
}

module.exports = {
  renderApiCallTsCode,
};
