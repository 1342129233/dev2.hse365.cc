import { notlistRequest, addOrUpdateRequest } from '@/api/notice'
const notice = {
  // state: {},
  // mutations: {},
  actions: {
    notlistStaff() {
      return new Promise((resolve, reject) => {
        notlistRequest().then(({data}) => {
          if(data.code === 0) {
            resolve(data)
          }
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 提交新创建的
    addOrUpdateStaff(_, data) {
      return new Promise((resolve, reject) => {
        addOrUpdateRequest(data).then(({data}) => {
          if(data.code === 0) {
            resolve()
          }
        }).catch((err) => {
          return reject(err)
        })
      })
    }
  },
  getters: {}
}

export default notice
