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
      res += `${desc ? `/** ${desc} */\n` : ''}${key}: ${type},\n `;
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

  isTsArray(str) {
    return str.startsWith('Array<');
  },

  isTsRecord(str) {
    return str.startsWith('Record<');
  },

  isTsSet(str) {
    return str.startsWith('Set<');
  },

  // 过滤属性为{}的情况
  trimFieldName(str) {
    return (str || '').replace(/[{}]/ig, '');
  },

  /**
   * 获取 ts 类型属性名
   * @param item 包含属性名的对象，该对象应至少包含 name 和 required 属性
   * @param tsNotStrict 是否为非严格 TypeScript 模式，true 表示不严格，false 表示严格
   * @returns 返回属性名字符串，如果属性是非必需的（即不标记为 required），并且 tsNotStrict 为 false，则在属性名后添加 ?
   */
  getTsPropertyName(item, tsNotStrict) {
    // 检查属性名中是否包含'-', 如果包含，则将其用单引号包裹，以避免 TS 格式化时的错误
    const n = item.name.indexOf('-') !== -1 ? `'${item.name}'` : item.name;

    // 根据 tsNotStrict 和 item.required 来决定返回的属性名是否可选
    return tsNotStrict ? n : item.required ? n : `${n}?`;
  },

  genExtCode(item) {
    const typeMap = {
      object: DEFAULT_TYPE,
      array: `Array<${DEFAULT_TYPE}>`,
    };

    return isBaseType(item.type) ? utils.getTsType(item.type) : typeMap[item.type] || DEFAULT_TYPE;
  },

  genArrayCode(item, cItem, children, opts) {
    let arrIn = DEFAULT_TYPE;

    arrIn = isBaseType(item.subType) ? utils.getTsType(item.subType) : utils.handleComplexValue(item, cItem, children, opts);

    return `Array<${arrIn}>`;
  },

  // 处理返回值有key的类型
  genCodeWithFieldName(item, cItem, children, opts) {
    if (item.type !== 'array' && item.properties) {
      return utils.handleComplexValue(item, cItem, children, opts);
    }

    let r = '';

    if (item.type === 'array') {
      r = utils.genArrayCode(item, cItem, children, opts);
    } else {
      r = utils.genExtCode(item);
    }

    return r;
  },

  // 处理返回值无key的类型
  genCodeWithoutFieldName(item, cItem, children, opts) {
    if (item.type === 'array') {
      return utils.genArrayCode(item, cItem, children, opts);
    }
    return utils.getTsType(item.type);
  },

  // 处理属性值是对象或者对象数组
  handleComplexValue(item, cItem, children, opts) {
    item.properties = item.properties || [];
    // 当返回是数组或者基本类型、Map时，第一层的name是不存在的
    if (!item.name && item.type !== 'array') {
      return utils.travelForGenerateCode(item.properties, cItem, opts);
    }

    // 根据properties的属性值去models里面校验是否存在属性都相等的dto
    // 属性相等基本可以认为是同一个dto
    // 完整的对象属性还没有确定，但是dto的名称已经被上一级引用了
    let existModelName = utils.findAttrEqualModel(item.properties, opts.models);

    // 属性完全一致认为是同一个dto
    if (item.properties && cItem?.properties && deepEqual(item.properties.map(p => p.name), cItem.properties.map(p => p.name))) {
      existModelName = cItem.modelName;
    }

    if (existModelName) {
      return existModelName;
    }

    let modelName = utils.generateModelName(item);

    children.push({
      pItem: item,
      modelName,
      properties: item.properties,
    });

    return modelName;
  },

  generateModelName(item) {
    let n = item.name ?? item.oName;

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
      if (models.find(m => m.name === modelName)) {
        modelName += 'Dto';
      }

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

  travelForGenerateCode(sourceData, cItem, opts) {
    if (sourceData.length === 0) {
      return {
        dto: DEFAULT_TYPE,
        children: [],
      };
    }

    const children = [];
    let dto = {};

    for (let i = 0; i < sourceData.length; i++) {
      const item = sourceData[i];
      const fieldName = item.name ? utils.getTsPropertyName(item, opts.config.tsNotStrict) : '';

      if (fieldName) {
        if (utils.trimFieldName(fieldName)) {
          const v = utils.genCodeWithFieldName(item, cItem, children, opts);
          dto[fieldName] = opts.config.comment && item.description ? `${v}${CONCAT_DELIMITER}${trimBlank(item.description)}` : v;
        }
      } else {
        const r = utils.genCodeWithoutFieldName(item, cItem, children, opts);

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
};

module.exports = utils;
