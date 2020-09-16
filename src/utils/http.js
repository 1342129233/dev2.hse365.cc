import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import { saveToLocal, loadFromLocal } from '@/common/local-storage'
import base from '@/api/base'
import qs from 'qs'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}
*/
axios.defaults.timeout = 50000

// 是否有请求在刷新token
window.isRefreshing = false
// 被挂起的请求数组
let subscribesArr = []

// push所有请求到数组中
function subscribeTokenRefresh(cb) {
  subscribesArr.push(cb)
}

// 用新token发起请求
function reloadSubscribesArr(token) {
  subscribesArr.map(cb => cb(token))
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  console.log('toLogin')
  router.replace({      // 替换 不会向 history 添加新记录
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath   // 重定向 把目标路由的url路径保存在login的query中
    }
  })
}

// 重新登录
function directLogin() {
  router.push({
    path: '/home',
    query: {
      redirectUrl: window.location.href.split('#')[1] || ''
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      console.log('401')
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip('登录过期，请重新登录')
      // todo: refresh_token
      console.log('403')
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      // tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 })
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

function isTokenExpired() {   // token 是否存活
  let expiredIn = loadFromLocal('expires_in')
  let tokenCreatedTime = loadFromLocal('created_time')
  if (expiredIn && tokenCreatedTime) {
    let nowTime = new Date().getTime()
    let willExpired = (tokenCreatedTime + expiredIn * 1000) <= nowTime
    return willExpired
  }
  return false
}

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    // const token = loadFromLocal('access_token')
    // token && (config.headers.Authorization = token)
    // 设置参数

    const token = loadFromLocal('access_token')  // 头像，企业id, 企业名称

    if (token) {
      const refreshToken = loadFromLocal('refresh_token')
      const username = loadFromLocal('username')
      const password = loadFromLocal('password')
      if (isTokenExpired()) {
        if (!window.isRefreshing) {
          window.isRefreshing = true
          var params = {
            client_id: username,
            client_secret: password,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
          }
          axios.post(`${base.sq}/oauth/token`, qs.stringify(params))
            .then((res) => {
              window.isRefreshing = false
              if (res.code === 200) {
                const tokenVo = res.data
                // saveToLocal('access_token', tokenVo.access_token)
                reloadSubscribesArr(tokenVo.token)
              } else {
                subscribesArr = []
                window.localStorage.clear()
                directLogin()
              }
            })
          .catch(() => {
            window.isRefreshing = false
            subscribesArr = []
            window.localStorage.clear()
            directLogin()
          })
        }
        let retry = new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            config.headers.Authorization = `Bearer ${newToken}`
            resolve(config)
          })
        })
        return retry
      } else {
        config.headers.Authorization = `Bearer ${token}`  // 认证方式
        return config
      }
    } else {
      // directLogin()
    }
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      console.log(response)
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit('changeNetwork', false)
      } else {
        return Promise.reject(error)
      }
    }
  })

export default instance
