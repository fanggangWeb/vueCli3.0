import Vue from "vue";
import Vuex from "vuex";
function set (key, val) {
  sessionStorage.setItem(key, val)
}
function get (key, val) {
  sessionStorage.getItem(key, val)
}
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    riskSourceId: get("riskSourceId"), // 风险源id
  },
  getters: {},
  mutations: {
    setriskSourceId (state, data) {
      state.riskSourceId = data
      set('riskSourceId', data)
    },
  },
  actions: {}
});
