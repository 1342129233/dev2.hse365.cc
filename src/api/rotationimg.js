import axios from '@/utils/api.request'
// const _api = '_api'
// 获取七牛token
export function qiniuyunResquest() {
  return axios.request({
    url: `/_api/admin/picture/getQiniuToken`,
    method: 'GET'
  })
}

// 回显轮播图
export function rotationResquest() {
  return axios.request({
    url: `/_api/admin/picture/create`,
    method: 'GET'
  })
}

// 提交轮播图
export function setrotationResquest(datas) {
  let data = {
    title: datas[0].title,
    img: datas[0].img,
    jumpUrl: datas[0].jumpUrl,
    sort: datas[0].sort,
    status: datas[0].status,
    id: datas[0].id
  }
  return axios.request({
    url: `/_api/admin/picture/edit`,
    method: 'POST',
    data
  })
}
