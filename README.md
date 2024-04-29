# smart-api-generator

![npm (scoped)](https://img.shields.io/npm/v/smart-api-generator)
[![Downloads](https://img.shields.io/npm/dm/smart-api-generator)](https://www.npmjs.com/package/smart-api-generator)
[![Coverage Status](https://coveralls.io/repos/github/TyrantL/auto-api-generator/badge.svg?branch=release)](https://coveralls.io/github/TyrantL/auto-api-generator?branch=release)

mart-api-generator是一个高效能的工具，专门用来自动化创建API接口及其相关文档

## 功能点

- 以项目维度生成格式统一的接口配置，可直接用于生产环境中
- 良好的入参、出参注释，可直接拷贝使用接口调用代码
- 接口调用支持typescript智能提示与校验
- 支持ts文件生成与接口结构interface的生成

## 安装
```
// npm
npm install smart-api-generator -D

// yarn
yarn add smart-api-generator -D

// pnpm
pnpm install smart-api-generator -D
```

## 使用步骤

1、在 package.json 中配置命令，配置文件可指定路径，如果不指定路径默认取根目录下的`.api.config.js`文件

```
"scripts": {
        ......
    "api": "cross-env smart-api create --config /path/to/.api.config.js"
},
```

2、在工程中添加配置文件`·api.config.js`

```javascript
module.exports = {
    output: './src/request',
    projects: [
        {
            projectName: 'xxx',
            basePath: 'xxx',
            //...
        }
    ]
}
```

3、在根目录中运行命令
```
npm run api
```

## 配置项
<!-- Markdown表格 -->
<table>
<thead>
<tr>
<th style="width: 150px">参数</th>
<th style="width: 250px">说明</th>
<th style="width: 150px">必填</th>
<th style="width: 100px">类型</th>
<th style="width: 200px">默认值</th>
<th style="width: 150px">版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>output</td>
<td>接口文件输出目录</td>
<td>true</td>
<td>string</td>
<td>-</td>
<td>1.0.0</td>
</tr>
<tr>
<td>host</td>
<td>swagger平台地址</td>
<td>false</td>
<td>string</td>
<td>https://letao.cnstrong.cn</td>
<td>1.0.0</td>
</tr>
<tr>
<td>projects</td>
<td>接口文档配置</td>
<td>true</td>
<td>array</td>
<td>-</td>
<td>1.0.0</td>
</tr>
</tbody>
</table>

### projects
<table>
<thead>
<tr>
<th style="width: 150px">参数</th>
<th style="width: 250px">说明</th>
<th style="width: 150px">必填</th>
<th style="width: 100px">类型</th>
<th style="width: 200px">默认值</th>
<th style="width: 150px">版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>projectName</td>
<td>项目名称,对应swagger接口文档地址，如：<span>https://letao.cnstrong.cn/letao-official-document-center/doc.html#/home</span> 中，projectName 为 letao-official-document-center</td>
<td>true</td>
<td>string</td>
<td>-</td>
<td>1.0.0</td>
</tr>
<tr>
<td>basePath</td>
<td>接口统一前缀，默认会使用swagger文档中的basePath字段，如果文档与实际有差异，请手动配置</td>
<td>false</td>
<td>string</td>
<td>swagger文档主页中的basePath字段</td>
<td>1.0.0</td>
</tr>
<tr>
<td>comment</td>
<td>是否需要生成注释</td>
<td>false</td>
<td>boolean</td>
<td>true</td>
<td>1.0.0</td>
</tr>
<tr>
<td>folderName</td>
<td>生成文件夹的名称</td>
<td>false</td>
<td>string</td>
<td>默认使用 projectName</td>
<td>1.0.0</td>
</tr>
<tr>
<td>tsNotStrictInclude</td>
<td>生成的ts代码时，控制请求参数/返回结果是否严格模式,req 参数部分关闭严格模式，res 返回部分关闭严格模式 </td>
<td>false</td>
<td>string[]</td>
<td>['res']</td>
<td>1.1.0</td>
</tr>
<tr>
<td>extractResponseKeys</td>
<td>对接口返回结构进行提取，应对axios拦截器对请求返回做提取的场景，如['data']则提取接口返回中的data字段作为Res，可以配置多个，返回匹配到的第一个</td>
<td>false</td>
<td>string[]</td>
<td>-</td>
<td>1.2.0</td>
</tr>
<tr>
<td>tags</td>
<td>可以只生成项目下指定分类下的接口， 如: ['user']</td>
<td>false</td>
<td>string[]</td>
<td>-</td>
<td>1.2.0</td>
</tr>
</tbody>
</table>

