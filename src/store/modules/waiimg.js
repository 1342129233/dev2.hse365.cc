import { qiniuyunResquest, rotationResquest, setrotationResquest } from '@/api/rotationimg'

const waiimg = {
  state: {},
  mutations: {},
  actions: {
    // 获取七牛token
    qiniuyunrunning() {
      return new Promise((resolve, reject) => {
        qiniuyunResquest().then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 回显轮播图
    rotationrunning() {
      return new Promise((resolve, reject) => {
        rotationResquest().then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 回显轮播图
    setrotationrunning(_, datas) {
      return new Promise((resolve, reject) => {
        setrotationResquest(datas).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  },
  getters: {}
}

export default waiimg
