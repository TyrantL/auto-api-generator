// 将默认配置与输入配置合并
const defaultConfig = require('../utils/defaultConfigs');

function mergeConfig(config) {
  const ret = {
    ...defaultConfig,
    ...config,
  };

  ret.tsNotStrictInclude = Array.isArray(ret.tsNotStrictInclude) ? ret.tsNotStrictInclude : [];

  return ret;
}

module.exports = mergeConfig;
