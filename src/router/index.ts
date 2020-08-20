import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import Fail from "../views/fail/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页"
    },
    component: Home
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "消息"
    },
    component: resolve => require(["@/views/news/index.vue"], resolve)
  },
  {
    path: "/enterprise",
    name: "Enterprise",
    meta: {
      title: "企业"
    },
    component: resolve => require(["@/views/enterprise/index.vue"], resolve)
  },
  {
    path: "/circle",
    name: "Circle",
    meta: {
      title: "圈子"
    },
    component: resolve => require(["@/views/circle/index.vue"], resolve)
  },
  {
    path: "/my",
    name: "My",
    meta: {
      title: "我的"
    },
    component: resolve => require(["@/views/my/index.vue"], resolve)
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: Login
  },
  {
    path: "/fail",
    name: "Fail",
    meta: {
      title: "404"
    },
    component: Fail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
