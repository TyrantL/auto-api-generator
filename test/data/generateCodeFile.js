const formatApiDataObject = require('./formatApiData');
const normal = {
  input: [
    ...formatApiDataObject.normal.result,
    ...[{...formatApiDataObject.sameNameDto.result[0], basePath: '/letao-official-document-center'}],
    // ...formatApiDataObject.responseIsStaticPropWithNoName.result,
  ],
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb',
    comment: true,
  },
  result: {
    config: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      'export default {\n' +
      'getAuthMMyOfficialDocumentGetReadPageList: {' +
      'url: \'/auth/m/myOfficialDocument/getReadPageList\',' +
      'method: \'get\',' +
      'headers: { \'Content-Type\': \'application/json; charset=utf-8\' },' +
      '},' +
      'getAuthMUserGetUserInfo: {' +
      'url: \'/auth/m/user/getUserInfo\',' +
      'method: \'get\',' +
      'baseURL: \'/letao-official-document-center\',' +
      '},' +
      '};',
    api: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      '// @ts-nocheck\n' +
      'import AT from \'./api.types\';' +
      'import { AxiosPromise as Promise } from \'axios\';' +
      'import axios from \'../request\';\n' +
      'import config from \'./config\';' +
      'export default {\n' +
      '/** 已阅公文列表（分页）（app端接口） */\n' +
      'getAuthMMyOfficialDocumentGetReadPageList: (\n' +
      'req: AT.ET<AT.GetAuthMMyOfficialDocumentGetReadPageList.Req>,\n' +
      'option:object = {}\n' +
      '): Promise<AT.ET<AT.GetAuthMMyOfficialDocumentGetReadPageList.Res>> => {\n' +
      'return axios({data: req, ...config.getAuthMMyOfficialDocumentGetReadPageList, ...option });\n' +
      '},\n' +
      '/** 获取用户信息 */\n' +
      'getAuthMUserGetUserInfo: (\n' +
      'req?: AT.ET<AT.GetAuthMUserGetUserInfo.Req>,\n' +
      'option:object = {}\n' +
      '): Promise<AT.ET<AT.GetAuthMUserGetUserInfo.Res>> => {\n' +
      'return axios({data: req, ...config.getAuthMUserGetUserInfo, ...option });\n' +
      '},' +
      '};',
    types: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      'declare namespace AT {\n' +
      '  export type ET<T> = T extends object\n' +
      '    ? T extends infer O\n' +
      '      ? { [K in keyof O]: ET<O[K]> }\n' +
      '      : never\n' +
      '    : T;\n' +
      '\n' +
      '  /** 已阅公文列表（分页）（app端接口） get /auth/m/myOfficialDocument/getReadPageList */\n' +
      '  export module GetAuthMMyOfficialDocumentGetReadPageList {\n' +
      '    export type RecordsVO = {\n' +
      '      /** 紧急程度id */\n' +
      '      urgencyId: number;\n' +
      '      /** 公文类型名称 */\n' +
      '      odTypeName: string;\n' +
      '      /** 限办日期 我的待办列表才会用到，其他用不到 */\n' +
      '      restrictedDate: string;\n' +
      '      /** 文号 */\n' +
      '      documentNumber: string;\n' +
      '      /** 当前审批节点对应的待审批人员姓名 */\n' +
      '      wfUserNames: Array<string>;\n' +
      '      /** 公文标题 */\n' +
      '      title: string;\n' +
      '      /** 创建时间 */\n' +
      '      createdOn: string;\n' +
      '      /** 紧急程度 */\n' +
      '      urgency: string;\n' +
      '      /** 工作流状态 1_审批中；2_已回退；3_已撤回；4_已办结；5_已作废 */\n' +
      '      wfState: number;\n' +
      '      /** 创建人 */\n' +
      '      createdName: string;\n' +
      '      /** 公文id */\n' +
      '      id: number;\n' +
      '      /** 审批状态 */\n' +
      '      wfMemo: string;\n' +
      '      /** 公文类型 */\n' +
      '      odType: number;\n' +
      '    };\n' +
      '\n' +
      '    export interface Req {\n' +
      '      /** 当前页 */\n' +
      '      curPage: number;\n' +
      '      /** 关键字查询（app端查询：公文标题、文号、提交人） */\n' +
      '      keyWord?: string;\n' +
      '      /** 每页条数 */\n' +
      '      pageSize: number;\n' +
      '    }\n' +
      '\n' +
      '    export interface Res {\n' +
      '      current: number;\n' +
      '      total: number;\n' +
      '      pages: number;\n' +
      '      size: number;\n' +
      '      records: Array<RecordsVO>;\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  /** 获取用户信息 get /auth/m/user/getUserInfo */\n' +
      '  export module GetAuthMUserGetUserInfo {\n' +
      '    export type DataVO = {\n' +
      '      orgDptInfoList?: Array<OrgDptInfoListVO>;\n' +
      '      list?: Array<ListVO>;\n' +
      '      permissionInfo?: PermissionInfoVO;\n' +
      '    };\n' +
      '    export type OrgDptInfoListVO = { menuList?: Array<MenuListVO> };\n' +
      '    export type ListVO = { menuList?: Array<MenuListAVO> };\n' +
      '    export type PermissionInfoVO = { menuList?: Array<MenuListAAVO> };\n' +
      '    export type MenuListVO = { hideInMenu?: boolean };\n' +
      '    export type MenuListAVO = { hideInMenu1?: boolean };\n' +
      '    export type MenuListAAVO = {\n' +
      '      permissionType?: number;\n' +
      '      menuList?: Array<MenuListVODto>;\n' +
      '    };\n' +
      '    export type MenuListVODto = { componentPath?: string };\n' +
      '\n' +
      '    export type Req = any;\n' +
      '\n' +
      '    export interface Res {\n' +
      '      code?: number;\n' +
      '      data?: DataVO;\n' +
      '      success?: boolean;\n' +
      '      message?: string;\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      'export default AT;\n'
  }
};

const noComment = {
  input: formatApiDataObject.responseIsStaticPropWithNoName.result,
  config: {
    output: './test/request/noComment',
    projectName: 'letao-official-document-center',
    folderName: 'letao-official-document-center',
    comment: false,
  },
  result: {
    config: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      'export default {\n' +
      '  getAuthMMyOfficialDocumentGetReadPageList: {\n' +
      '    url: \'/auth/m/myOfficialDocument/getReadPageList\',\n' +
      '    method: \'get\',\n' +
      '  },\n' +
      '};\n',
    api: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      '// @ts-nocheck\n' +
      'import AT from \'./api.types\';\n' +
      'import { AxiosPromise as Promise } from \'axios\';\n' +
      'import axios from \'../request\';\n' +
      'import config from \'./config\';\n' +
      'export default {\n' +
      '  getAuthMMyOfficialDocumentGetReadPageList: (\n' +
      '    req?: AT.ET<AT.GetAuthMMyOfficialDocumentGetReadPageList.Req>,\n' +
      '    option: object = {}\n' +
      '  ): Promise<AT.ET<AT.GetAuthMMyOfficialDocumentGetReadPageList.Res>> => {\n' +
      '    return axios({\n' +
      '      data: req,\n' +
      '      ...config.getAuthMMyOfficialDocumentGetReadPageList,\n' +
      '      ...option,\n' +
      '    });\n' +
      '  },\n' +
      '};\n',
    types: '// 该文件自动生成，请勿修改(除非知道自己在做什么)\n' +
      '/* eslint-disable */\n' +
      'declare namespace AT {\n' +
      '  export type ET<T> = T extends object\n' +
      '    ? T extends infer O\n' +
      '      ? { [K in keyof O]: ET<O[K]> }\n' +
      '      : never\n' +
      '    : T;\n' +
      '\n' +
      '  export module GetAuthMMyOfficialDocumentGetReadPageList {\n' +
      '    export type Req = any;\n' +
      '\n' +
      '    export type Res = boolean;\n' +
      '  }\n' +
      '}\n' +
      'export default AT;\n',
  }
}

module.exports = {
  normal,
  noComment,
}
