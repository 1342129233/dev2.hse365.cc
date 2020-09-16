import axios from "axios";
import Qs from "qs";
import store from "@/store";
import router from "@/router";
// import defaultConfig from '@/config'  // 一天
// import { getToken, setToken, removeToken } from '@/common/auth'
import { Notify } from "vant";

class HttpRequest {
  public queue: any;
  public baseUrl: any;
  constructor(baseUrl: any) {
    this.baseUrl = baseUrl; // _api 接口
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      // baseURL: process.env.NODE_ENV === 'production' ? 'https://dev2.hse365.cc' : this.baseUrl,  // 区分开发还是生产环境
      baseURL: "https://dev2.hse365.cc",
      transformRequest: [
        function(data: any) {
          return Qs.stringify(data);
        }
      ],
      paramsSerializer: function(params: any) {
        return Qs.stringify(params);
      },
      headers: {
        // 'Content-Type': 'application/json/charset=UTF-8',
        // "Content-Type": "application/json",
        // 'Authorization': localStorage.getItem('token'),
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type':'application/x-www-form-urlencoded',
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    };
    return config;
  }
  destroy(url: any) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // 处理一些事情
      // store.dispatch("loading", true)
    }
  }
  interceptors(instance: any, url: any) {
    // 请求头  地址
    // 请求拦截
    // console.log(url)  // 每次调用都执行
    instance.interceptors.request.use(
      (config: any) => {
        // 添加全局的loading
        // if (!Object.keys(this.queue).length) {
        // true
        // 处理一些事情
        // if (defaultConfig.hideModal.indexOf(url) <= 0) {  // 不存在 或者是 下标0 的
        //   store.dispatch('loading', true)
        // }
        // }
        // token的一些处理, 带 token  到头部中
        const token = localStorage.getItem("token");
        // let token = getToken('token')
        if (token) {
          config.headers.common["token"] = token;
        }
        this.queue[url] = true;

        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res: any) => {
        // getToken('token')
        const token = localStorage.getItem("token");
        if (res.data.code === 10001 || res.data.code === 10002) {
          localStorage.removeItem("token");
          // removeToken('token')
          if (router.currentRoute.path === "/login") {
          } else {
            router.replace({ path: "/login" });
          }
        } else if (res.headers.new_token) {
          // 更新token
          // setToken(res.headers.new_token)
          localStorage.setItem("token", res.headers.new_token);
        }
        // this.destroy(url)
        // store.dispatch("loading", false)
        const { data, status } = res;
        return { data, status };
      },
      (error: any) => {
        // this.destroy(url)
        if (error.response.status >= 500) {
          Notify({ type: "warning", message: "网络连接失败！" });
        } else if (error.response.status === 401) {
          // removeToken('token')
          Notify({ type: "warning", message: "请从新登陆！" });
          router.replace({ path: "/login" });
        } else if (error.response.status === 404) {
          router.replace({ path: "/404" });
        } else {
          Notify({ type: "warning", message: error.response.data.msg });
        }
        return Promise.reject(error);
      }
    );
  }
  request(options: any) {
    const instance = axios.create({
      // 请求时长
      timeout: 15000
    });
    // options 是请求地址，例如："/_api/admin/picture/create"
    instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    options = Object.assign(this.getInsideConfig(), options); // 合并两个对象
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'  // 请求头  enctype="multipart/form-data"
    // instance.defaults.headers.post["Content-Type"] =
    //   "application/x-www-form-urlencodedmultipart/form-data";
    instance.defaults.headers.post["enctype"] = "multipart/form-data";
    this.interceptors(instance, options.url); // (拦截, 请求地址)
    return instance(options);
  }
}
export default HttpRequest;
