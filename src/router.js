import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

export const defaultRoute =  [
  {
    path: "/",
    name: "login",
    component: () => import('./views/login/login.vue') 
  },
  {
    path: 'home',
    name: "home",
    component: () => import('./views/home/home.vue') 
  }
]

export default new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes: defaultRoute
})