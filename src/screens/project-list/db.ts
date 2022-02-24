export const users = [
  {
    id: 1,
    name: "高修文",
  },
  {
    id: 2,
    name: "熊天成",
  },
  {
    id: 3,
    name: "郑华",
  },
  {
    id: 4,
    name: "王文静",
  },
];
export const projects = [
  {
    id: 1,
    name: "骑手管理",
    personId: 1,
    organization: "外卖组",
    pin: true,
    created: 1604989757139,
  },
  {
    id: 2,
    name: "团购 APP",
    personId: 2,
    organization: "团购组",
    pin: true,
    created: 1604989757139,
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 2,
    organization: "物料组",
    pin: false,
    created: 1546300800000,
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 3,
    organization: "总部",
    pin: false,
    created: 1604980000011,
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "外卖组",
    pin: false,
    created: 1546900800000,
  },
];

export const kanbans = [
  {
    id: 1,
    name: "待完成",
    projectId: 1,
  },
  {
    id: 2,
    name: "未完成",
    projectId: 1,
  },
  {
    id: 3,
    name: "开发中",
    projectId: 1,
  },
];

export const tasks = [
  {
    id: 1,
    name: "登陆注册页面开发",
    processorId: 1,
    projectId: 1,
    epicId: 1,
    kanbanId: 1,
    typeId: 1,
    note: "",
  },
  {
    id: 2,
    name: "单元测试",
    processorId: 1,
    projectId: 1,
    epicId: 1,
    kanbanId: 1,
    typeId: 1,
    note: "",
  },
  {
    id: 3,
    name: "管理登陆界面开发",
    processorId: 1,
    projectId: 1,
    epicId: 1,
    kanbanId: 2,
    typeId: 1,
    note: "",
  },
  {
    id: 4,
    name: "性能优化",
    processorId: 1,
    projectId: 1,
    epicId: 1,
    kanbanId: 2,
    typeId: 1,
    note: "",
  },
  {
    id: 5,
    name: "自测",
    processorId: 1,
    projectId: 1,
    epicId: 1,
    kanbanId: 3,
    typeId: 1,
    note: "",
  },
];
