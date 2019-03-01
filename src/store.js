import Vue from "vue";
import Vuex from "vuex";
import { defaultRoute, newRoute } from './router.js'
function set (key, val) {
  sessionStorage.setItem(key, val)
}
function get (key, val) {
  sessionStorage.getItem(key, val)
}
Vue.use(Vuex);
console.log(defaultRoute)
export default new Vuex.Store({
  state: {
    router: defaultRoute
  },
  getters: {},
  mutations: {},
  actions: {}
});
