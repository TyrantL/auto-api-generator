const { firstCharUpper } = require('../utils');
const utils = require('../utils/ts');

function generateInterface(models) {
  return models.length
    ? models.reduce((s, m) => `${s}export type ${m.name} = ${m.value}\n`, '\n')
    : '';
}

function getDeclare(name, c) {
  const reqUseType = !c.req || utils.tsUseTypeDeclare(c.req);

  return `export module ${name} {
    ${generateInterface(c.models)}
    ${reqUseType ? `export type Req = ${c.req || 'any'}` : `export interface Req ${c.req}`}
  }\n`;
}

function renderCodeUnit(apiItem, config) {
  const name = firstCharUpper(apiItem.apiName);

  const comment = config.comment
    ? `/** ${apiItem.title ? `${apiItem.title} ` : ''}${apiItem.method} ${apiItem.path.replace(/\*\//gi, '{*}/')} */\n`
    : '';

  return `${comment}${getDeclare(name, apiItem.codes)}`;
}

function renderApiTypesTsCode(apiData, config) {
  const apiTypesTips = config.apiTypesTips || '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n/* eslint-disable */\n';
  const unFoldFn = `
    export type ET<T> = T extends object
    ? T extends infer O ? { [K in keyof O]: ET<O[K]> } : never
    : T;
  `;

  let result = `${apiTypesTips}declare namespace AT {\n${unFoldFn}`;

  for (let i = 0; i < apiData.length; i++) {
    const apiItem = apiData[i];
    result += renderCodeUnit(apiItem, config);
  }

  return result + '}\nexport default AT;';
}

module.exports = {
  renderApiTypesTsCode,
};


