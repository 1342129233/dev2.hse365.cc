// import axios from '@/utils/http' // 导入http中创建的axios实例
// import base from './base'
import axios from 'axios'
// import qs from 'qs'


export function login1(userInfo) {
  return axios.post('/login/login', userInfo)
}

export function userInfo() {
  return axios.post('/user/getInfo')
}

export function logout() {
  return axios.post('/login/logout')
}

// export function newlogin(username, password) {
//   var params = {
//     username: username,
//     password: password,
//     client_id: username,
//     client_secret: password,
//     grant_type: 'password'
//   }
//   return axios.post(`${base.sq}/oauth/token`, qs.stringify(params))
// }
