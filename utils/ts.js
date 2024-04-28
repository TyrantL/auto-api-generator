const {
  deepEqual,
  isBaseType,
  trimBlank,
  getBaseTypeMapping,
  firstCharUpper,
} = require('./index');

const DEFAULT_TYPE = 'any';
const CONCAT_DELIMITER = '&_$_$_&';
const TYPE_MAPPING = getBaseTypeMapping();

const utils = {
  DEFAULT_TYPE,
  CONCAT_DELIMITER,
  // 类型转换成ts的类型
  getTsType(type) {
    type = (type || '').toLowerCase();
    if (TYPE_MAPPING[type]) {
      return type;
    }

    const types = Object.keys(TYPE_MAPPING);
    for (let i = 0; i < types.length; i++) {
      const t = types[i];
      if (TYPE_MAPPING[t].includes(type)) {
        return t;
      }
    }

    return DEFAULT_TYPE;
  },

  // 根据对象拼接好的 field: '{type}分隔符{描述}'格式拼接成ts声明与注释
  concatComment(obj) {
    if (typeof obj === 'string') {
      return obj;
    }

    let res = '{\n';

    Object.keys(obj).forEach(key => {
      const [type, desc] = obj[key].split(CONCAT_DELIMITER);
      res += `${desc ? `/** ${desc} */\n` : ''}${key}: ${type},\n`;
    });

    res += '}';
    return res;
  },

  // 过滤掉JSON字符串中的\ "等字符，就可以变成ts的接口声明结构
  trimJsonString2Ts(str) {
    return str.replace(/["\\]/g, '');
  },

  tsUseTypeDeclare(type) {
    return !type || type === 'any' || isBaseType(type) || utils.isTsArray(type) || utils.isTsRecord(type) || utils.isTsSet(type);
  },

  /* istanbul ignore next */
  isTsArray(str) {
    return str.startsWith('Array<');
  },

  /* istanbul ignore next */
  isTsRecord(str) {
    return str.startsWith('Record<');
  },

  /* istanbul ignore next */
  isTsSet(str) {
    return str.startsWith('Set<');
  },

  // 过滤属性为{}的情况
  trimFieldName(str) {
    return (str || '').replace(/[{}]/ig, '');
  },

  /**
   * 获取 ts 类型属性名
   * @param prop 包含属性名的对象，该对象应至少包含 name 和 required 属性
   * @param tsNotStrict 是否为非严格 TypeScript 模式，true 表示不严格，false 表示严格
   * @returns 返回属性名字符串，如果属性是非必需的（即不标记为 required），并且 tsNotStrict 为 false，则在属性名后添加 ?
   */
  getTsPropertyName(prop, tsNotStrict) {
    // 检查属性名中是否包含'-', 如果包含，则将其用单引号包裹，以避免 TS 格式化时的错误
    const n = prop.name.indexOf('-') !== -1 ? `'${prop.name}'` : prop.name;

    // 根据 tsNotStrict 和 item.required 来决定返回的属性名是否可选
    return tsNotStrict ? n : prop.required ? n : `${n}?`;
  },

  genExtCode(prop) {
    const typeMap = {
      object: DEFAULT_TYPE,
      array: `Array<${DEFAULT_TYPE}>`,
    };

    return isBaseType(prop.type) ? utils.getTsType(prop.type) : typeMap[prop.type] || DEFAULT_TYPE;
  },

  genArrayCode(prop, curItem, children, opts) {
    let arrIn = DEFAULT_TYPE;

    arrIn = isBaseType(prop.subType) ? utils.getTsType(prop.subType) : utils.handleComplexValue(prop, curItem, children, opts);

    return `Array<${arrIn}>`;
  },

  // 处理返回值有key的类型
  genCodeWithFieldName(prop, curItem, children, opts) {
    if (prop.type !== 'array' && prop.properties) {
      return utils.handleComplexValue(prop, curItem, children, opts);
    }

    let r = '';

    if (prop.type === 'array') {
      r = utils.genArrayCode(prop, curItem, children, opts);
    } else {
      r = utils.genExtCode(prop);
    }

    return r;
  },

  // 处理返回值无key的类型
  genCodeWithoutFieldName(prop, curItem, children, opts) {
    if (prop.type === 'array') {
      return utils.genArrayCode(prop, curItem, children, opts);
    } else if (prop.properties) {
      return utils.handleComplexValue(prop, curItem, children, opts);
    }
    return utils.getTsType(prop.type);
  },

  // 处理属性值是对象或者对象数组
  handleComplexValue(prop, curItem, children, opts) {
    prop.properties = prop.properties || [];
    // 当返回是数组或者基本类型、Map时，第一层的name是不存在的
    if (!prop.name && prop.type !== 'array') {
      return utils.travelForGenerateCode(prop.properties, curItem, opts);
    }

    // 根据properties的属性值去models里面校验是否存在属性都相等的dto
    // 属性相等基本可以认为是同一个dto
    // 完整的对象属性还没有确定，但是dto的名称已经被上一级引用了
    let existModelName = utils.findAttrEqualModel(prop.properties, opts.models);

    // 属性完全一致认为是同一个dto
    if (prop.properties && curItem?.properties && deepEqual(prop.properties.map(p => p.name), curItem.properties.map(p => p.name))) {
      existModelName = curItem.modelName;
    }

    if (existModelName) {
      return existModelName;
    }

    let modelName = utils.generateModelName(prop);
    // 存在同名但是属性不同的dto,在dto后加上Dto
    if (opts.models.find(m => m.name === modelName) || curItem?.modelName === modelName) {
      modelName = `${modelName}Dto`;
    }

    children.push({
      pItem: prop,
      modelName,
      properties: prop.properties,
    });

    return modelName;
  },

  generateModelName(prop) {
    let n = prop.oName || prop.name;

    return firstCharUpper(n ? `${n}VO` : 'anonymousDto');
  },

  // 获取已经提取的dto的名称
  getExistModelName(dto, modelName, pItem, models) {
    // dto的属性值完全相等基本可以证明是同一个dto
    // 但是虽然都是any，但是存在dto不是同一个，因为有些数据没解析出来默认是any
    function vEqual(m, o) {
      return m.value !== 'any' && (m.value === o || deepEqual(m.value, o));
    }

    return (models.find(m => vEqual(m, dto)) || {}).name;
  },

  extractModel(dto, modelName, pItem, models) {
    const existModelName = utils.getExistModelName(dto, modelName, pItem, models);

    if (!existModelName || existModelName && modelName !== existModelName) {
      // 不是相同的dto，但是属性名相同时，加上Dto，防止相同层级出现字段相同
      // if (models.find(m => m.name === modelName)) {
      //   modelName += 'Dto';
      // }

      const md = {
        name: modelName,
        value: dto,
      };

      models.push(md);
    }

    return existModelName || modelName;
  },

  // 当前属性的properties与现有模型做属性对比，属性全等基本可以认为是引用的同一个Dto
  findAttrEqualModel(props, mds) {
    const nKeys = props.map(p => p.name);
    const match = mds.find(md => {
      if (md.value !== DEFAULT_TYPE) {
        const mdKeys = Object.keys(md.value).map(k => k.replace('?', ''));
        return deepEqual(nKeys, mdKeys);
      }

      return false;
    });

    return match ? match.name : null;
  },

  travelForGenerateCode(sourceData, curItem, opts) {
    if (sourceData.length === 0) {
      return {
        dto: DEFAULT_TYPE,
        children: [],
      };
    }

    const children = [];
    let dto = {};

    for (let i = 0; i < sourceData.length; i++) {
      const prop = sourceData[i];
      const fieldName = prop.name ? utils.getTsPropertyName(prop, opts.config.tsNotStrict) : '';

      if (fieldName) {
        if (utils.trimFieldName(fieldName)) {
          const v = utils.genCodeWithFieldName(prop, curItem, children, opts);
          dto[fieldName] = opts.config.comment && prop.description ? `${v}${CONCAT_DELIMITER}${trimBlank(prop.description)}` : v;
        }
      } else {
        const r = utils.genCodeWithoutFieldName(prop, curItem, children, opts);

        if (typeof r === 'string') {
          dto = r;
        } else {
          return r;
        }
      }
    }

    return { children, dto };
  },

  // 对于类型为object的字段，再次遍历生成model
  travelChildren(children, opts) {
    const sameLevelChildren = [];

    // 检查children的properties中是否有相同name的属性
    utils.checkPropNameExists(children);

    for (let i = 0; i < children.length; i++) {
      const cItem = children[i];
      const pItem = cItem.pItem;
      const res = utils.travelForGenerateCode(cItem.properties, cItem, opts);

      // 把已经遍历出的DTO保存起来，解决循环引用与重复引用
      utils.extractModel(res.dto, cItem.modelName, pItem, opts.models);

      // 递归处理非基本类型的属性
      sameLevelChildren.push(...res.children);
    }

    if (sameLevelChildren.length) {
      utils.travelChildren(sameLevelChildren, opts);
    }
  },

  // 检查同层级dto子类型中是否有同名属性，有的话通过oName区分
  checkPropNameExists(children) {
    const existPropNameMap = {};
    children.forEach(parent => {
      const props = parent.properties || [];
      props.forEach(prop => {
        if (existPropNameMap[prop.name]) {
          let oName = `${prop.name}A`
          while(existPropNameMap[oName]) {
            oName = `${oName}A`;
          }
          prop.oName = oName;
        }
        existPropNameMap[prop.oName || prop.name] = true;
      });
    });
  },


  startTravel(sourceData, opts) {
    const res = utils.travelForGenerateCode(sourceData, null, opts);

    if (res.children.length) {
      utils.travelChildren(res.children, opts);
    }
    return utils.trimJsonString2Ts(opts.config.comment ? utils.concatComment(res.dto) : JSON.stringify(res.dto));
  },

  // 接口入参与返回结构转换成ts声明代码/接口
  transform2TsTypesCode(sourceData, config, apiData, existModels) {
    if (!sourceData) {
      return {
        code: null,
        models: [],
      };
    }

    let models = existModels || [];

    return {
      code: utils.startTravel(sourceData, { config, apiData, models }),
      models,
    };
  },

  // 通过keys提取接口返回结构，应对axios拦截器对请求返回做提取的场景
  extractResponse(originResponse, keys) {
    if (originResponse.length === 0) {
      return originResponse;
    }

    function extract(data, pName, k) {
      if (!data || data.length === 0) {
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const field = data[i];
        const namePath = `${pName ? `${pName}.` : ''}${field.name || ''}`;

        if (namePath === k) {
          delete field.name;
          return field;
        }

        extract(field.properties, namePath, k);
      }
    }

    // keys为数组，支持提取多种返回结构，返回第一种满足的结构
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      const result = extract(originResponse, '', k);

      if (result) {
        return Array.isArray(result) ? result : [result];
      }
    }

    return originResponse;
  },
};

module.exports = utils;
