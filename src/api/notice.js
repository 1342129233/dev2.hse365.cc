import axios from '@/utils/api.request'

const _api = '_api'

// 后台获取公告列表
export function notlistRequest() {
  return axios.request({
    url: `/${_api}/admin/Notify/list`,
    method: 'GET'
  })
}

// 提交新创建的
export function addOrUpdateRequest(data) {
  return axios.request({
    url: `/${_api}/admin/Notify/addOrUpdate`,
    method: 'POST',
    data
  })
}
