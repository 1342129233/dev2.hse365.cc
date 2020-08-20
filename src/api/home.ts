import axios from "@/unils/api.request";

const _api = "_api";
// 轮播图
export function bannerRequest() {
  return axios.request({
    url: `${_api}/picture/getBanner`,
    method: "POST"
  });
}

// icon
export function iconRequest() {
  return axios.request({
    url: `${_api}/icon/iconList`,
    method: "POST"
  });
}

// 新闻
export function journalismRequest(data: string) {
  return axios.request({
    url: `${_api}/Articles/getNewArticles`,
    method: "POST",
    data
  });
}

// 课程
export function curriculumRequest(data: object) {
  return axios.request({
    url: `${_api}/Course/getNewCourse`,
    method: "POST",
    data
  });
}
