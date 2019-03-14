import Vue from "vue"
import Router from "vue-router"
import store from './store'
Vue.use(Router)
export const defaultRoute =  [
  {
    path: "/",
    name: "login",
    component: () => import('./views/login/login.vue') 
  }
]
export const newRoute =  [
  {
    path: "/home", // 首页之下分二级路由
    name: "home",
    component: () => import("./views/home/home.vue"),
    children: [
      {
        path: "risk",  // 二级菜单 风险管理
        name: "risk",
        component: () => import("./views/risk/index.vue"),
        children: [
          {
            path: "/", // 风险管理 三级菜单：信息摘要
            name: "info",
            component: () => import("./views/info/index.vue")
          },
          {
            path: "riskidentify", // 风险管理 三级菜单：风险辨识
            name: "riskidentify",
            component: () => import("./views/riskidentify/index.vue")
          },
          {
            path: "riskassessment", // 风险管理 三级菜单：风险评估
            name: "riskassessment",
            component: () => import("./views/riskassessment/index.vue")
          },
          {
            path: "file", // 风险管理 三级菜单：归档
            name: "file",
            component: () => import("./views/file/index.vue")
          },
          {
            path: "riskoverall", // 风险管理 三级菜单：桥体总体风险
            name: "riskoverall",
            component: () => import("./views/riskoverall/index.vue") 
          },
          {
            path: "riskstatistics", // 风险管理 风险情况统计
            name: "riskstatistics",
            component: () => import("./views/riskstatistics/index.vue")
          },
          {
            path: "fileDetail", // 风险管理 三级菜单：归档详情
            name: "fileDetail",
            component: () => import("./views/fileDetail/index.vue")
          },
          {
            path: "historyDelete", // 风险管理 三级菜单：归档详情
            name: "historyDelete",
            component: () => import("./views/historyDelete/index.vue")
          }
        ]
      },
      {
        path: "emergency", // 应急指挥
        name: "emergency",
        component: () => import("./views/emergency/index.vue"),
        children: [
          {
            path: "/", // 应急指挥 三级菜单：应急首页
            name: "emergencyhome",
            component: () => import("./views/emergencyhome/index.vue")
          },
          {
            path: "eventpublish", // 应急指挥 三级菜单：事件发布
            name: "eventpublish",
            component: () => import("./views/eventpublish/index.vue")
          },
          {
            path: "eventHandle", // 应急指挥 三级菜单：事件处置
            name: "eventHandle",
            component: () => import("./views/eventHandle/index.vue")
          },
          {
            path: "command", // 应急指挥 三级菜单：指挥调度
            name: "command",
            component: () => import("./views/command/index.vue")
          },
          {
            path: "commandCenter", // 应急指挥 三级菜单：指挥中心
            name: "commandCenter",
            component: () => import("./views/commandCenter/index.vue")
          },
          {
            path: "drill", // 应急指挥 三级菜单：应急演练
            name: "drill",
            component: () => import("./views/drill/index.vue"),
            children: [
              {
                path: "/", // 应急指挥 三级菜单 应急演练 四级路由 应急计划
                name: "drillplan",
                component: () => import("./views/drill/drillplan/index.vue")
              },
              {
                path: "traincourse", // 应急指挥 三级菜单 应急演练 四级路由 培训课程
                name: "traincourse",
                component: () => import("./views/drill/traincourse/index.vue")
              },
              {
                path: "mockdrill", // 应急指挥 三级菜单 应急演练 四级路由 模拟演练
                name: "mockdrill",
                component: () => import("./views/drill/mockdrill/index.vue")
              },
              {
                path: "actualdrill", // 应急指挥 三级菜单 应急演练 四级路由 实战演练
                name: "actualdrill",
                component: () => import("./views/drill/actualdrill/index.vue")
              }
            ]
          }
        ]
      }
    ]
  }
]
export default new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes: defaultRoute
})