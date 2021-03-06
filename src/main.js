import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import * as msg from "./utils/message"
import "babel-polyfill"
import "element-ui/lib/theme-chalk/index.css"
import "./registerServiceWorker"
import "./assets/css/index.css"
import "./permission"
import echarts from 'echarts'
import $ from 'jquery'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
// 自定义封装消息提示框
Object.keys(msg).forEach(key => {
  Vue.prototype[key] = msg[key]
})
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
