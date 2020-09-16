import axios from '@/utils/api.request'

const _api = '_api'

// 添加工种岗位
export function addworktypeRequest(datas) {
  let type = datas.type
  let data = datas
  return axios.request({
    url: `/${_api}/admin/category/catecreate/${type}`,
    method: 'POST',
    data
  })
}

// 删除工种岗位
export function delworktypeRequest(datas) {
  let type = datas.type
  let cid = datas.cid
  return axios.request({
    url: `/${_api}/admin/category/${type}/${cid}/del`,
    method: 'POST'
  })
}

// 修改工种岗位
export function modifyworktypeRequest(datas) {
  let type = datas.type
  let cid = datas.cid
  return axios.request({
    url: `/${_api}/admin/category/${type}/${cid}/edit`,
    method: 'POST',
    data: datas
  })
}
