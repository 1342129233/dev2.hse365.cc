import qs from 'qs'
import axios from 'axios'
import base from './base'
import { loadFromLocal } from '@/common/local-storage'
import pageSize from '@/common/page'

export function getAllArticleList() {
  return axios.post('/article/getAllArticleList')
}

export function getInviteList() {
  return axios.post('/article/getInviteList')
}

export function getMySentList(pageNo) {
  let accessToken = loadFromLocal('access_token')
  let userName = loadFromLocal('username')
  console.log(userName)
  let params = {
    pageNo: pageNo,
    pageSize: pageSize,
    authorname: userName
  }
  return axios.post(`${base.sq}/article/list?access_token=${accessToken}`, qs.stringify(params))
}

export function addArticle(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/article/add?access_token=${accessToken}`, qs.stringify(params))
}

export function updateArticle(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/article/update?access_token=${accessToken}`, qs.stringify(params))
}

export function deleteArticle(params) {
  // id, password
  let accessToken = loadFromLocal('access_token')

  console.log(params)

  return axios.post(`${base.sq}/article/delete?access_token=${accessToken}`, qs.stringify(params))
}
