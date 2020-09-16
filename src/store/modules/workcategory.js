import { addworktypeRequest, delworktypeRequest, modifyworktypeRequest } from '@/api/workcategory'
const workcategory = {
  state: {

  },
  actions: {
    // 添加工种
    addworktype(_, data) {
      return new Promise((resolve, reject) => {
        addworktypeRequest(data).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除工种
    delworktype(_, data) {
      return new Promise((resolve, reject) => {
        delworktypeRequest(data).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 修改工种
    modifyworktype(_, data) {
      return new Promise((resolve, reject) => {
        modifyworktypeRequest(data).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default workcategory
