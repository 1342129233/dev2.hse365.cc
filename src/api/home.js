import axios from '@/utils/api.request'

const _api = '_api'

// 首页展示数据请求
export function companyindexRequest(data) {
  return axios.request({
    url: `/${_api}/admin/companyhome/companyindex`,
    method: 'POST',
    params: data
  })
}

// 首页展示企业上线率数据请求
// export function companyuseronlineRequest(data) {
//   return axios.request({
//     url: `/${_api}/admin/companyhome/companyuseronline`,
//     method: 'POST',
//     params: data
//   })
// }