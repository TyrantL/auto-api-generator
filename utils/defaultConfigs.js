module.exports = {
  comment: true, // 默认打开注释
  tsNotStrictInclude: ['res'], // 可选项 req|res，默认为 res,表示所有类型都必传，不配置则按照 swagger 文档的 required 字段为准
  extractAxiosPromise: false, // 是否提取axios返回的data层级
  mergeConfig: true, // 打开后，不会删除本地配置有但是接口文档中没有的接口，可以手动删除，而且新增的接口都会排列到最后面
}
