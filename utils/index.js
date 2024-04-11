const { pinyin } = require('pinyin');
const TYPE_MAPPING = {
  number: ['int', 'integer', 'long', 'bigdecimal', 'float', 'double', 'number'],
  string: ['localdatetime', 'date', 'char', 'byte', 'short', 'character', 'string'],
  void: ['void'],
  boolean: ['boolean'],
};

function getBaseTypeMapping() {
  return TYPE_MAPPING;
}

function firstCharUpper(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function firstCharLower(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// 过滤接口标题中的空白
function trimBlank(str) {
  return `${(str || '')}`.trim();
}

// 对path进行特殊字符过滤并拆分
// 对于非数字/字符/-_等字符的统一替换，然后首字母大写
function fixedPathForApiName(path) {
  path = (path || '').replace(/[^\d\/\w-_]/gi, '')
    .replace(/[-_]\w/g, ($1) => {
      return $1.charAt(1).toUpperCase();
    });

  const parts = path.split('/').filter((part) => {
    return !!part && part !== '/';
  });

  return {
    path,
    parts,
  };
}

function firstChartUpperCaseAndTrim(str) {
  const reg = /(\w)(.*)/;
  const matches = (str || '').replace(/[{}.]/g, '').match(reg);

  if (matches && matches[1]) {
    return matches[1].toUpperCase() + matches[2].trim();
  } else {
    return str.trim();
  }
}

function formatApiName(apiPath, method) {
  const { parts } = fixedPathForApiName(apiPath);
  let str = '';

  if (parts.length > 0) {
    str = parts.reduce((prev, curr) => {
      return firstChartUpperCaseAndTrim(prev) + firstChartUpperCaseAndTrim(curr);
    }, '');
  }

  return firstCharLower(method) + str;
}

// 判断基本类型，把其他语言的类型统一成js类型
function isBaseType(type) {
  if (typeof type !== 'string') {
    return false;
  }
  type = type.toLowerCase();
  const types = Object.keys(TYPE_MAPPING);
  for (let i = 0; i < types.length; i++) {
    const t = types[i];
    if (TYPE_MAPPING[t].includes(type)) {
      return true;
    }
  }
  return false;
}

function getTypeName(name) {
  return pinyin(name, { style: 'normal' })
    .map(item => firstCharUpper(item[0]))
    .join('')
    .replace(/[^a-zA-Z]/ig, '')
    .replace(/DuiXiang$/, 'VO');
}

function deepEqual(a, b) {
  const toString = Object.prototype.toString;

  function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
  }

  function eq(a, b, aStack, bStack) {
    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) return false;

    // 判断 NaN
    // eslint-disable-next-line no-self-compare
    if (a !== a) return b !== b;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    const type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
  }

  function deepEq(a, b, aStack, bStack) {
    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    const className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
      case '[object RegExp]':
      case '[object String]':
        return '' + a === '' + b;
      case '[object Number]':
        // eslint-disable-next-line no-self-compare
        if (+a !== +a) return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        return +a === +b;
      default:
    }

    const areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
      // 过滤掉两个函数的情况
      if (typeof a !== 'object' || typeof b !== 'object') return false;

      const aCtor = a.constructor,
        bCtor = b.constructor;
      // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
      if (
        aCtor !== bCtor &&
        !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) &&
        'constructor' in a &&
        'constructor' in b
      ) {
        return false;
      }
    }

    aStack = aStack || [];
    bStack = bStack || [];
    let length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b;
      }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {
      length = a.length;
      if (length !== b.length) return false;

      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
      // eslint-disable-next-line brace-style
    }
    // 对象判断
    else {
      const keys = Object.keys(a);
      let key;
      length = keys.length;

      if (Object.keys(b).length !== length) return false;
      while (length--) {
        key = keys[length];
        if (!(Object.prototype.hasOwnProperty.call(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }

    aStack.pop();
    bStack.pop();
    return true;
  }

  if (typeof a === 'string') {
    try {
      a = JSON.parse(a);
    } catch (e) {}
  }

  if (typeof b === 'string') {
    try {
      b = JSON.parse(b);
    } catch (e) {}
  }

  return eq(a, b);
}

module.exports = {
  getBaseTypeMapping,
  firstCharUpper,
  firstCharLower,
  trimBlank,
  formatApiName,
  deepEqual,
  isBaseType,
  getTypeName,
};
