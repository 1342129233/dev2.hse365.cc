// import axios from '@/utils/http' // 导入http中创建的axios实例
import qs from 'qs'
import axios from 'axios'
import base from './base'
import { loadFromLocal } from '@/common/local-storage'
import pageSize from '@/common/page'

export function getUserList(pageNo) {
  let accessToken = loadFromLocal('access_token')
  let param = {
    pageNo: pageNo,
    pageSize: pageSize,
    access_token: accessToken
  }

  return axios.post(`${base.sq}/user/list`, qs.stringify(param))
}

export function addUser(params) {
  let accessToken = loadFromLocal('access_token')
  // params['access_token'] = accessToken

  console.log(params)

  return axios.post(`${base.sq}/user/add?access_token=${accessToken}`, qs.stringify(params))
}

export function lockUser(params) {
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/user/lock?access_token=${accessToken}`, qs.stringify(params))
}

export function deleteUser(params) {
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/user/delete?access_token=${accessToken}`, qs.stringify(params))
}

export function changePwd(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/user/changePwd?access_token=${accessToken}`, qs.stringify(params))
}

export function batchDeleteUser(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/user/batchDelete?access_token=${accessToken}`, qs.stringify(params))
}

export function batchLockUser(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/user/batchLock?access_token=${accessToken}`, qs.stringify(params))
}

export function getUserInfo(username) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    username: username
  }

  console.log(params)

  return axios.post(`${base.sq}/user/info?access_token=${accessToken}`, qs.stringify(params))
}
