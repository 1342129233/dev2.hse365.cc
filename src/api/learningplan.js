import axios from '@/utils/api.request'
import { getToken } from '@/common/auth'
const _api = '_api'

// 获取部门列表
export function statisticsRequest(data) {
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statistics?eid=${data.eid}&userId=${data.userId}&page=${data.currentPage}`,
    method: 'GET'
  })
}

// A计划(2)
export function statisticsDetailRequest(data) {
  console.log(data)
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statisticsDetail?eid=${data.eid}&userId=${data.userId}&id=${data.id}`,
    method: 'GET'
  })
}

// A计划(1)阶段
export function statisticsInfoRequest(data) {
  console.log(data)
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statisticsInfo?eid=${data.eid}&userId=${data.userId}&id=${data.id}`,
    method: 'GET'
  })
}

// 按阶段筛选计划执行情况
export function statisticsDetailBySeqRequest(data) {
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statisticsDetailBySeq?eid=${data.eid}&userId=${data.userId}&id=${data.id}&seq=${data.seq}`,
    method: 'GET'
  })
}

// 人员详情
export function statisticsUserRequest(data) {
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statisticsUser?eid=${data.eid}&userId=${data.userId}&id=${data.id}&page=${data.currentPage}&userName=${data.userName}&batch_tag=${data.batch_tag}&finished_flag=${data.finished_flag}`,
    method: 'GET'
  })
}

// 本阶段人员
export function statisticsUsersBySeqRequest(data) {
  return axios.request({
    url: `/${_api}/admin/LearningPlan/statisticsUsersBySeq?eid=${data.eid}&userId=${data.userId}&id=${data.id}&page=${data.currentPage}&userName=${data.userName}&batch_tag=${data.batch_tag}&finished_flag=${data.finished_flag}&seq=${data.seq}`,
    method: 'GET'
  })
}

// 人员详情导出
export function statisticsUserExportRequest(data) {
  window.location.href = `/${_api}/_api/admin/LearningPlan/statisticsUserExport?eid=${data.eid}&userId=${data.userId}&id=${data.id}&userName=${data.userName}&batch_tag=${data.batch_tag}&finished_flag=${data.finished_flag}&token=` + getToken()
}

// 本阶段人员详情导出
export function statisticsUsersBySeqExportRequest(data) {
  // https://dev2.hse365.cc/_api/admin/LearningPlan/statisticsUsersBySeqExport?userId=1&eid=81&token=832btk3qz0kk8kokcwwswc4c800gsk0&id=26&seq=1
  window.location.href = `/${_api}/_api/admin/LearningPlan/statisticsUsersBySeqExport?eid=${data.eid}&userId=${data.userId}&id=${data.id}&userName=${data.userName}&batch_tag=${data.batch_tag}&finished_flag=${data.finished_flag}&seq=${data.seq}&token=` + getToken()
}
