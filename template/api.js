const { firstCharUpper } = require('../utils/index');
const utils = require('../utils/ts');

function genReqFieldName(req) {
  return (!req || req === 'any') ? 'req?' : utils.getTsPropertyName({name: 'req', required: true})
}

function renderCodeUnit(apiItem, config) {
  const name = firstCharUpper(apiItem.apiName);
  const comment = config.comment && apiItem.description ? `/** ${apiItem.description} */\n` : '';
  return (
    `${comment}${apiItem.apiName}: (${genReqFieldName(apiItem.codes.req)}: AT.ET<AT.${name}.Req>, option:object = {}): Promise<AT.ET<AT.${name}.Res>> => {
        return axios({data: req, ...config.${apiItem.apiName}, ...option });
    },\n`
  );
}

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
