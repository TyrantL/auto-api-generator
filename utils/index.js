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

exports.firstCharUpper = firstCharUpper;
exports.firstCharLower = firstCharLower;
exports.trimBlank = trimBlank;
exports.formatApiName = formatApiName;
