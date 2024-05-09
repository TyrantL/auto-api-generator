module.exports = {
  comment: true, // 默认打开注释
  tsNotStrictInclude: ['res'], // 可选项 req|res，默认为 res,表示所有类型都必传，不配置则按照 swagger 文档的 required 字段为准
  extractAxiosPromise: false, // 是否提取axios返回的data层级
  mergeConfig: true,
}
