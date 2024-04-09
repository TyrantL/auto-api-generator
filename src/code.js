const utils = require('../utils/ts');

function generateTsTypesCode(apiData, config) {
  // 解析query入参
  const params = utils.transform2TsTypesCode(apiData.query, config, apiData);
  // 解析body入参
  const data = utils.transform2TsTypesCode(apiData.body, config, apiData, params.models);

  const models = [];

  const req = params.code || data.code;

  const modelsMap = {};

  [...params.models, ...data.models].forEach(m => {
    if (!modelsMap[m.name]) {
      modelsMap[m.name] = true;
      m.value = utils.trimJsonString2Ts(config.comment ? utils.concatComment(m.value) : JSON.stringify(m.value));
      models.push(m);
    }
  });

  return {
    req,
    models,
  };
}

exports.generateTsTypesCode = generateTsTypesCode;
