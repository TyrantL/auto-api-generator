const base = {
  'servers': [
    { 'description': 'Inferred Url', 'url': 'http://letao.cnstrong.cn:80' },
  ],
  'basePath': 'letao-official-document-center',
  'openapi': '3.0.3',
  'info': { 'version': '1.0' },
  'tags': [
    { 'name': 'example', 'description': '示例控制器，可以删除' },
    {
      'name': 'example-remote-service',
      'description': 'Example Remote Service',
    },
    { 'name': 'init-service', 'description': 'Init Service' },
    { 'name': 'v1.0', 'description': '示例控制器，可以删除' },
    { 'name': '公文中心、流转', 'description': 'Document Center Controller' },
    { 'name': '公文审批', 'description': 'Workflow Controller' },
    {
      'name': '公文档案',
      'description': 'Official Document Library Controller',
    },
    { 'name': '公文管理', 'description': 'Official Document Controller' },
    { 'name': '公文管理--常用语', 'description': 'Common Phrases Controller' },
    {
      'name': '公文管理--草稿箱',
      'description': 'Official Document Draft Controller',
    },
    { 'name': '初始化信息', 'description': 'Init Controller' },
    { 'name': '基��设置', 'description': 'Base Config Info Controller' },
    {
      'name': '套红模板',
      'description': 'Red Chromatography Template Controller',
    },
    { 'name': '工作流配置', 'description': 'Wf Configuration Controller' },
    {
      'name': '收发文单位',
      'description': 'Sending Receiving Unit Controller',
    },
    { 'name': '收发文模板', 'description': 'Template Controller' },
    { 'name': '用户信息', 'description': 'User Controller' },
  ],
};

const case1 = {
  input: {
    ...base,
    'components': {
      'schemas': {
        'BaseConfigEditRequest': {
          'title': 'BaseConfigEditRequest',
          'type': 'object',
          'properties': {
            'configName': {
              'minLength': 0,
              'description': '名称',
              'type': 'string',
              'maxLength': 50,
            },
            'descriptionContent': {
              'minLength': 0,
              'description': '描述',
              'type': 'string',
              'maxLength': 100,
            },
            'dataType': {
              'format': 'int32',
              'description': '数据分类：1_收文类型；2_文件类型；3_公文文种；4_保密等级；5_紧急程度；6_单位分类；7_机构分组；8_去向选择；9_机构代字；10_归档年限；11_媒体类别；12_公开方式',
              'type': 'integer',
            },
            'id': { 'format': 'int64', 'description': 'id', 'type': 'integer' },
            'sort': {
              'format': 'int32',
              'description': '排序',
              'type': 'integer',
            },
          },
          'required': ['descriptionContent'],
        },
        '统一响应类«boolean»': {
          'title': '统一响应类«boolean»',
          'type': 'object',
          'properties': {
            'code': {
              'format': 'int32',
              'description': '业务响应状态码',
              'type': 'integer',
            },
            'data': {
              'description': '业务响应数据',
              'type': 'boolean',
              'example': false,
            },
            'success': {
              'description': '业务响应是否成功',
              'type': 'boolean',
              'example': false,
            },
            'message': { 'description': '业务响应信息', 'type': 'string' },
          },
        },
        '统一响应类«List«WfProcessNodeModel对象»»': {
          'title': '统一响应类«List«WfProcessNodeModel对象»»',
          'type': 'object',
          'properties': {
            'code': {
              'format': 'int32',
              'description': '业务响应状态码',
              'type': 'integer',
            },
            'data': {
              'description': '业务响应数据',
              'type': 'array',
              'items': { '$ref': '#/components/schemas/WfProcessNodeModel对象' },
            },
            'success': {
              'description': '业务响应是否成功',
              'type': 'boolean',
              'example': false,
            },
            'message': { 'description': '业务响应信息', 'type': 'string' },
          },
        },
        '统一响应类«DraftResponse»': {
          'title': '统一响应类«DraftResponse»',
          'type': 'object',
          'properties': {
            'code': {
              'format': 'int32',
              'description': '业务响应状态码',
              'type': 'integer',
            },
            'data': {
              'description': '业务响应数据',
              '$ref': '#/components/schemas/DraftResponse',
            },
            'success': {
              'description': '业务响应是否成功',
              'type': 'boolean',
              'example': false,
            },
            'message': { 'description': '业务响应信息', 'type': 'string' },
          },
        },
        'DraftResponse': {
          'title': 'DraftResponse',
          'type': 'object',
          'properties': {
            'mainBodyUrl': { 'description': '正文文档地址', 'type': 'string' },
            'modifiedOn': {
              'format': 'date-time',
              'description': '保存时间',
              'type': 'string',
            },
            'uniqueCode': { 'description': '草稿唯一标识码', 'type': 'string' },
            'templateName': { 'description': '公文模板名称', 'type': 'string' },
            'documentNumber': { 'description': '文号', 'type': 'string' },
            'extendJson': {
              'description': '稿纸模板中系统字段json（列表查询要用）',
              'type': 'string',
            },
            'manuscriptPaper': {
              'description': '稿纸（键值）',
              'type': 'string',
            },
            'id': {
              'format': 'int64',
              'description': '草稿id',
              'type': 'integer',
            },
            'odType': {
              'format': 'int32',
              'description': '公文类型：1_收文  2_发文',
              'type': 'integer',
            },
            'templateId': {
              'format': 'int64',
              'description': '公文模板ID',
              'type': 'integer',
            },
            'title': { 'description': '公文标题', 'type': 'string' },
          },
        },
        'WfProcessNodeModel对象': {
          'description': '公文审批流程节点',
          'title': 'WfProcessNodeModel对象',
          'type': 'object',
          'properties': {
            'nodeName': { 'description': '流程节点名称', 'type': 'string' },
            'approveType': {
              'format': 'int32',
              'description': '审批方式：1_依次审批  2_会签  3_或签',
              'type': 'integer',
            },
            'sysId': {
              'format': 'int64',
              'description': '系统ID',
              'type': 'integer',
            },
            'nodeUserList': {
              'type': 'array',
              'items': { '$ref': '#/components/schemas/WfApproveUserModel对象' },
            },
            'nodeType': {
              'format': 'int32',
              'description': '节点类型： 1_正常，2_分发',
              'type': 'integer',
            },
            'type': { 'format': 'int32', 'type': 'integer' },
            'createdOn': { 'format': 'date-time', 'type': 'string' },
            'hasCirculateUser': { 'type': 'boolean' },
            'orgId': {
              'format': 'int64',
              'description': '租户ID',
              'type': 'integer',
            },
            'current': { 'type': 'boolean' },
            'modifiedOn': { 'format': 'date-time', 'type': 'string' },
            'instanceId': {
              'format': 'int64',
              'description': '流程实例id',
              'type': 'integer',
            },
            'isDeleted': { 'type': 'boolean' },
            'createdBy': { 'format': 'int64', 'type': 'integer' },
            'hasConfigAssigness': { 'type': 'boolean' },
            'modifiedBy': { 'format': 'int64', 'type': 'integer' },
            'specialMark': {
              'description': '特殊节点标识： 0_非特殊（默认）  1_套红  2_盖章',
              'type': 'string',
            },
            'circulateUserList': {
              'type': 'array',
              'items': { '$ref': '#/components/schemas/Assignee' },
            },
            'id': { 'format': 'int64', 'type': 'integer' },
            'isLastApprover': { 'type': 'boolean' },
            'nodeId': { 'description': '流程节点ID', 'type': 'string' },
            'allowMultiplePeople': { 'type': 'boolean' },
            'approveState': {
              'format': 'int32',
              'description': '审批状态 1：待审批，2：退回，3：作废，4：撤销，5：归档',
              'type': 'integer',
            },
          },
        },
        'WfApproveUserModel对象': {
          'description': '公文审批节点人员',
          'title': 'WfApproveUserModel对象',
          'type': 'object',
          'properties': {
            'carbonCopyList': {
              'type': 'array',
              'items': {
                '$ref': '#/components/schemas/WfCarbonCopyInfoModel对象',
              },
            },
            'sysId': {
              'format': 'int64',
              'description': '系统ID',
              'type': 'integer',
            },
            'operationState': {
              'format': 'int32',
              'description': '操作状态（9:待阅，10:已阅，6:无需处理，1：待审批，2：退回，3：作废，4：撤销，5：归档）',
              'type': 'integer',
            },
            'approveLogList': {
              'type': 'array',
              'items': { '$ref': '#/components/schemas/WfApproveLogModel对象' },
            },
            'userName': { 'description': '审批人姓名', 'type': 'string' },
            'createdOn': { 'format': 'date-time', 'type': 'string' },
            'userId': {
              'format': 'int64',
              'description': '审批人userId',
              'type': 'integer',
            },
            'orgId': {
              'format': 'int64',
              'description': '租户id',
              'type': 'integer',
            },
            'modifiedOn': { 'format': 'date-time', 'type': 'string' },
            'isDeleted': { 'type': 'boolean' },
            'createdBy': { 'format': 'int64', 'type': 'integer' },
            'modifiedBy': { 'format': 'int64', 'type': 'integer' },
            'id': { 'format': 'int64', 'type': 'integer' },
            'processNodeId': {
              'format': 'int64',
              'description': '流程节点ID',
              'type': 'integer',
            },
          },
        },
        'WfApproveLogModel对象': {
          'description': '流程审批操作日志',
          'title': 'WfApproveLogModel对象',
          'type': 'object',
        },
        'WfCarbonCopyInfoModel对象': {
          'description': '审批抄送人信息',
          'title': 'WfCarbonCopyInfoModel对象',
          'type': 'object',
          'properties': {
            'sysId': {
              'format': 'int64',
              'description': '系统ID',
              'type': 'integer',
            },
            'isRead': {
              'description': '是否已读（0 未读  1已读）',
              'type': 'boolean',
              'example': false,
            },
            'userName': { 'description': '被抄送人姓名', 'type': 'string' },
            'createdOn': { 'format': 'date-time', 'type': 'string' },
            'userId': {
              'format': 'int64',
              'description': '被抄送人userId',
              'type': 'integer',
            },
            'orgId': {
              'format': 'int64',
              'description': '租户id',
              'type': 'integer',
            },
            'approveUserId': {
              'format': 'int64',
              'description': '流程节点ID',
              'type': 'integer',
            },
            'modifiedOn': { 'format': 'date-time', 'type': 'string' },
            'instanceId': {
              'format': 'int64',
              'description': '流程节点ID',
              'type': 'integer',
            },
            'isDeleted': { 'type': 'boolean' },
            'createdBy': { 'format': 'int64', 'type': 'integer' },
            'modifiedBy': { 'format': 'int64', 'type': 'integer' },
            'id': { 'format': 'int64', 'type': 'integer' },
          },
        },
      },
    },
    'paths': {
      '/auth/baseConfig/edit': {
        'post': {
          'summary': '编辑',
          'requestBody': {
            'content': {
              'application/json': {
                'schema': { '$ref': 'BaseConfigEditRequest' },
              },
            },
          },
          'operationId': 'editUsingPOST',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': { '$ref': '统一响应类«boolean»' },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V2.0.0-基础设置', '基础设置'],
        },
      },
      '/auth/wf/getNextNode': {
        'get': {
          'summary': '获取下一步流程节点信息',
          'operationId': 'getNextNodeUsingGET_1',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': {
                    '$ref': '#/components/schemas/统一响应类«List«WfProcessNodeModel对象»»',
                  },
                },
              },
            },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'parameters': [
            {
              'schema': { 'format': 'int64' },
              'in': 'query',
              'name': 'id',
              'description': '公文ID（派发时传值:收/发文模板ID）',
              'style': 'form',
              'required': true,
            },
            {
              'schema': { 'format': 'int32', 'type': 'integer' },
              'in': 'query',
              'name': 'nextType',
              'description': 'nextType： 1_派发;2_同意;3_回退',
              'style': 'form',
              'required': true,
            },
          ],
          'tags': ['V1.0.0-公文审批', '公文审批'],
        },
      },
      '/auth/officialDocumentDraft/getByUniqueCode/{odType}/{uniqueCode}': {
        'post': {
          'summary': '获取指定草稿内容',
          'operationId': 'getByUniqueCodeAndOdTypeUsingPOST',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': {
                    '$ref': '#/components/schemas/统一响应类«DraftResponse»',
                  },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'parameters': [
            {
              'schema': { 'format': 'int32', 'type': 'integer' },
              'allowReserved': false,
              'in': 'path',
              'name': 'odType',
              'description': '公文类型： 1_收文  2_发文',
              'style': 'simple',
              'required': true,
            },
            {
              'schema': { 'type': 'string' },
              'allowReserved': false,
              'in': 'path',
              'name': 'uniqueCode',
              'description': '草稿唯一编码',
              'style': 'simple',
              'required': true,
            },
          ],
          'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
        },
      },
    },
  },
  result: [
    {
      'path': '/auth/baseConfig/edit',
      'method': 'post',
      'summary': '编辑',
      'requestBody': {
        'content': {
          'application/json': {
            'schema': { '$ref': 'BaseConfigEditRequest' },
          },
        },
      },
      'operationId': 'editUsingPOST',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': { '$ref': '统一响应类«boolean»' },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
    {
      'path': '/auth/wf/getNextNode',
      'method': 'get',
      'summary': '获取下一步流程节点信息',
      'operationId': 'getNextNodeUsingGET_1',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': {
                '$ref': '#/components/schemas/统一响应类«List«WfProcessNodeModel对象»»',
              },
            },
          },
        },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'parameters': [
        {
          'schema': { 'format': 'int64' },
          'in': 'query',
          'name': 'id',
          'description': '公文ID（派发时传值:收/发文模板ID）',
          'style': 'form',
          'required': true,
        },
        {
          'schema': { 'format': 'int32', 'type': 'integer' },
          'in': 'query',
          'name': 'nextType',
          'description': 'nextType： 1_派发;2_同意;3_回退',
          'style': 'form',
          'required': true,
        },
      ],
      'tags': ['V1.0.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/officialDocumentDraft/getByUniqueCode/{odType}/{uniqueCode}',
      'method': 'post',
      'summary': '获取指定草稿内容',
      'operationId': 'getByUniqueCodeAndOdTypeUsingPOST',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': {
                '$ref': '#/components/schemas/统一响应类«DraftResponse»',
              },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'parameters': [
        {
          'schema': { 'format': 'int32', 'type': 'integer' },
          'allowReserved': false,
          'in': 'path',
          'name': 'odType',
          'description': '公文类型： 1_收文  2_发文',
          'style': 'simple',
          'required': true,
        },
        {
          'schema': { 'type': 'string' },
          'allowReserved': false,
          'in': 'path',
          'name': 'uniqueCode',
          'description': '草稿唯一编码',
          'style': 'simple',
          'required': true,
        },
      ],
      'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
    },
  ],
  standardResult: [
    {
      'id': 'editUsingPOST',
      'path': '/auth/baseConfig/edit',
      'title': '编辑',
      'method': 'post',
      'query': null,
      'body': [
        {
          'name': 'configName',
          'description': '名称',
          'required': false,
          'type': 'string',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'descriptionContent',
          'description': '描述',
          'required': true,
          'type': 'string',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'dataType',
          'description': '数据分类：1_收文类型；2_文件类型；3_公文文种；4_保密等级；5_紧急程度；6_单位分类；7_机构分组；8_去向选择；9_机构代字；10_归档年限；11_媒体类别；12_公开方式',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'id',
          'description': 'id',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'sort',
          'description': '排序',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
      ],
      'response': [
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
      'headersJson': 'application/json; charset=utf-8',
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
    {
      'path': '/auth/wf/getNextNode',
      'method': 'get',
      'title': '获取下一步流程节点信息',
      'id': 'getNextNodeUsingGET_1',
      'query': [
        {
          'name': 'id',
          'description': '公文ID（派发时传值:收/发文模板ID）',
          'required': true,
          'type': 'any',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'nextType',
          'description': 'nextType： 1_派发;2_同意;3_回退',
          'required': true,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
      ],
      'body': null,
      'response': [
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
          subType: null,
          properties: [
            {
              name: 'nodeName',
              description: '流程节点名称',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'approveType',
              description: '审批方式：1_依次审批  2_会签  3_或签',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'sysId',
              description: '系统ID',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'nodeUserList',
              description: undefined,
              required: false,
              type: 'array',
              subType: null,
              properties: [
                {
                  name: 'carbonCopyList',
                  description: undefined,
                  required: false,
                  type: 'array',
                  subType: null,
                  properties: [
                    {
                      name: 'sysId',
                      description: '系统ID',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'isRead',
                      description: '是否已读（0 未读  1已读）',
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'userName',
                      description: '被抄送人姓名',
                      required: false,
                      type: 'string',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'createdOn',
                      description: undefined,
                      required: false,
                      type: 'string',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'userId',
                      description: '被抄送人userId',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'orgId',
                      description: '租户id',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'approveUserId',
                      description: '流程节点ID',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'modifiedOn',
                      description: undefined,
                      required: false,
                      type: 'string',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'instanceId',
                      description: '流程节点ID',
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'isDeleted',
                      description: undefined,
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'createdBy',
                      description: undefined,
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'modifiedBy',
                      description: undefined,
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                    {
                      name: 'id',
                      description: undefined,
                      required: false,
                      type: 'integer',
                      subType: null,
                      properties: null,
                    },
                  ],
                },
                {
                  name: 'sysId',
                  description: '系统ID',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'operationState',
                  description: '操作状态（9:待阅，10:已阅，6:无需处理，1：待审批，2：退回，3：作废，4：撤销，5：归档）',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'approveLogList',
                  description: undefined,
                  required: false,
                  type: 'array',
                  subType: null,
                  properties: [],
                },
                {
                  name: 'userName',
                  description: '审批人姓名',
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'createdOn',
                  description: undefined,
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'userId',
                  description: '审批人userId',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'orgId',
                  description: '租户id',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'modifiedOn',
                  description: undefined,
                  required: false,
                  type: 'string',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'isDeleted',
                  description: undefined,
                  required: false,
                  type: 'boolean',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'createdBy',
                  description: undefined,
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'modifiedBy',
                  description: undefined,
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'id',
                  description: undefined,
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
                {
                  name: 'processNodeId',
                  description: '流程节点ID',
                  required: false,
                  type: 'integer',
                  subType: null,
                  properties: null,
                },
              ],
            },
            {
              name: 'nodeType',
              description: '节点类型： 1_正常，2_分发',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'type',
              description: undefined,
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'createdOn',
              description: undefined,
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'hasCirculateUser',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'orgId',
              description: '租户ID',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'current',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'modifiedOn',
              description: undefined,
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'instanceId',
              description: '流程实例id',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'isDeleted',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'createdBy',
              description: undefined,
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'hasConfigAssigness',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'modifiedBy',
              description: undefined,
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'specialMark',
              description: '特殊节点标识： 0_非特殊（默认）  1_套红  2_盖章',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'circulateUserList',
              description: undefined,
              required: false,
              type: 'array',
              subType: null,
              properties: [],
            },
            {
              name: 'id',
              description: undefined,
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'isLastApprover',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'nodeId',
              description: '流程节点ID',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'allowMultiplePeople',
              description: undefined,
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'approveState',
              description: '审批状态 1：待审批，2：退回，3：作废，4：撤销，5：归档',
              required: false,
              type: 'integer',
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
      'tags': ['V1.0.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/officialDocumentDraft/getByUniqueCode/{odType}/{uniqueCode}',
      'method': 'post',
      'title': '获取指定草稿内容',
      'id': 'getByUniqueCodeAndOdTypeUsingPOST',
      query: [
        {
          'name': 'odType',
          'description': '公文类型： 1_收文  2_发文',
          'required': true,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'uniqueCode',
          'description': '草稿唯一编码',
          'required': true,
          'type': 'string',
          'subType': null,
          'properties': null,
        },
      ],
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
          type: undefined,
          subType: null,
          properties: [
            {
              name: 'mainBodyUrl',
              description: '正文文档地址',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'modifiedOn',
              description: '保存时间',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'uniqueCode',
              description: '草稿唯一标识码',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'templateName',
              description: '公文模板名称',
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
              name: 'extendJson',
              description: '稿纸模板中系统字段json（列表查询要用）',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'manuscriptPaper',
              description: '稿纸（键值）',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'id',
              description: '草稿id',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'odType',
              description: '公文类型：1_收文  2_发文',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
            {
              name: 'templateId',
              description: '公文模板ID',
              required: false,
              type: 'integer',
              subType: null,
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
      'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
    },
  ],
};

const circularReferenceObject = [];
circularReferenceObject.push({
  name: 'hideInMenu',
  description: '菜单是否隐藏',
  required: false,
  type: 'boolean',
  subType: null,
  properties: null,
}, {
  name: 'subMenuList',
  description: '子菜单列表',
  required: false,
  type: 'array',
  subType: null,
  properties: circularReferenceObject,
});

const case2 = {
  input: {
    ...base,
    'components': {
      'schemas': {
        'BaseConfigEditRequest': {
          'title': 'BaseConfigEditRequest',
          'type': 'object',
          'properties': {
            'configName': {
              'minLength': 0,
              'description': '名称',
              'type': 'string',
              'maxLength': 50,
            },
            'descriptionContent': {
              'minLength': 0,
              'description': '描述',
              'type': 'string',
              'maxLength': 100,
            },
            'dataType': {
              'format': 'int32',
              'description': '数据分类：1_收文类型；2_文件类型；3_公文文种；4_保密等级；5_紧急程度；6_单位分类；7_机构分组；8_去向选择；9_机构代字；10_归档年限；11_媒体类别；12_公开方式',
              'type': 'integer',
            },
            'id': { 'format': 'int64', 'description': 'id', 'type': 'integer' },
            'sort': {
              'format': 'int32',
              'description': '排序',
              'type': 'integer',
            },
          },
        },
        'DraftDelRequest': {
          'title': 'DraftDelRequest',
          'type': 'object',
          'properties': {
            'idList': {
              'description': 'id列表',
              'type': 'array',
              'items': { 'format': 'int64', 'type': 'integer' },
            },
          },
        },
        '统一响应类«boolean»': {
          'title': '统一响应类«boolean»',
          'type': 'object',
          'properties': {
            'code': {
              'format': 'int32',
              'description': '业务响应状态码',
              'type': 'integer',
            },
            'data': {
              'description': '业务响应数据',
              'type': 'boolean',
              'example': false,
            },
            'success': {
              'description': '业务响应是否成功',
              'type': 'boolean',
              'example': false,
            },
            'message': { 'description': '业务响应信息', 'type': 'string' },
          },
        },
        '加签请求对象': {
          'title': '加签请求对象',
          'type': 'object',
          'properties': {
            'userInfoList': {
              'description': '加签人员信息列表',
              'type': 'array',
              'items': {
                '$ref': '#/components/schemas/公文审批人员相关的请求对象',
              },
            },
            'id': {
              'format': 'int64',
              'description': '公文ID',
              'type': 'integer',
            },
            'odType': {
              'format': 'int32',
              'description': 'odType 公文类型： 1_收文  2_发文',
              'type': 'integer',
            },
            'wfVersion': { 'description': '工作流版本', 'type': 'string' },
            'nodeId': {
              'format': 'int64',
              'description': '节点ID',
              'type': 'integer',
            },
          },
        },
        '公文审批人员相关的请求对象': {
          'title': '公文审批人员相关的请求对象',
          'type': 'object',
          'properties': {
            'userName': { 'description': '人员姓名', 'type': 'string' },
            'userId': {
              'format': 'int64',
              'description': '人员userID',
              'type': 'integer',
            },
          },
        },
        '公文同意、退回请求对象': {
          'title': '公文同意、退回请求对象',
          'type': 'object',
          'properties': {
            'nodeInfo': {
              'description': '下个审批流程节点信息',
              '$ref': '#/components/schemas/公文审批下个审批流程节点信息请求对象',
            },
            'odType': {
              'format': 'int32',
              'description': 'odType 公文类型： 1_收文  2_发文',
              'type': 'integer',
            },
          },
        },
        '公文审批下个审批流程节点信息请求对象': {
          'title': '公文审批下个审批流程节点信息请求对象',
          'type': 'object',
          'properties': {
            'isSaveCommonPhrases': {
              'description': '是否保存为常用语',
              'type': 'boolean',
              'example': false,
            },
            'approveAction': { 'description': '审批意见', 'type': 'string' },
            'specialMark': { 'description': '特殊节点标识', 'type': 'string' },
            'nodeId': { 'description': '下一步操作节点ID', 'type': 'string' },
          },
        },
        '统一响应类«UserInfoResponse»': {
          'title': '统一响应类«UserInfoResponse»',
          'type': 'object',
          'properties': {
            'code': {
              'format': 'int32',
              'description': '业务响应状态码',
              'type': 'integer',
            },
            'data': {
              'description': '业务响应数据',
              '$ref': '#/components/schemas/UserInfoResponse',
            },
            'success': {
              'description': '业务响应是否成功',
              'type': 'boolean',
              'example': false,
            },
            'message': { 'description': '业务响应信息', 'type': 'string' },
          },
        },
        'UserInfoResponse': {
          'title': 'UserInfoResponse',
          'type': 'object',
          'properties': {
            'permissionInfo': {
              'description': '权限列表（包含按钮）',
              '$ref': '#/components/schemas/用户功能权限列表响应结果',
            },
            'timestamp': { 'format': 'int64', 'type': 'integer' },
            'username': { 'description': '用户名称', 'type': 'string' },
          },
        },
        '用户功能权限列表响应结果': {
          'title': '用户功能权限列表响应结果',
          'type': 'object',
          'properties': {
            'menuList': {
              'description': '功能菜单列表',
              'type': 'array',
              'items': { '$ref': '#/components/schemas/功能权限Response' },
            },
          },
        },
        '功能权限Response': {
          'title': '功能权限Response',
          'type': 'object',
          'properties': {
            'hideInMenu': {
              'description': '菜单是否隐藏',
              'type': 'boolean',
              'example': false,
            },
            'subMenuList': {
              'description': '子菜单列表',
              'type': 'array',
              'items': { '$ref': '#/components/schemas/功能权限Response' },
            },
          },
        },
      },
    },
    'paths': {
      '/auth/baseConfig/edit': {
        'post': {
          'summary': '编辑',
          'requestBody': {
            'content': {
              'application/x-www-form-urlencoded': {
                'schema': { '$ref': '#/components/schemas/BaseConfigEditRequest' },
              },
            },
          },
          'operationId': 'editUsingPOST',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V2.0.0-基础设置', '基础设置'],
        },
      },
      '/auth/officialDocumentDraft/batchDelete': {
        'post': {
          'summary': '批量删除草稿',
          'requestBody': {
            'content': {
              'application/json': {
                'schema': { '$ref': '#/components/schemas/DraftDelRequest' },
              },
            },
          },
          'operationId': 'batchDeleteUsingPOST_1',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
        },
      },
      '/auth/wf/addSign': {
        'post': {
          'summary': '加签操作',
          'requestBody': {
            'content': {
              'application/json': {
                'schema': { '$ref': '#/components/schemas/加签请求对象' },
              },
            },
          },
          'operationId': 'addSignUsingPOST_1',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V1.1.0-公文审批', '公文审批'],
        },
      },
      '/auth/m/wf/back': {
        'post': {
          'summary': '退回操作',
          'requestBody': {
            'content': {
              'application/json': {
                'schema': {
                  '$ref': '#/components/schemas/公文同意、退回请求对象',
                },
              },
            },
          },
          'operationId': 'backUsingPOST',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
                },
              },
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V1.0.0-公文审批', '公文审批'],
        },
      },
      '/auth/m/user/getUserInfo': {
        'get': {
          'summary': '获取用户信息',
          'operationId': 'getUserInfoUsingGET',
          'responses': {
            '200': {
              'description': 'OK',
              'content': {
                '*/*': {
                  'schema': {
                    '$ref': '#/components/schemas/统一响应类«UserInfoResponse»',
                  },
                },
              },
            },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V1.0.0-用户信息', '用户信息'],
        },
      },
    },
  },
  result: [
    {
      'path': '/auth/baseConfig/edit',
      'method': 'post',
      'summary': '编辑',
      'requestBody': {
        'content': {
          'application/x-www-form-urlencoded': {
            'schema': { '$ref': '#/components/schemas/BaseConfigEditRequest' },
          },
        },
      },
      'operationId': 'editUsingPOST',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
    {
      'path': '/auth/officialDocumentDraft/batchDelete',
      'method': 'post',
      'summary': '批量删除草稿',
      'requestBody': {
        'content': {
          'application/json': {
            'schema': { '$ref': '#/components/schemas/DraftDelRequest' },
          },
        },
      },
      'operationId': 'batchDeleteUsingPOST_1',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
    },
    {
      'path': '/auth/wf/addSign',
      'method': 'post',
      'summary': '加签操作',
      'requestBody': {
        'content': {
          'application/json': {
            'schema': { '$ref': '#/components/schemas/加签请求对象' },
          },
        },
      },
      'operationId': 'addSignUsingPOST_1',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V1.1.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/m/wf/back',
      'method': 'post',
      'summary': '退回操作',
      'requestBody': {
        'content': {
          'application/json': {
            'schema': {
              '$ref': '#/components/schemas/公文同意、退回请求对象',
            },
          },
        },
      },
      'operationId': 'backUsingPOST',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': { '$ref': '#/components/schemas/统一响应类«boolean»' },
            },
          },
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V1.0.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/m/user/getUserInfo',
      'method': 'get',
      'summary': '获取用户信息',
      'operationId': 'getUserInfoUsingGET',
      'responses': {
        '200': {
          'description': 'OK',
          'content': {
            '*/*': {
              'schema': {
                '$ref': '#/components/schemas/统一响应类«UserInfoResponse»',
              },
            },
          },
        },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V1.0.0-用户信息', '用户信息'],
    },
  ],
  standardResult: [
    {
      'id': 'editUsingPOST',
      'path': '/auth/baseConfig/edit',
      'title': '编辑',
      'method': 'post',
      'query': null,
      'body': [
        {
          'name': 'configName',
          'description': '名称',
          'required': false,
          'type': 'string',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'descriptionContent',
          'description': '描述',
          'required': false,
          'type': 'string',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'dataType',
          'description': '数据分类：1_收文类型；2_文件类型；3_公文文种；4_保密等级；5_紧急程度；6_单位分类；7_机构分组；8_去向选择；9_机构代字；10_归档年限；11_媒体类别；12_公开方式',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'id',
          'description': 'id',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
        {
          'name': 'sort',
          'description': '排序',
          'required': false,
          'type': 'integer',
          'subType': null,
          'properties': null,
        },
      ],
      'response': [
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
      'headersJson': 'application/x-www-form-urlencoded',
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
    {
      'id': 'batchDeleteUsingPOST_1',
      'path': '/auth/officialDocumentDraft/batchDelete',
      'method': 'post',
      'title': '批量删除草稿',
      'query': null,
      'body': [
        {
          name: 'idList',
          description: 'id列表',
          required: false,
          type: 'array',
          subType: 'integer',
          properties: null,
        },
      ],
      'response': [
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
      'headersJson': 'application/json; charset=utf-8',
      'tags': ['V1.4.0-公文草稿箱', '公文管理--草稿箱'],
    },
    {
      'path': '/auth/wf/addSign',
      'method': 'post',
      'title': '加签操作',
      'id': 'addSignUsingPOST_1',
      'query': null,
      'body': [
        {
          name: 'userInfoList',
          description: '加签人员信息列表',
          required: false,
          type: 'array',
          subType: null,
          properties: [
            {
              name: 'userName',
              description: '人员姓名',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'userId',
              description: '人员userID',
              required: false,
              type: 'integer',
              subType: null,
              properties: null,
            },
          ],
        },
        {
          name: 'id',
          description: '公文ID',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'odType',
          description: 'odType 公文类型： 1_收文  2_发文',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
        {
          name: 'wfVersion',
          description: '工作流版本',
          required: false,
          type: 'string',
          subType: null,
          properties: null,
        },
        {
          name: 'nodeId',
          description: '节点ID',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
      ],
      'response': [
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
      'headersJson': 'application/json; charset=utf-8',
      'tags': ['V1.1.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/m/wf/back',
      'method': 'post',
      'title': '退回操作',
      'id': 'backUsingPOST',
      'query': null,
      'body': [
        {
          name: 'nodeInfo',
          description: '下个审批流程节点信息',
          required: false,
          type: undefined,
          subType: null,
          properties: [
            {
              name: 'isSaveCommonPhrases',
              description: '是否保存为常用语',
              required: false,
              type: 'boolean',
              subType: null,
              properties: null,
            },
            {
              name: 'approveAction',
              description: '审批意见',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'specialMark',
              description: '特殊节点标识',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
            {
              name: 'nodeId',
              description: '下一步操作节点ID',
              required: false,
              type: 'string',
              subType: null,
              properties: null,
            },
          ],
        },
        {
          name: 'odType',
          description: 'odType 公文类型： 1_收文  2_发文',
          required: false,
          type: 'integer',
          subType: null,
          properties: null,
        },
      ],
      'response': [
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
      'headersJson': 'application/json; charset=utf-8',
      'tags': ['V1.0.0-公文审批', '公文审批'],
    },
    {
      'path': '/auth/m/user/getUserInfo',
      'method': 'get',
      'title': '获取用户信息',
      'id': 'getUserInfoUsingGET',
      'query': null,
      'body': null,
      'response': [
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
          type: undefined,
          subType: null,
          properties: [
            {
              name: 'permissionInfo',
              description: '权限列表（包含按钮）',
              required: false,
              type: undefined,
              subType: null,
              properties: [
                {
                  name: 'menuList',
                  description: '功能菜单列表',
                  required: false,
                  type: 'array',
                  subType: null,
                  properties: [
                    {
                      name: 'hideInMenu',
                      description: '菜单是否隐藏',
                      required: false,
                      type: 'boolean',
                      subType: null,
                      properties: null,
                    }, {
                      name: 'subMenuList',
                      description: '子菜单列表',
                      required: false,
                      type: 'array',
                      subType: null,
                      properties: circularReferenceObject,
                    }
                  ],
                },
              ],
            },
            {
              name: 'timestamp',
              description: undefined,
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
      'tags': ['V1.0.0-用户信息', '用户信息'],
    },
  ],
};

const case3 = {
  input: {
    ...base,
    'components': {},
    'paths': {
      '/auth/baseConfig/edit': {
        'post': {
          'summary': '编辑',
          'requestBody': {
            'content': {
              'application/x-www-form-urlencoded': {
                'schema': { '$ref': '#/components/schemas/BaseConfigEditRequest' },
              },
            },
          },
          'operationId': 'editUsingPOST',
          'responses': {
            '200': {
              'description': 'OK',
              'content': null,
            },
            '201': { 'description': 'Created' },
            '401': { 'description': 'Unauthorized' },
            '403': { 'description': 'Forbidden' },
            '404': { 'description': 'Not Found' },
          },
          'tags': ['V2.0.0-基础设置', '基础设置'],
        },
      },
    },
  },
  result: [
    {
      'path': '/auth/baseConfig/edit',
      'method': 'post',
      'summary': '编辑',
      'requestBody': {
        'content': {
          'application/x-www-form-urlencoded': {
            'schema': { '$ref': '#/components/schemas/BaseConfigEditRequest' },
          },
        },
      },
      'operationId': 'editUsingPOST',
      'responses': {
        '200': {
          'description': 'OK',
          'content': null,
        },
        '201': { 'description': 'Created' },
        '401': { 'description': 'Unauthorized' },
        '403': { 'description': 'Forbidden' },
        '404': { 'description': 'Not Found' },
      },
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
  ],
  standardResult: [
    {
      'id': 'editUsingPOST',
      'path': '/auth/baseConfig/edit',
      'title': '编辑',
      'method': 'post',
      'query': null,
      'body': null,
      'response': null,
      'headersJson': 'application/x-www-form-urlencoded',
      'tags': ['V2.0.0-基础设置', '基础设置'],
    },
  ],
};

const case4 = {
  input: {
    ...base,
    'components': {},
  },
  result: [],
  standardResult: [],
};

module.exports = {
  case1,
  case2,
  case3,
  case4,
};
