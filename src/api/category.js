import qs from 'qs'
import axios from 'axios'
import base from './base'
import { loadFromLocal } from '@/common/local-storage'
import pageSize from '@/common/page'

export function getCategoryList(pageNo) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    pageNo: pageNo,
    pageSize: pageSize
  }
  return axios.post(`${base.sq}/category/list?access_token=${accessToken}`, qs.stringify(params))
}

export function addCategory(title, point, memo, typeId) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    title: title,
    memo: memo,
    typeid: typeId,
    point: point,
    exporttemplate: '',
    redtemplate: ''
  }

  console.log(params)

  return axios.post(`${base.sq}/category/add?access_token=${accessToken}`, qs.stringify(params))
}

export function delCategory(id) {
  let accessToken = loadFromLocal('access_token')
  let params = {
    id: id
  }

  return axios.post(`${base.sq}/category/delete?access_token=${accessToken}`, qs.stringify(params))
}