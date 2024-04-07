function getOptionsField(apiItem) {
  // 请求非必须属性或者使用者自定义属性
  let optAttr = apiItem.basePath ? `baseURL: '${apiItem.basePath}',` : '';
  optAttr += apiItem.headers;
  return optAttr;
}

function renderConfigUnit(apiItem) {
  console.log(apiItem);
  return `${apiItem.apiName}: {
        url: '${apiItem.path}',
        method: '${apiItem.method}',
        ${getOptionsField(apiItem)}
    },`;
}

function renderApiConfigCode(apiDatas, config) {
  const apiConfigTips = '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n/* eslint-disable */\n';

  const configExport = 'export default {\n';

  let result = apiConfigTips + configExport;

  for (let i = 0; i < apiDatas.length; i++) {
    const apiItem = apiDatas[i];
    result += renderConfigUnit(apiItem);
  }

  result += `}`;

  return result;
}

module.exports = {
  renderApiConfigCode,
};
