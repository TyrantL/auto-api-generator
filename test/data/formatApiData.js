const normal = {
  input: [
    {
      id: 'getReadPageListForAppUsingGET',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      title: '已阅公文列表（分页）（app端接口）',
      method: 'get',
      query: [
        {
          name: 'curPage',
          description: '当前页',
          required: true,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'keyWord',
          description: '关键字查询（app端查询：公文标题、文号、提交人）',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
        {
          name: 'pageSize',
          description: '每页条数',
          required: true,
          type: 'integer',
          subType: null,
          properties: null,
        },
      ],
      body: null,
      response: [
        {
          name: '',
          description: '业务响应数据',
          required: false,
          subTypes: null,
          properties: [
            {
              name: 'current',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'total',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'pages',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'size',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'records',
              required: false,
              type: 'array',
              subTypes: null,
              properties: [
                {
                  name: 'urgencyId',
                  description: '紧急程度id',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'odTypeName',
                  description: '公文类型名称',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'restrictedDate',
                  description: '限办日期 我的待办列表才会用到，其他用不到',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'documentNumber',
                  description: '文号',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'wfUserNames',
                  description: '当前审批节点对应的待审批人员姓名',
                  required: false,
                  type: 'array',
                  subType: 'string',
                  properties: null,
                },
                {
                  name: 'title',
                  description: '公文标题',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'createdOn',
                  description: '创建时间',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'urgency',
                  description: '紧急程度',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'wfState',
                  description:
                    '工作流状态 1_审批中；2_已回退；3_已撤回；4_已办结；5_已作废',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'createdName',
                  description: '创建人',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'id',
                  description: '公文id',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'wfMemo',
                  description: '审批状态',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'odType',
                  description: '公文类型',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
              ],
            },
          ],
        },
      ],
      tags: ['V1.0.0-公文中心、流转', '公文中心、流转'],
    },
  ],
  config: { comment: true, tsNotStrictInclude: ['res'] },
  result: [
    {
      id: 'getReadPageListForAppUsingGET',
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '已阅公文列表（分页）（app端接口）',
      headers: '',
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
    },
  ],
};
const sameNameDto = {
  input: [
    {
      id: 'getUserInfoUsingGET',
      path: '/auth/m/user/getUserInfo',
      title: '获取用户信息',
      method: 'get',
      query: null,
      body: null,
      response: [
        {
          name: 'code',
          description: '业务响应状态码',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'data',
          description: '业务响应数据',
          required: false,
          subTypes: null,
          properties: [
            {
              name: 'orgDptInfoList',
              description: '父级部门ID',
              required: false,
              type: 'array',
              subTypes: null,
              properties: [
                {
                  name: 'menuList',
                  description: '子菜单列表',
                  required: false,
                  type: 'array',
                  subTypes: null,
                  properties: [
                    {
                      name: 'hideInMenu',
                      description: '菜单是否隐藏',
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'list',
              description: '父级部门ID',
              required: false,
              type: 'array',
              subTypes: null,
              properties: [
                {
                  name: 'menuList',
                  description: '子菜单列表',
                  required: false,
                  type: 'array',
                  subTypes: null,
                  properties: [
                    {
                      name: 'hideInMenu1',
                      description: '菜单是否隐藏',
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'permissionInfo',
              description: '权限列表（包含按钮）',
              required: false,
              subTypes: null,
              properties: [
                {
                  name: 'menuList',
                  description: '功能菜单列表',
                  required: false,
                  type: 'array',
                  subTypes: null,
                  properties: [
                    {
                      name: 'permissionType',
                      description: '类型 1：菜单 2：按钮',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'menuList',
                      description: '子菜单列表',
                      required: false,
                      type: 'array',
                      subTypes: null,
                      properties: [

                        {
                          name: 'componentPath',
                          description: '菜单路由',
                          required: false,
                          type: 'string',
                          subType: null,
                          properties: null,
                        },

                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'success',
          description: '业务响应是否成功',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'message',
          description: '业务响应信息',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
      ],
      tags: ['V1.0.0-用户信息', '用户信息'],
    },
  ],
  config: { comment: false, tsNotStrict: false, tsNotStrictInclude: [] },
  result: [
    {
      id: 'getUserInfoUsingGET',
      method: 'get',
      apiName: 'getAuthMUserGetUserInfo',
      path: '/auth/m/user/getUserInfo',
      basePath: undefined,
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
    },
  ],
};
const extractResponseKeys = {
  input: [
    {
      id: 'getReadPageListForAppUsingGET',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      title: '已阅公文列表（分页）（app端接口）',
      method: 'get',
      query: null,
      body: null,
      response: [
        {
          name: 'code',
          description: '业务响应状态码',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'data',
          description: '业务响应数据',
          required: false,
          type: 'array',
          subTypes: null,
          properties: [
            {
              name: 'urgencyId',
              description: '紧急程度id',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'odTypeName',
              description: '公文类型名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'restrictedDate',
              description: '限办日期 我的待办列表才会用到，其他用不到',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'documentNumber',
              description: '文号',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
          ],
        },
        {
          name: 'success',
          description: '业务响应是否成功',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'message',
          description: '业务响应信息',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
      ],
      tags: ['V1.0.0-公文中心、流转', '公文中心、流转'],
    },
  ],
  config: { comment: true, tsNotStrictInclude: ['res'], extractResponseKeys: ['data'] },
  result: [
    {
      id: 'getReadPageListForAppUsingGET',
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '已阅公文列表（分页）（app端接口）',
      headers: '',
      codes: {
        req: null,
        res: 'Array<AnonymousDto>',
        models: [
          {
            name: 'AnonymousDto',
            value: '{\n' +
              '/** 紧急程度id */\n' +
              'urgencyId: number,\n' +
              '/** 公文类型名称 */\n' +
              'odTypeName: string,\n' +
              '/** 限办日期 我的待办列表才会用到，其他用不到 */\n' +
              'restrictedDate: string,\n' +
              '/** 文号 */\n' +
              'documentNumber: string,\n' +
              '}',
          },
        ],
      },
    },
  ],
};
const extractResponseKeysBoundary = {
  input: [
    {
      id: 'getReadPageListForAppUsingGET',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      title: '已阅公文列表（分页）（app端接口）',
      method: 'get',
      query: null,
      body: null,
      response: [],
      tags: ['V1.0.0-公文中心、流转', '公文中心、流转'],
    },
  ],
  config: {comment: false, tsNotStrictInclude: ['res'], extractResponseKeys: ['data'] },
  result: [
    {
      id: 'getReadPageListForAppUsingGET',
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '已阅公文列表（分页）（app端接口）',
      headers: '',
      codes: {
        req: null,
        res: 'any',
        models: [],
      },
    },
  ]
};
const extractResponseKeysBoundaryUnMatch = {
  input: [
    {
      id: 'getReadPageListForAppUsingGET',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      title: '已阅公文列表（分页）（app端接口）',
      method: 'get',
      query: null,
      body: null,
      response: [
        {
          name: 'code',
          description: '业务响应状态码',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'data',
          description: '业务响应数据',
          required: false,
          type: 'array',
          subTypes: null,
          properties: [
            {
              name: 'urgencyId',
              description: '紧急程度id',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'odTypeName',
              description: '公文类型名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'restrictedDate',
              description: '限办日期 我的待办列表才会用到，其他用不到',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'documentNumber',
              description: '文号',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
          ],
        },
        {
          name: 'success',
          description: '业务响应是否成功',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'message',
          description: '业务响应信息',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
      ],
      tags: ['V1.0.0-公文中心、流转', '公文中心、流转'],
    },
  ],
  config: { comment: false, tsNotStrictInclude: ['res'], extractResponseKeys: ['data3'] },
  result: [
    {
      id: 'getReadPageListForAppUsingGET',
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '已阅公文列表（分页）（app端接口）',
      headers: '',
      codes: {
        req: null,
        res: '{code:number,data:Array<DataVO>,success:boolean,message:string}',
        models: [
          {
            name: 'DataVO',
            value: '{urgencyId:number,odTypeName:string,restrictedDate:string,documentNumber:string}',
          },
        ],
      },
    },
  ],
};
const responseIsStaticPropWithNoName = {
  input: [
    {
      id: 'getReadPageListForAppUsingGET',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      title: '已阅公文列表（分页）（app端接口）',
      method: 'get',
      query: null,
      body: null,
      response: [
        {
          name: 'code',
          description: '业务响应状态码',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'data',
          description: '业务响应数据',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'success',
          description: '业务响应是否成功',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'message',
          description: '业务响应信息',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
      ],
      tags: ['V1.0.0-公文中心、流转', '公文中心、流转'],
    },
  ],
  config: { comment: false, tsNotStrictInclude: [], extractResponseKeys: ['data'] },
  result: [
    {
      id: 'getReadPageListForAppUsingGET',
      method: 'get',
      apiName: 'getAuthMMyOfficialDocumentGetReadPageList',
      path: '/auth/m/myOfficialDocument/getReadPageList',
      basePath: undefined,
      title: '已阅公文列表（分页）（app端接口）',
      headers: '',
      codes: {
        req: null,
        res: 'boolean',
        models: [],
      },
    },
  ],
};
const samePropertiesDto = {
  input: [
    {
      id: 'getUserInfoUsingGET',
      path: '/auth/m/user/getUserInfo',
      title: '获取用户信息',
      method: 'get',
      query: null,
      body: null,
      response: [
        {
          name: 'code',
          description: '业务响应状态码',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'data',
          description: '业务响应数据',
          required: false,
          subTypes: null,
          properties: [
            {
              name: 'deviceType',
              description: '设备类型',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'orgName',
              description: '机构名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'dptId',
              description: '部门ID',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'dptName',
              description: '部门名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'orgDptInfoList',
              description: '父级部门ID',
              required: false,
              type: 'array',
              subTypes: null,
              properties: [],
            },
            {
              name: 'permissionInfo',
              description: '权限列表（包含按钮）',
              required: false,
              subTypes: null,
              properties: [
                {
                  name: 'menuList',
                  description: '功能菜单列表',
                  required: false,
                  type: 'array',
                  subTypes: null,
                  properties: [
                    {
                      name: 'hideInMenu',
                      description: '菜单是否隐藏',
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'permissionType',
                      description: '类型 1：菜单 2：按钮',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'subMenuList',
                      description: '子菜单列表',
                      required: false,
                      type: 'array',
                      subTypes: null,
                      properties: [
                        {
                          name: 'hideInMenu',
                          description: '菜单是否隐藏',
                          required: false,
                          type: 'boolean',
                          subType: null,
                          properties: null,
                        },
                        {
                          name: 'permissionType',
                          description: '类型 1：菜单 2：按钮',
                          required: false,
                          type: 'integer',
                          subType: null,
                          properties: null,
                        },
                        {
                          name: 'subMenuList',
                          description: '子菜单列表',
                          required: false,
                          type: 'array',
                          subTypes: null,
                          properties: [
                            {
                              name: 'hideInMenu',
                              description: '菜单是否隐藏',
                              required: false,
                              type: 'boolean',
                              subType: null,
                              properties: null,
                            },
                            {
                              name: 'permissionType',
                              description: '类型 1：菜单 2：按钮',
                              required: false,
                              type: 'integer',
                              subType: null,
                              properties: null,
                            },
                            {
                              name: 'componentPath',
                              description: '菜单路由',
                              required: false,
                              type: 'string',
                              subType: null,
                              properties: null,
                            },
                          ],
                        },
                        {
                          name: 'componentPath',
                          description: '菜单路由',
                          required: false,
                          type: 'string',
                          subType: null,
                          properties: null,
                        },
                      ],
                    },
                    {
                      name: 'componentPath',
                      description: '菜单路由',
                      required: false,
                      type: 'string',
                      subType: null,
                      properties: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'timestamp',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'username',
              description: '用户名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
          ],
        },
        {
          name: 'success',
          description: '业务响应是否成功',
          required: false,
          type: 'boolean',
          subType: null,
          properties: null,
        },
        {
          name: 'message',
          description: '业务响应信息',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
      ],
      tags: ['V1.0.0-用户信息', '用户信息'],
    },
  ],
  config: { comment: false, tsNotStrict: false, tsNotStrictInclude: [] },
  result: [
    {
      id: 'getUserInfoUsingGET',
      method: 'get',
      apiName: 'getAuthMUserGetUserInfo',
      path: '/auth/m/user/getUserInfo',
      basePath: undefined,
      title: '获取用户信息',
      headers: '',
      codes: {
        req: null,
        res: '{code?:number,data?:DataVO,success?:boolean,message?:string}',
        models: [
          {
            name: 'DataVO',
            value: '{deviceType?:number,orgName?:string,dptId?:number,dptName?:string,orgDptInfoList?:Array<OrgDptInfoListVO>,permissionInfo?:PermissionInfoVO,timestamp?:number,username?:string}',
          },
          {
            name: 'OrgDptInfoListVO',
            value: 'any'
          },
          {
            name: 'PermissionInfoVO',
            value: '{menuList?:Array<MenuListVO>}',
          },
          {
            name: 'MenuListVO',
            value: '{hideInMenu?:boolean,permissionType?:number,subMenuList?:Array<MenuListVO>,componentPath?:string}',
          },
        ],
      },
    },
  ],
};

// 模拟同名dto场景
module.exports = {
  normal,
  sameNameDto,
  extractResponseKeys,
  extractResponseKeysBoundary,
  extractResponseKeysBoundaryUnMatch,
  responseIsStaticPropWithNoName,
  samePropertiesDto,
};
