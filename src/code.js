const utils = require('../utils/ts');

function generateTsTypesCode(apiData, config) {
  const models = [];
  // 解析query入参
  const params = utils.transform2TsTypesCode(apiData.query, config, apiData);
  // 解析body入参
  const data = utils.transform2TsTypesCode(apiData.body, config, apiData, params.models);
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
