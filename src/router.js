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
    path: 'home',
    name: "home",
    component: () => import('./views/home/home.vue') 
  }
]
console.log(store)
export default new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes:defaultRoute
})