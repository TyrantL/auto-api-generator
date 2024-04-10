const axios = require('axios');
const chalk = require('chalk');
const { trimBlank, formatApiName } = require('../utils');
const { generateTsTypesCode } = require('./code');

async function getRequestUrl(config) {
  const host = config.host || 'https://letao.cnstrong.cn';
  const path = `${host}/${config.projectName}/swagger-resources`;
  let url = '';
  const data = await axios.get(path).catch(err => {
    console.error(chalk.red(`${chalk.blueBright(path)} 接口异常，请检查【projectName】是否配置正确，或者该接口文档状态是否正常`));
  });

  if (data) {
    url = data.data[0].url;
  }

  return {
    path: `${host}/${config.projectName}${url}`,
    success: !!data,
  };
}

async function getApiData(config) {
  const { path, success } = await getRequestUrl(config);

  const ret = {
    apis: [],
    responseInfoMap: {},
  };
  if (success) {
    const { data } = await axios.get(path, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).catch(err => {
      throw new Error(`${path}接口异常，请检查该接口文档状态是否正常`);
    });

    const { paths = [], components: { schemas = {} } } = data;

    ret.apis = paths;
    // ret.responseInfoMap = schemas;
    ret.responseInfoMap = Object.values(schemas).reduce((acc, cur) => {
      acc[cur.title] = cur;
      return acc;
    }, {});
  }
  return ret;
}

// 接口重新生成与重复校验
function fixedApiName({ path, method }, config, nameExistMap) {
  const apiName = formatApiName(path, method);

  if (nameExistMap[apiName]) {
    console.error(chalk.red(`${apiName} 接口名称重复，请排查修正后再生成`));
    throw new Error();
  }

  nameExistMap[apiName] = true;
  return apiName;
}

function formatApiData(apis, config) {
  // 存储已存在的接口
  const existApiMap = {};

  apis = apis.map((apiItem) => {
    const codes = generateTsTypesCode(apiItem, config);
    return {
      id: apiItem.operationId,
      method: apiItem.method.toLowerCase(),
      apiName: fixedApiName(apiItem, config, existApiMap),
      path: apiItem.path,
      basePath: config.basePath,
      title: trimBlank(apiItem.summary),
      headers: apiItem.headersJson ? `headers: { 'Content-Type': '${apiItem.headersJson}' },` : '',
      codes,
    };
  });

  return apis;
}

function formatData(originData) {
  const { apis, responseInfoMap } = originData;

  return Object.entries(apis).map(([path, context]) => {
    const method = Object.keys(context)[0];

    const apiInfo = context[method];
    apiInfo.path = path;
    apiInfo.method = method;
    apiInfo.query = null;
    apiInfo.body = null;
    apiInfo.response = null;

    formatRequest(apiInfo, responseInfoMap);

    formatResponse(apiInfo, responseInfoMap);

    return apiInfo;
  });
}

function formatResponse(apiInfo, schemas) {
  if (!apiInfo.responses[200].content) {
    console.error(chalk.red(`[${apiInfo.path}]接口没有出参，请联系后端排查`));
    return;
  }

  apiInfo.response = getResponseFromSchemas(schemas, apiInfo.responses[200].content['*/*'].schema.$ref, apiInfo);
}

//处理入参，入参有两种情况 parameters(query) 和 requestBody(body)
function formatRequest(apiInfo, schemas) {
  const query = [];
  if (apiInfo.parameters) {
    apiInfo.parameters.forEach((item) => {
      query.push({
        name: item.name,
        description: item.description,
        required: item.required,
        type: item.schema?.type ?? 'any',
        subType: item.schema?.items?.type ?? null,
        properties: null,
      });
    });
    apiInfo.query = query;
  }

  if (apiInfo.requestBody) {
    const { content } = apiInfo.requestBody;
    const contentType = Object.keys(content)[0];

    if (contentType === 'application/json') {
      apiInfo.headersJson = 'application/json; charset=utf-8';
    } else {
      apiInfo.headersJson = contentType;
    }

    apiInfo.body = getContentFromSchemas(schemas, content[contentType].schema.$ref, apiInfo);
  }
}

function getContentFromSchemas(schemas, ref, apiInfo) {
  const targetComponent = ref.startsWith('#/components/schemas/') ? ref.split('/')[3] : ref;

  let body = [];

  if (!schemas[targetComponent]) {
    // todo 文档中入参有异常
    console.error(chalk.red(`[${apiInfo.path}]接口入参异常，请联系后端排查`));
    return body;
  }

  body = Object.entries(schemas[targetComponent].properties).map(([key, obj]) => {
    let properties = null;

    if (obj.$ref) {
      properties = getContentFromSchemas(schemas, obj.$ref, apiInfo);
    }

    if (obj.type === 'array' && obj.items?.$ref) {
      properties = getContentFromSchemas(schemas, obj.items.$ref, apiInfo);
    }

    return {
      name: key,
      description: obj.description,
      required: obj.required ?? false,
      type: obj.type,
      subType: obj.items?.type ?? null,
      properties,
    };
  });

  return body;
}

function getResponseFromSchemas(schemas, ref, apiInfo) {
  let task = ref;
  let res = [];
  const stack = [];
  const map = {};
  let mapKey = 0;
  // 处理循环引用
  let existSchemaMap = {};

  while (task) {
    let target = '';
    let taskKey = null;

    if (typeof task === 'string') {
      target = task;
    } else {
      target = task.target;
      taskKey = task.key;
    }

    const name = target.startsWith('#/components/schemas/') ? target.split('/')[3] : target;

    const schema = schemas[name];

    if (!schema) {
      // todo 文档中出参有异常
      console.error(chalk.red(`[${apiInfo.path}]接口出参异常，请联系后端排查`));
      task = stack.shift();
      continue;
    }

    let result = [];

    if (existSchemaMap[name]) {
      result = existSchemaMap[name];
    } else {
      existSchemaMap[name] = result;

      Object.entries(schema.properties || []).forEach(([key, obj]) => {
        // 是否是非基础类型的数组
        const isNonPrimitiveElementArray = obj.type === 'array' && obj.items.$ref;
        if (obj.$ref || isNonPrimitiveElementArray) {
          const t = isNonPrimitiveElementArray ? obj.items.$ref : obj.$ref;
          stack.push({ key: mapKey, target: t });
          map[mapKey] = [];
          result.push({
            name: key,
            oName: isNonPrimitiveElementArray ? '' : '', // todo
            description: obj.description,
            required: obj.required ?? false,
            type: obj.type,
            subTypes: obj.items?.type ?? null,
            properties: map[mapKey],
          });
          mapKey++;
        } else {
          result.push({
            name: key,
            description: obj.description,
            required: obj.required ?? false,
            type: obj.type,
            subType: obj.items?.type ?? null,
            properties: null,
          });
        }
      });
    }

    if (taskKey !== null) {
      map[taskKey].push(...result)
    } else {
      res = res.concat(result);
    }

    task = stack.shift();
  }
  return res;
}

exports.getApiData = getApiData;
exports.formatApiData = formatApiData;
exports.formatData = formatData;
