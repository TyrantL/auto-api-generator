const { apiAdapter } = require('../template/api');

//
function mergeConfig(config) {
  //todo 适配器模式，后期会在此兼容各种类型请求

  apiAdapter(config);
  // configAdapter(config);

  return config;
}

module.exports = mergeConfig;
