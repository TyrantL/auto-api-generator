// 将默认配置与输入配置合并
const defaultConfig = require('../utils/defaultConfigs');

function mergeConfig(config) {
  const ret = {
    ...defaultConfig,
    ...config,
  };

  ret.folderName = ret.folderName ?? ret.projectName;
  ret.tsNotStrictInclude = Array.isArray(ret.tsNotStrictInclude) ? ret.tsNotStrictInclude : [];
  ret.extractResponseKeys = Array.isArray(ret.extractResponseKeys) ? ret.extractResponseKeys : [];
  ret.extractAxiosPromise = ret.extractResponseKeys.length ? true : (ret.extractAxiosPromise ?? false);

  return ret;
}

module.exports = mergeConfig;
