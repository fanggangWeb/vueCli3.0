import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { defaultRoute, newRoute } from './router.js'
const whiteList = ['/login'] // 不定向白名单
// console.log(defaultRoute.concat(newRoute))
router.addRoutes(defaultRoute.concat(newRoute))
// router.beforeEach((to, from, next) => {
// })
