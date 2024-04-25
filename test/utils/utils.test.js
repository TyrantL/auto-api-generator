const { expect } = require('chai');
const {
  getBaseTypeMapping,
  TYPE_MAPPING,
  firstCharUpper,
  firstCharLower,
  trimBlank,
  fixedPathForApiName,
  firstChartUpperCaseAndTrim,
  formatApiName,
  isBaseType,
  deepEqual,
} = require('../../utils');

describe('getBaseTypeMapping', () => {
  it('should return the same object as TYPE_MAPPING', () => {
    const result = getBaseTypeMapping();
    expect(result).equal(TYPE_MAPPING);
  });
});

describe('firstCharUpper', () => {
  it('should return the string with the first character capitalized', () => {
    expect(firstCharUpper('hello')).equal('Hello');
    expect(firstCharUpper('world')).equal('World');
    expect(firstCharUpper('JavaScript')).equal('JavaScript');
    expect(firstCharUpper('')).equal('');
  });
  it('should return itself when input is not string', () => {
    expect(firstCharUpper(123)).equal(123);
    expect(firstCharUpper(null)).equal(null);
    expect(firstCharUpper(undefined)).equal(undefined);
    expect(firstCharUpper(true)).equal(true);
    expect(firstCharUpper({})).to.deep.equal({});
    expect(firstCharUpper([])).to.deep.equal([]);
  });
});

describe('firstCharLower', () => {
  it('should return the string with the first character capitalized', () => {
    expect(firstCharLower('Hello')).equal('hello');
    expect(firstCharLower('WORLD')).equal('wORLD');
    expect(firstCharLower('')).equal('');
  });
  it('should return itself when input is not string', () => {
    expect(firstCharLower(123)).equal(123);
    expect(firstCharLower(null)).equal(null);
    expect(firstCharLower(undefined)).equal(undefined);
    expect(firstCharLower(true)).equal(true);
    expect(firstCharLower({})).to.deep.equal({});
    expect(firstCharLower([])).to.deep.equal([]);
  });
});

describe('trimBlank', () => {
  // 测试空字符串
  it('should trim empty string', () => {
    expect(trimBlank('')).equal('');
  });

  // 测试空格字符串
  it('should trim space string', () => {
    expect(trimBlank('   ')).equal('');
  });

  // 测试字符串两端有空格
  it('should trim string with spaces at both ends', () => {
    expect(trimBlank('  hello world  ')).equal('hello world');
  });

  // 测试非字符串输入
  it('should handle non-string input', () => {
    expect(trimBlank(null)).equal('');
    expect(trimBlank(undefined)).equal('');
    expect(trimBlank(123)).equal('');
    expect(trimBlank(true)).equal('');
    expect(trimBlank({})).equal('');
    expect(trimBlank([])).equal('');
  });
});

describe('fixedPathForApiName', () => {
  it('should return the correct path and parts when the input path is valid', () => {
    const inputPath = 'user/getUserInfo';
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq(['user', 'getUserInfo']);
  });

  it('should replace non-alphanumeric characters with an empty string', () => {
    const inputPath = 'user/get*UserInfo?';
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq(['user', 'getUserInfo']);
  });

  it('should convert underscores and hyphens to uppercase', () => {
    const inputPath = 'user/get_user_info';
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq(['user', 'getUserInfo']);
  });

  it('should remove empty parts and slashes', () => {
    const inputPath = '/user//get_user_info/';
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq(['user', 'getUserInfo']);
  });

  it('should handle empty input', () => {
    const inputPath = '';
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq([]);
  });

  it('should handle undefined input', () => {
    const inputPath = undefined;
    const ret = fixedPathForApiName(inputPath);
    expect(ret).to.deep.eq([]);
  });
});

describe('firstChartUpperCaseAndTrim', () => {
  it('should return the first character of the string in uppercase and trim whitespace', () => {
    expect(firstChartUpperCaseAndTrim('  hello world  ')).eq('Hello world');
  });

  it('should return the string in uppercase and trim whitespace if there is no first character', () => {
    expect(firstChartUpperCaseAndTrim('hello world')).eq('Hello world');
    expect(firstChartUpperCaseAndTrim('h')).eq('H');
  });

  it('should return an empty string if the input is null or undefined', () => {
    expect(firstChartUpperCaseAndTrim(null)).eq('');
    expect(firstChartUpperCaseAndTrim(undefined)).eq('');
  });

  it('should remove any special characters before processing', () => {
    expect(firstChartUpperCaseAndTrim('{  hello world  }')).eq('Hello world');
  });

  it('should handle strings with no characters', () => {
    expect(firstChartUpperCaseAndTrim('')).eq('');
  });
});

describe('formatApiName', () => {

  // 测试用例1: 当apiPath为空时，返回空字符串
  it('should return empty string when apiPath is empty', () => {
    expect(formatApiName('', 'get')).eq('get');
  });

  // 测试用例2: 当apiPath只有一个部分时，返回method加上首字母大写的部分
  it('should return method with first letter capitalized when apiPath has only one part', () => {
    expect(formatApiName('getUserInfo', 'post')).eq('postGetUserInfo');
  });

  // 测试用例3: 当apiPath有多个部分时，返回method加上连接后的部分，每个部分首字母大写，去除空格
  it('should return method with connected parts, each capitalized and trimmed', () => {
    expect(formatApiName('get-user-info', 'post')).eq('postGetUserInfo');
  });

  // 测试用例4: 当apiPath中有连续的空格时，应去除多余的空格
  it('should trim extra spaces in apiPath', () => {
    expect(formatApiName('  get_user_info  ', 'put')).eq('putGetUserInfo');
  });

  // 测试用例5: 当method为空时，返回空字符串
  it('should return empty string when method is empty', () => {
    expect(formatApiName('getUserInfo', '')).eq('GetUserInfo');
  });

  // 测试用例6: 当method不是字符串时
  it('should throw an error when method is not a string', () => {
    expect(() => {
      formatApiName('getUserInfo', null).eq('GetUserInfo');
    });
  });
});

describe('isBaseType', () => {
  it('should return true for base types', () => {
    expect(isBaseType('int')).eq(true);
    expect(isBaseType('string')).eq(true);
    expect(isBaseType('boolean')).eq(true);
    expect(isBaseType('void')).eq(true);
    expect(isBaseType('float')).eq(true);
    expect(isBaseType('localdatetime')).eq(true);
    expect(isBaseType('char')).eq(true);
    expect(isBaseType('byte')).eq(true);
    expect(isBaseType('short')).eq(true);
    expect(isBaseType('character')).eq(true);
    expect(isBaseType('number')).eq(true);
  });

  it('should return false for non-base types', () => {
    expect(isBaseType('object')).eq(false);
    expect(isBaseType('array')).eq(false);
    expect(isBaseType('function')).eq(false);
    expect(isBaseType('undefined')).eq(false);
    expect(isBaseType('null')).eq(false);
    expect(isBaseType('')).eq(false);
    expect(isBaseType(123)).eq(false);
    expect(isBaseType(true)).eq(false);
    expect(isBaseType([])).eq(false);
    expect(isBaseType({})).eq(false);
  });

  it('should handle case insensitive input', () => {
    expect(isBaseType('INT')).eq(true);
    expect(isBaseType('STRING')).eq(true);
    expect(isBaseType('BOOLEAN')).eq(true);
    expect(isBaseType('VOID')).eq(true);
    expect(isBaseType('FLOAT')).eq(true);
    expect(isBaseType('LOCALDATETIME')).eq(true);
    expect(isBaseType('CHAR')).eq(true);
    expect(isBaseType('BYTE')).eq(true);
    expect(isBaseType('SHORT')).eq(true);
    expect(isBaseType('CHARACTER')).eq(true);
    expect(isBaseType('NUMBER')).eq(true);
  });

  it('should return false for non-string input', () => {
    expect(isBaseType(null)).eq(false);
    expect(isBaseType(undefined)).eq(false);
    expect(isBaseType(123)).eq(false);
    expect(isBaseType(true)).eq(false);
    expect(isBaseType([])).eq(false);
    expect(isBaseType({})).eq(false);
    expect(isBaseType(() => {})).eq(false);
  });
});

describe('deepEqual', () => {
  it('deepEqual test case 1', () => {
    expect(deepEqual(1, 1)).eq(true);
  });

  it('deepEqual test case 2', () => {
    expect(deepEqual(0, -0)).eq(false);
  });

  it('deepEqual test case 3', () => {
    expect(deepEqual(NaN, NaN)).eq(true);
  });

  it('deepEqual test case 4', () => {
    expect(deepEqual(null, undefined)).eq(false);
  });

  it('deepEqual test case 5', () => {
    expect(deepEqual('foo', 'foo')).eq(true);
  });

  it('deepEqual test case 6', () => {
    expect(deepEqual('foo', 'bar')).eq(false);
  });

  it('deepEqual test case 7', () => {
    expect(deepEqual(123, '123')).eq(true);
  });

  it('deepEqual test case 8', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).eq(true);
  });

  it('deepEqual test case 9', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 4])).eq(false);
  });

  it('deepEqual test case 10', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).eq(true);
  });

  it('deepEqual test case 11', () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).eq(false);
  });

  it('deepEqual test case 12', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).eq(true);
  });

  it('deepEqual test case 13', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { c: 1 } })).eq(false);
  });

  it('deepEqual test case 14', () => {
    expect(deepEqual(new Date(2020, 1, 1), new Date(2020, 1, 1))).eq(true);
  });

  it('deepEqual test case 15', () => {
    expect(deepEqual(new Date(2020, 1, 1), new Date(2020, 2, 1))).eq(false);
  });

  it('deepEqual test case 16', () => {
    expect(deepEqual(true, true)).eq(true);
  });

  it('deepEqual test case 17', () => {
    expect(deepEqual(true, false)).eq(false);
  });

  it('deepEqual test case 18', () => {
    expect(deepEqual(/abc/, /abc/)).eq(true);
  });

  it('deepEqual test case 19', () => {
    expect(deepEqual(/abc/, /def/)).eq(false);
  });

  it('deepEqual test case 20', () => {
    expect(deepEqual(new RegExp('abc'), new RegExp('abc'))).eq(true);
  });

  it('deepEqual test case 21', () => {
    expect(deepEqual(new RegExp('abc'), new RegExp('def'))).eq(false);
  });

  it('deepEqual test case 22', () => {
    expect(deepEqual(function () {}, function () {})).eq(false);
  });

  it('deepEqual test case 23', () => {
    function Foo() {}

    expect(deepEqual(new Foo(), new Foo())).eq(true);
  });

  it('deepEqual test case 24', () => {
    function Foo() {}

    function Bar() {}

    expect(deepEqual(new Foo(), new Bar())).eq(false);
  });


  it('deepEqual test case 25', () => {
    expect(deepEqual([1, 2, [3, 4]], [1, 2, [3, 4]])).eq(true);
  });

  it('deepEqual test case 26', () => {
    expect(deepEqual([1, 2, [3, 4]], [1, 2, [3, 5]])).eq(false);
  });

  it('deepEqual test case 27', () => {
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).eq(true);
  });

  it('deepEqual test case 28', () => {
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).eq(false);
  });

  it('deepEqual test case 29', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).eq(true);
  });

  it('deepEqual test case 30', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { c: 1 } })).eq(false);
  });

  it('deepEqual test case 31', () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).eq(true);
  });

  it('deepEqual test case 32', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).eq(false);
  });

  it('deepEqual test case 33', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: undefined })).eq(false);
  });

  it('deepEqual test case 34', () => {
    expect(deepEqual({ a: 1 }, { a: NaN })).eq(false);
  });

  it('deepEqual test case 35', () => {
    expect(deepEqual({ a: NaN }, { a: NaN })).eq(true);
  });

  it('deepEqual test case 36', () => {
    expect(deepEqual({ a: undefined }, { a: undefined })).eq(true);
  });

  it('deepEqual test case 37', () => {
    expect(deepEqual({ a: undefined }, { a: null })).eq(false);
  });

  it('deepEqual test case 38', () => {
    expect(deepEqual({ a: null }, { a: null })).eq(true);
  });

  it('deepEqual test case 39', () => {
    expect(deepEqual({ a: null }, { a: undefined })).eq(false);
  });

  it('deepEqual test case 40', () => {
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2] })).eq(false);
  });

  it('deepEqual test case 41', () => {
    expect(deepEqual({ a: [1, 2] }, { a: [1, 2, 3] })).eq(false);
  });

  it('deepEqual test case 42', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).eq(false);
  });

  it('deepEqual test case 43', () => {
    expect(deepEqual({ a: { b: 2 } }, { a: { b: 1 } })).eq(false);
  });

  it('deepEqual test case 44', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).eq(true);
  });

  it('deepEqual test case 45', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).eq(false);
  });

  it('deepEqual test case 46', () => {
    expect(deepEqual({ a: { b: { c: 2 } } }, { a: { b: { c: 1 } } })).eq(false);
  });

  it('deepEqual test case 47', () => {
    expect(deepEqual({ a: [1, 2, { c: 3 }] }, { a: [1, 2, { c: 3 }] })).eq(true);
  });

  it('deepEqual test case 48', () => {
    expect(deepEqual({ a: [1, 2, { c: 3 }] }, { a: [1, 2, { c: 4 }] })).eq(false);
  });

  it('deepEqual test case 49', () => {
    expect(deepEqual({ a: [1, 2, { c: 4 }] }, { a: [1, 2, { c: 3 }] })).eq(false);
  });

  it('deepEqual test case 50', () => {
    expect(deepEqual({ a: { b: [1, 2, 3] } }, { a: { b: [1, 2, 3] } })).eq(true);
  });

  it('deepEqual test case 51', () => {
    expect(deepEqual({ a: { b: [1, 2, 3] } }, { a: { b: [1, 2, 4] } })).eq(false);
  });

  it('deepEqual test case 52', () => {
    expect(deepEqual({ a: { b: [1, 2, 4] } }, { a: { b: [1, 2, 3] } })).eq(false);
  });

  it('deepEqual test case 53', () => {
    expect(deepEqual({ a: [1, [2, 3], 4] }, { a: [1, [2, 3], 4] })).eq(true);
  });

  it('deepEqual test case 54', () => {
    expect(deepEqual(Object(1), Object(1))).eq(true);
  });

  it('deepEqual test case 55', () => {
    expect(deepEqual(Object(1), Object(2))).eq(false);
  });

  it('deepEqual test case 56', () => {
    const a = { a: 1, b: 2 };
    a.c = a;
    const b = { a: 1, b: 2 };
    b.c = b;
    expect(deepEqual(a, b)).eq(true);
  });

  it('deepEqual test case 57', () => {
    expect(deepEqual([], {})).eq(false);
  });

  it('deepEqual test case 58', () => {
    expect(deepEqual({ a: Object(NaN) }, { a: Object(NaN) })).eq(true);
  });

  it('deepEqual test case 59', () => {
    expect(deepEqual(Object(+0), Object(-0))).eq(false);
  });

  it('deepEqual test case 60', () => {
    function Foo() {}
    function Bar() {}
    Foo.prototype = Object.create(Function.prototype);
    expect(deepEqual(new Foo(), new Bar())).eq(false);
  });
});
