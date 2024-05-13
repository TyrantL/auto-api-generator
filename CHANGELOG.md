# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.1](https://github.com/TyrantL/auto-api-generator/compare/v1.3.0...v1.3.1) (2024-05-13)


### Bug Fixes

* **dep:** 删除npm依赖中的pinyin ([e8b1f3e](https://github.com/TyrantL/auto-api-generator/commit/e8b1f3e9cf344e6f47e47c0c7d967b1ce617dc2e))

## [1.3.0](https://github.com/TyrantL/auto-api-generator/compare/v1.2.4...v1.3.0) (2024-05-10)


### Features

* **新增能力:** 新增增量更新能力，并且不会删除本地有但是拉取到的数据中不存在的接口 ([a5ef986](https://github.com/TyrantL/auto-api-generator/commit/a5ef98617fd8a5c9483a6537523e0c8b18769fbe))

### Bug Fixes

* **getApiData:** 修复接口异常时抛出错误中的接口路径为undefined的bug ([02529af](https://github.com/TyrantL/auto-api-generator/commit/02529af138a683935af5ee7e505bb2783338dc7b))

### [1.2.3](https://github.com/TyrantL/auto-api-generator/compare/v1.2.2...v1.2.3) (2024-04-29)


### Bug Fixes

* **request.js:** 兼容入参在path中的接口 ([2e9d3f9](https://github.com/TyrantL/auto-api-generator/commit/2e9d3f90532465d6aa82be56d5fb6da922ad8440))
* **src/data:** 修复单词拼写错误导致的subType类型丢失 ([27099a0](https://github.com/TyrantL/auto-api-generator/commit/27099a09cddcaf562b56fe5e6039a5e30d666d07))
* **tsNotStrictInclude:** 修复tsNotStrictInclude传数组类型时报错的问题 ([03fb584](https://github.com/TyrantL/auto-api-generator/commit/03fb584a411d9aeaa6b07b06dcf6f050f96d2391))
* **ts类型错误:** 修复因同名属性导致的类型错误问题 ([1a2741b](https://github.com/TyrantL/auto-api-generator/commit/1a2741b669587a1a813890cbb56e0448cf604684))
* **兼容axios:** 修复axios只提取axios本身的data时，生成的api.ts依然使用axiosPromise返回的bug ([5b6bbdd](https://github.com/TyrantL/auto-api-generator/commit/5b6bbdd191153ce69e6fe68c5b3f641bd7072cb4))
* **注释:** 修复config.ts没有注释的bug ([97a8b6d](https://github.com/TyrantL/auto-api-generator/commit/97a8b6d1fcf0caea80ddbc8978624a313dee1db4))

### [1.2.2](https://github.com/TyrantL/auto-api-generator/compare/v1.2.1...v1.2.2) (2024-04-15)


### Bug Fixes

* **api:** 修复配置extractResponseKeys后API类型仍默认为axiosPromise的问题 ([154535a](https://github.com/TyrantL/auto-api-generator/commit/154535ada8ecee325a232ef0b05aa7b6fd20b6c0))

### [1.2.1](https://github.com/TyrantL/auto-api-generator/compare/v1.2.0...v1.2.1) (2024-04-12)


### Bug Fixes

* **comment:** 修复接口标题注释缺失的问题 ([6101cb0](https://github.com/TyrantL/auto-api-generator/commit/6101cb0c0fd2a180b1a6c80de26785a93417be34))

## 1.2.0 (2024-04-12)


### Features


* **config:** 新增配置项 extractResponseKeys 以支持拦截器对请求返回数据提取的场景 ([fe1122b](https://github.com/TyrantL/auto-api-generator/commit/fe1122be019c26a5ce8bc13ff04cc35cde3bfa2e))
* **config:** 添加配置项 'tags'，支持接口按需基于 tags 动态生成 ([b1d23a6](https://github.com/TyrantL/auto-api-generator/commit/b1d23a6a05bbf3652ebf72e3d67da87c8537ae30))


## 1.1.0 (2024-04-11)


### Features

* **config:** 新增tsNotStrictInclude配置控制TS解析器的严格模式 ([4eed1d6](https://github.com/TyrantL/auto-api-generator/commit/4eed1d6cac9e93f8ad17b626225ecc793908e7b5))

### 1.0.1 (2024-04-11)


### Bug Fixes

* **config:** 修复默认comment配置为true时不生成文件注释的问题 ([d9ac083](https://github.com/TyrantL/auto-api-generator/commit/d9ac083bb1d4143957e9d3b3c01d19697ecd2553))

## 1.0.0 (2024-04-10)

### Features

[//]: # (* **api.types.ts:** api.ts与api.types.ts关联 &#40;[98f6650]&#40;https://github.com/TyrantL/auto-api-generator/commit/98f66503db63ae7e05fc40d19b0ac52ca9ab0c9c&#41;&#41;)
[//]: # (* **api.types.ts:** 解析res，并输出至api.types.ts &#40;[8dad519]&#40;https://github.com/TyrantL/auto-api-generator/commit/8dad519aadd4f6fdb8757981be6f1350a0599757&#41;&#41;)
[//]: # (* **api.types生成:** api.types req 解析完成 &#40;[de66ba7]&#40;https://github.com/TyrantL/auto-api-generator/commit/de66ba70ac7d6b5f422b6ee82d2b0a366567ef3b&#41;&#41;)
[//]: # (* **api.types生成:** api.types req 解析完成 &#40;[278637c]&#40;https://github.com/TyrantL/auto-api-generator/commit/278637c9a6e0ba5efd2b0c93d6c539b1177244c9&#41;&#41;)
[//]: # (* **api.types生成:** api.types req 解析完成 &#40;[d2e4db7]&#40;https://github.com/TyrantL/auto-api-generator/commit/d2e4db7366bc7f3090c373b8fcfc0fa140207303&#41;&#41;)
[//]: # (* **api.types生成:** api.types req 解析完成 &#40;[8c1a97c]&#40;https://github.com/TyrantL/auto-api-generator/commit/8c1a97c43b4960a1aebc0d234fa7e2e9b7185f82&#41;&#41;)
[//]: # (* **api.types生成:** api.types.ts 文件生成并输出req &#40;[9e8082b]&#40;https://github.com/TyrantL/auto-api-generator/commit/9e8082b1112ade89e65e6cf5503019fc8ddb2d32&#41;&#41;)
[//]: # (* **api生成:** 自动生成api，并输出api.ts文件 &#40;[cca33f4]&#40;https://github.com/TyrantL/auto-api-generator/commit/cca33f4f59ed6ce32725c3b193e0b98455481f86&#41;&#41;)
[//]: # (* **axios:** 添加axios实例模板 &#40;[0c9773c]&#40;https://github.com/TyrantL/auto-api-generator/commit/0c9773cf678a0fb76b6be3260e42a53dab9f6712&#41;&#41;)
[//]: # (* **axios:** 输出axios模板至output目录 &#40;[82a212b]&#40;https://github.com/TyrantL/auto-api-generator/commit/82a212bd08bb04972a17ebeafb5def022ea16818&#41;&#41;)
[//]: # (* **config:** 新增tsNotStrictInclude配置控制TS解析器的严格模式 &#40;[4eed1d6]&#40;https://github.com/TyrantL/auto-api-generator/commit/4eed1d6cac9e93f8ad17b626225ecc793908e7b5&#41;&#41;)
[//]: # (* **config:** 生成接口config配置文件 &#40;[11cc882]&#40;https://github.com/TyrantL/auto-api-generator/commit/11cc882d684836ba462e47291a6ae3892cbed443&#41;&#41;)
[//]: # (* **swagger数据解析:** swagger数据解析完成 &#40;[a4244ed]&#40;https://github.com/TyrantL/auto-api-generator/commit/a4244edaffb5a759b21e49549baef53d2a66c5df&#41;&#41;)
[//]: # (* **增加默认配置:** 增加默认配置项，1、comment默认打开 2、basePath默认从接口中获取，不必填 &#40;[cd20df3]&#40;https://github.com/TyrantL/auto-api-generator/commit/cd20df310e4b464a64ccdbf40cb09d05ec7f4f90&#41;&#41;)
[//]: # (* **异常处理:** 处理swagger接口数据异常导致抛出错误的情况，异常数据直接跳过，生成类型时为any &#40;[aa2109a]&#40;https://github.com/TyrantL/auto-api-generator/commit/aa2109ae7b8bc05baf57398f38ebec2db7c402f3&#41;&#41;)
[//]: # (* **config:** 修复默认comment配置为true时不生成文件注释的问题 &#40;[d9ac083]&#40;https://github.com/TyrantL/auto-api-generator/commit/d9ac083bb1d4143957e9d3b3c01d19697ecd2553&#41;&#41;)
[//]: # (* **config:** 修复默认comment配置为true时不生成文件注释的问题 &#40;[ee05387]&#40;https://github.com/TyrantL/auto-api-generator/commit/ee0538780784c5c7420ca14744102194c0dd4a9b&#41;&#41;)
