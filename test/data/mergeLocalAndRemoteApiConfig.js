const api1 = {
  id: 'getReadPageListForAppUsingGET',
  method: 'get',
  apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
  path: '/auth/m/myOfficialDocument/getReadPageList',
  basePath: undefined,
  title: '已阅公文列表（分页）（app端接口）',
  headers: `headers: { 'Content-Type': 'application/json; charset=utf-8' },`,
  codes: {
    req: '{\n' +
      '/** 当前页 */\n' +
      'curPage: number,\n' +
      '/** 关键字查询（app端查询：公文标题、文号、提交人） */\n' +
      'keyWord?: string,\n' +
      '/** 每页条数 */\n' +
      'pageSize: number,\n' +
      '}',
    res: '{\n' +
      'current: number,\n' +
      'total: number,\n' +
      'pages: number,\n' +
      'size: number,\n' +
      'records: Array<RecordsVO>,\n' +
      '}',
    models: [
      {
        name: 'RecordsVO',
        value: '{\n' +
          '/** 紧急程度id */\n' +
          'urgencyId: number,\n' +
          '/** 公文类型名称 */\n' +
          'odTypeName: string,\n' +
          '/** 限办日期 我的待办列表才会用到，其他用不到 */\n' +
          'restrictedDate: string,\n' +
          '/** 文号 */\n' +
          'documentNumber: string,\n' +
          '/** 当前审批节点对应的待审批人员姓名 */\n' +
          'wfUserNames: Array<string>,\n' +
          '/** 公文标题 */\n' +
          'title: string,\n' +
          '/** 创建时间 */\n' +
          'createdOn: string,\n' +
          '/** 紧急程度 */\n' +
          'urgency: string,\n' +
          '/** 工作流状态 1_审批中；2_已回退；3_已撤回；4_已办结；5_已作废 */\n' +
          'wfState: number,\n' +
          '/** 创建人 */\n' +
          'createdName: string,\n' +
          '/** 公文id */\n' +
          'id: number,\n' +
          '/** 审批状态 */\n' +
          'wfMemo: string,\n' +
          '/** 公文类型 */\n' +
          'odType: number,\n' +
          '}',
      },
    ],
  },
};

const api2 = {
  id: 'getUserInfoUsingGET',
  method: 'get',
  apiName: 'getAuthMUserGetUserInfo',
  path: '/auth/m/user/getUserInfo',
  basePath: '/letao-official-document-center',
  title: '获取用户信息',
  headers: '',
  codes: {
    req: null,
    res: '{code?:number,data?:DataVO,success?:boolean,message?:string}',
    models: [
      {
        name: 'DataVO',
        value: '{orgDptInfoList?:Array<OrgDptInfoListVO>,list?:Array<ListVO>,permissionInfo?:PermissionInfoVO}',
      },
      {
        name: 'OrgDptInfoListVO',
        value: '{menuList?:Array<MenuListVO>}',
      },
      {
        name: 'ListVO',
        value: '{menuList?:Array<MenuListAVO>}',
      },
      {
        name: 'PermissionInfoVO',
        value: '{menuList?:Array<MenuListAAVO>}',
      },
      {
        name: 'MenuListVO',
        value: '{hideInMenu?:boolean}',
      },
      {
        name: 'MenuListAVO',
        value: '{hideInMenu1?:boolean}',
      },
      {
        name: 'MenuListAAVO',
        value: '{permissionType?:number,menuList?:Array<MenuListVODto>}',
      },
      {
        name: 'MenuListVODto',
        value: '{componentPath?:string}',
      },
    ],
  },
};

const api3 = {
  id: 'getReadPageListForAppUsingGET',
  method: 'get',
  apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
  path: '/auth/m/myOfficialDocument/getReadPageList11',
  basePath: undefined,
  title: '已阅公文列表（分页）（app端接口）',
  headers: `headers: { 'Content-Type': 'application/json; charset=utf-8' },`,
  codes: {
    req: '{\n' +
      '/** 当前页 */\n' +
      'curPage: number,\n' +
      '/** 关键字查询（app端查询：公文标题、文号、提交人） */\n' +
      'keyWord?: string,\n' +
      '/** 每页条数 */\n' +
      'pageSize: number,\n' +
      '}',
    res: '{\n' +
      'current: number,\n' +
      'total: number,\n' +
      'pages: number,\n' +
      'size: number,\n' +
      'records: Array<RecordsVO>,\n' +
      '}',
    models: [
      {
        name: 'RecordsVO',
        value: '{\n' +
          '/** 紧急程度id */\n' +
          'urgencyId: number,\n' +
          '/** 公文类型名称 */\n' +
          'odTypeName: string,\n' +
          '/** 限办日期 我的待办列表才会用到，其他用不到 */\n' +
          'restrictedDate: string,\n' +
          '/** 文号 */\n' +
          'documentNumber: string,\n' +
          '/** 当前审批节点对应的待审批人员姓名 */\n' +
          'wfUserNames: Array<string>,\n' +
          '/** 公文标题 */\n' +
          'title: string,\n' +
          '/** 创建时间 */\n' +
          'createdOn: string,\n' +
          '/** 紧急程度 */\n' +
          'urgency: string,\n' +
          '/** 工作流状态 1_审批中；2_已回退；3_已撤回；4_已办结；5_已作废 */\n' +
          'wfState: number,\n' +
          '/** 创建人 */\n' +
          'createdName: string,\n' +
          '/** 公文id */\n' +
          'id: number,\n' +
          '/** 审批状态 */\n' +
          'wfMemo: string,\n' +
          '/** 公文类型 */\n' +
          'odType: number,\n' +
          '}',
      },
    ],
  },
};

const normal = {
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb',
  },
  input: [
    api1,
    api2,

  ],
  result: [
    api1,
    api2,
  ],
};

const addApi = {
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb',
  },
  input: [
    api1,
    api3,
    api2,
  ],
  result: [
    api1,
    api2,
    api3,
  ],
};

const deleteApi = {
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb',
  },
  input: [
    api2,
  ],
  result: [
    {
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '',
      headers:  "headers: {\"Content-Type\":\"application/json; charset=utf-8\"}",
      codes: {
        req: null,
        res: null,
        models: []
      }
    },
    api2,
  ],
};

const deleteApi2 = {
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb',
  },
  input: [
    api1,
  ],
  result: [
    api1,
    {
      method: 'get',
      apiName: 'getAuthMUserGetUserInfo',
      path: '/auth/m/user/getUserInfo',
      basePath: '/letao-official-document-center',
      title: '',
      headers: '',
      codes: {
        req: null,
        res: null,
        models: []
      }
    },
  ],
};

const noExistingConfigFile = {
  config: {
    output: './test/request/normal',
    projectName: 'letao-official-document-center',
    folderName: 'officialDocumentWeb1111',
  },
  input: [
    api1,
    api2,
  ],
  result: [
    api1,
    api2,
  ],
};

module.exports = {
  normal,
  addApi,
  deleteApi,
  deleteApi2,
  noExistingConfigFile,
};
