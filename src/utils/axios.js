import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import router from '@/router'
import defaultConfig from '@/config'
import { getToken, setToken, removeToken } from '@/common/auth'
import { Message } from 'element-ui'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl  // _api 接口
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: process.env.NODE_ENV === 'production' ? 'https://dev2.hse365.cc' : this.baseUrl,  // 区分开发还是生产环境
      transformRequest: [function (data) {
        return Qs.stringify(data)
      }],
      paramsSerializer: function (params) {
        return Qs.stringify(params)
      },
      headers: {
        // 'Content-Type': 'application/json/;charset=UTF-8',
        // "Content-Type": "application/json",
        // 'Authorization': localStorage.getItem('token'),
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type':'application/x-www-form-urlencoded',
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // 处理一些事情
      store.dispatch('loading', true)
    }
  }
  interceptors(instance, url) {   // 请求头  地址
    // 请求拦截
    // console.log(url)  // 每次调用都执行
    instance.interceptors.request.use(config => {
      // 添加全局的loading
      if (!Object.keys(this.queue).length) {  // true
        // 处理一些事情
        if (defaultConfig.hideModal.indexOf(url) <= 0) {  // 不存在 或者是 下标0 的
          store.dispatch('loading', true)
        }
      }
      // token的一些处理, 带 token  到头部中
      // let token = localStorage.getItem('token')
      let token = getToken('token')
      if (token) {
        config.headers.common['token'] = token
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      getToken('token')
      // 关于每次请求的token带入// ①10010 token过期（30天） ②10011 token无效
      // if(res.data.code===10010 || res.data.code===10011){
      //   localStorage.removeItem('token');
      //   router.replace({path:'/'});
      // }else if(res.data.token){ // 判断token是否存在，如果存在说明需要更新token
      //   localStorage.setItem('token',res.data.token); // 覆盖原来的token(默认一天刷新一次)
      // }
      if (res.data.code === 10001 || res.data.code === 10002) {
        // localStorage.removeItem('token')
        removeToken('token')
        // console.log(router.history.current.path)
        if(router.history.current.path === '/login') {

        }else {
          router.replace({ path: '/login' })
        }
      }else if(res.headers.new_token) {
        // 更新token
        setToken(res.headers.new_token)
      }
      this.destroy(url)
      store.dispatch('loading', false)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      if(error.response.status >= 500) {
        Message.error('网络连接失败！')
      }else if(error.response.status === 401) {
        removeToken('token')
        router.replace({ path: '/login' })
      }else if(error.response.status === 404) {
        router.replace({ path: '/404' })
      }else{
        Message.error(error.response.data.msg)
      }
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create({  // 请求时长
      timeout: 15000
    })
    // options 是请求地址，例如："/_api/admin/picture/create"
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    options = Object.assign(this.getInsideConfig(), options)    // 合并两个对象
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'  // 请求头  enctype="multipart/form-data"
    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;multipart/form-data'
    instance.defaults.headers.post['enctype'] = 'multipart/form-data'
    this.interceptors(instance, options.url)  // (拦截, 请求地址)
    return instance(options)
  }
}
export default HttpRequest
