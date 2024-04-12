const utils = require('../utils/ts');

function generateTsTypesCode(apiData, config) {
  const models = [];
  // 设置ts类型解析模式，用于解析request
  config.tsNotStrict = config.tsNotStrictInclude.includes('req');
  // 解析query入参
  const params = utils.transform2TsTypesCode(apiData.query, config, apiData);
  // 解析body入参
  const data = utils.transform2TsTypesCode(apiData.body, config, apiData, params.models);
  // 设置ts类型解析模式，用于解析response
  config.tsNotStrict = config.tsNotStrictInclude.includes('res');
  // 配合拦截器提取response中的内容
  if (apiData.response && config.extractResponseKeys?.length) {
    apiData.response = utils.extractResponse(apiData.response, config.extractResponseKeys)
  }
  // 解析 response
  const res = utils.transform2TsTypesCode(apiData.response, config, apiData, [...params.models, ...data.models]);

  const modelsMap = {};

  [].concat(params.models, data.models, res.models).forEach(m => {
    if (!modelsMap[m.name]) {
      modelsMap[m.name] = true;
      m.value = utils.trimJsonString2Ts(config.comment ? utils.concatComment(m.value) : JSON.stringify(m.value));
      models.push(m);
    }
  });

  return {
    req: params.code || data.code,
    res: res.code,
    models,
  };
}

exports.generateTsTypesCode = generateTsTypesCode;
