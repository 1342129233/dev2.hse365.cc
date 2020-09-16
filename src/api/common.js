import axios from '@/utils/api.request'

const _api = '_api'
// 获取七牛token
export function uploadTokenResquest() {
  return axios.request({
    url: `${_api}/admin/CompanyAdmin/getqiniuuploadtoken`,
    method: 'GET'
  })
}
// 获取省市区列表
export function getPCATreeRequest() {
  return axios.request({
    url: `${_api}/admin/CompanyAdmin/getenterpriseareaall`,
    method: 'GET'
  })
}
// 获取部门工种岗位列表
export function getDeptProOccResquest(data = []) {
  let str = ''
  data.map((item, ind) => {
    str += `&k[${ind}]=${item}`
  })
  // 参数
  // let k = {
  //   0: 'dept',
  //   1: 'pro',
  //   2: 'occ'
  // }
  return axios.request({
    url: `${_api}/baseData/getBaseData?power_key=group_curd${str}`
  })
}
// 获取人员列表
export function getPersonListRequest(data) {
  let url = `/${_api}/baseData/selectUserList`
  let newdata = {
    keyword: data.phoneName,
    dept_id: data.deptId,
    profession: '',
    occupation: '',
    page: data.page,
    per_page: data.per_page
  }
  return axios.request({
    url,
    method: 'POST',
    data: newdata
  })
}
// 获取部门工种岗位模版列表
export function getDeptModalListRequest() {
  return axios.request({
    url: `/${_api}/template/list`
  })
}
// 创建修改部门工种岗位模版
export function cuDeptTemplateRequest(data) {
  return axios.request({
    url: `/${_api}/template/cu`,
    method: 'POST',
    data
  })
}

// 人员管理的部门工种岗位列表
export function ryglbgg() {
  let data = {
    k: ['dept', 'occ', 'pro']
  }
  return axios.request({
    url: `/${_api}/baseData/getBaseData`,
    method: 'POST',
    data
  })
}

// 员工部门工种岗位设置
export function setting(val) {
  let data = {
    id: val.id || '',
    did: val.did || '',
    gid: val.gid || [],
    pid: val.pid || []
  }
  // console.log(data)
  return axios.request({
    url: `/_api/admin/person/${data.id}/setting`,
    method: 'POST',
    data
  })
}

// 删除员工
export function staffDeleteRequest(id) {
  return axios.request({
    url: `/_api/admin/person/${id}/del`,
    method: 'POST'
  })
}

// 管理员修改用户密码
export function administratorsmodifyRequest(val) {
  let id = val.id
  let data = {
    password: val.newpassworld
  }
  return axios.request({
    url: `/_api/admin/person/${id}/changePassword`,
    method: 'POST',
    data
  })
}

// 修改员工信息
export function ModifyEmployeeRequest(data) {
  let id = data.id
  return axios.request({
    url: `/_api/admin/person/${id}/setProfile`,
    method: 'POST',
    data
  })
}
