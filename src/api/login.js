import axios from '@/utils/api.request'

const _api = '_api'

// 登陆请求
export function login(data) {
  return axios.request({
    url: `/${_api}/login`,
    method: 'POST',
    params: data
  })
}
// 退出登陆请求
export function logout() {
  return axios.request({
    url: `/login/logout`,
    method: 'POST'
  })
}

// 企业登陆列表
export function companylistRequest(data) {
  return axios.request({
    url: `/${_api}/admin/companyhome/companylist?keyword=${data}`,
    method: 'GET'
  })
}

// 添加企业
export function addEnterpriseResquest(data) {
  var url = ''
  if(data.pid) {
    url = `/${_api}/admin/companyadmin/addcompanysub/${data.pid}`
  }else{
    url = `/${_api}/admin/companyadmin/createcompany`
  }
  return axios.request({
    url,
    method: 'POST',
    data
  })
}
// 编辑企业
export function getEnterpriseResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/edit/${data}`
  })
}
// 编辑企业
export function postEnterpriseResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/edit/${data.eid}`,
    method: 'POST',
    data
  })
}

// 删除企业
export function deletebusinessResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/companydelete/${data}`
  })
}
// 获取icon列表
export function getIconListResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/enterpriseiconset/${data}`
  })
}
// 设置icon列表
export function setIconResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/enterpriseiconset/${data.eid}`,
    method: 'POST',
    data: {
      ids: data.val
    }
  })
}
// 获取功能列表
export function getFunListResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/enterprisepowerchoose/${data}`
  })
}
// 设置功能列表
export function setFunResquest(data) {
  return axios.request({
    url: `/${_api}/admin/companyadmin/enterprisepowerchoose/${data.eid}`,
    method: 'POST',
    data: {
      val: data.val
    }
  })
}
// 设置功能列表
export function setEnterpriseIdResquest(data) {
  return axios.request({
    url: `/${_api}/auth/changeEid`,
    method: 'POST',
    data
  })
}
