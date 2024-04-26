const axios = require('axios');
const chalk = require('chalk');
const { trimBlank, formatApiName } = require('../utils');
const { generateTsTypesCode } = require('./code');

/* istanbul ignore next */
async function getRequestUrl(config) {
  const host = config.host || 'https://letao.cnstrong.cn';
  const path = `${host}/${config.projectName}/swagger-resources`;
  let url = '';
  const data = await axios.get(path).catch(() => {
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

/* istanbul ignore next */
async function getApiData(config) {
  const { path, success } = await getRequestUrl(config);
  const ret = {
    apis: [],
    basePath: '',
  };

  if (success) {
    const { data } = await axios.get(path, {}).catch(() => {
      throw new Error(`${path}接口异常，请检查该接口文档状态是否正常`);
    });

    const apis = filterApiByTags(getAllApis(data), config.tags);

    ret.basePath = data.basePath;
    ret.apis = generateStandardApiData(apis, data);
  }
  return ret;
}

function getAllApis(originData) {
  const apis = [];
  const paths = originData.paths || {};

  Object.keys(paths).forEach((path) => {
    const restfulApis = paths[path];
    Object.keys(restfulApis).forEach((method) => {
      apis.push({...restfulApis[method], path, method});
    });
  });

  return apis;
}

function filterApiByTags(apis, tags) {
  if (!tags || tags.length === 0) {
    return apis;
  }

  return apis.filter((api) => api.tags.some(tag => tags.includes(tag)));
}

// 将接口返回的数据转化为标准格式数据
function generateStandardApiData(apis, originData) {
  const ret = [];
  const schemas = originData.components?.schemas ?? {};
  const map = Object.values(schemas).reduce((acc, cur) => {
    acc[cur.title] = cur;
    return acc;
  }, {});

  apis.forEach((api) => {
    const { query, body, opts } = parseRequest(api, map);

    const apiInfo = {
      id: api.operationId,
      path: api.path,
      title: api.summary,
      method: api.method.toLowerCase(),
      query,
      body,
      response: parseResponse(api, map),
      tags: api.tags,
      ...opts,
    };

    ret.push(apiInfo);
  });
  return ret;
}

//解析入参，入参有两种情况 parameters(query) 和 requestBody(body)
function parseRequest(api, map) {
  let query = null;
  let body = null;
  const opts = {};

  if (api.parameters) {
    query = api.parameters.map((prop) => ({
      name: prop.name,
      description: prop.description,
      required: prop.required,
      type: prop.schema?.type ?? 'any',
      subType: prop.schema?.items?.type ?? null,
      properties: null,
    }));
  } else if (api.requestBody) {
    const { content } = api.requestBody;
    const contentType = Object.keys(content)[0];

    if (contentType === 'application/json') {
      opts.headersJson = 'application/json; charset=utf-8';
    } else {
      opts.headersJson = contentType;
    }

    try {
      body = getBodyFromSchemas(api.path, map, content[contentType].schema.$ref);
    } catch (e) {
      /* istanbul ignore next */
      console.error(chalk.red(`[${chalk.blue(api.path)}]接口入参异常被捕获，请联系后端排查`));
    }
  }

  return { query, body, opts };
}

// 解析出参
function parseResponse(api, map) {
  if (!api.responses[200].content) {
    console.error(chalk.red(`[${api.path}]接口没有出参，请联系后端排查`));
    return null;
  }

  return getResponseFromSchemas(api.path, map, api.responses[200].content['*/*'].schema.$ref);
}

function getBodyFromSchemas(path, schemas, ref) {
  const targetComponent = ref.startsWith('#/components/schemas/') ? ref.split('/')[3] : ref;

  let body = null;

  if (!schemas[targetComponent]) {
    console.error(chalk.red(`[${path.path}]接口入参异常，请联系后端排查`));
    return body;
  }

  body = Object.entries(schemas[targetComponent].properties).map(([key, obj]) => {
    let properties = null;

    if (obj.$ref) {
      properties = getBodyFromSchemas(path, schemas, obj.$ref);
    }

    if (obj.type === 'array' && obj.items?.$ref) {
      properties = getBodyFromSchemas(path, schemas, obj.items.$ref);
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

function getResponseFromSchemas(path, _map, ref) {
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

    const schema = _map[name];

    if (!schema) {
      console.error(chalk.red(`[${path}]接口出参异常，请联系后端排查`));
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
            description: obj.description,
            required: obj.required ?? false,
            type: obj.type,
            subType: obj.items?.type ?? null,
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
      map[taskKey].push(...result);
    } else {
      res = res.concat(result);
    }

    task = stack.shift();
  }
  return res;
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
      id: apiItem.id,
      method: apiItem.method,
      apiName: fixedApiName(apiItem, config, existApiMap),
      path: apiItem.path,
      basePath: config.basePath,
      title: trimBlank(apiItem.title),
      headers: apiItem.headersJson ? `headers: { 'Content-Type': '${apiItem.headersJson}' },` : '',
      codes,
    };
  });

  return apis;
}

exports.getApiData = getApiData;
exports.getAllApis = getAllApis;
exports.filterApiByTags = filterApiByTags;
exports.generateStandardApiData = generateStandardApiData;
exports.formatApiData = formatApiData;
