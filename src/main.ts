import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 按需引入 View UI
import "@/plugins/vant";
import { HttpService } from "./unils/http";
Vue.config.productionTip = false;

Vue.prototype.$httpService = new HttpService(); // 挂载服务

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
