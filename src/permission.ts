/*
 * 全局权限检测
 * 包括1、路由的全局守卫
 */

import router from "./router";
import store from "./store";
import { loadFromLocal } from "@/common/local-storage";

// 路由全局前置守卫
const whiteList: string[] = ["/login"]; // 白名单
router.beforeEach((to, from, next) => {
  const getToken = localStorage.getItem("token");
  if (getToken) {
    // 有 token 访问页面，就跳到首页
    if (to.path === "/login") {
      
      next("/");
    } else {
      next();
    }
    // else {
    //   // 有token，没有 permissions // 权限
    //   // const permissions = loadFromLocal('permissions', '')
    //   next('/')
    // }
  } else {
    if (whiteList.includes(to.path)) {
      // 白名单，免密登录
      next();
    } else {
      // 否则就跳动登录页面
      next("/login");
    }
  }
});
