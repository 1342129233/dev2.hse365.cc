import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueWechatTitle from 'vue-wechat-title'  // 需要编写 xx.d.ts 文件
// Vue.use(VueWechatTitle)
// 按需引入 View UI
import "@/plugins/vant";
Vue.config.productionTip = false;

// 全局权限检查
import "./permission";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
