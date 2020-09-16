import qs from 'qs'
import axios from 'axios'
import base from './base'
import { loadFromLocal } from '@/common/local-storage'
import pageSize from '@/common/page'

export function getArticleTypeList(pageNo) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    pageNo: pageNo,
    pageSize: pageSize
  }
  return axios.post(`${base.sq}/articletype/list?access_token=${accessToken}`, qs.stringify(params))
}

export function addArticleType(title, point, memo) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    title: title,
    memo: memo,
    pid: 0,
    point: point,
    exporttemplate: '',
    redtemplate: ''
  }

  return axios.post(`${base.sq}/articletype/add?access_token=${accessToken}`, qs.stringify(params))
}

export function delArticleType(id) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    id: id
  }

  return axios.post(`${base.sq}/articletype/delete?access_token=${accessToken}`, qs.stringify(params))
}