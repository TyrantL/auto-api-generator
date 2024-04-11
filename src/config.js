// 将默认配置与输入配置合并
const defaultConfig = require('../utils/defaultConfigs');

function mergeConfig(config) {
  return {
    ...defaultConfig,
    ...config,
  }
}

module.exports = mergeConfig();
