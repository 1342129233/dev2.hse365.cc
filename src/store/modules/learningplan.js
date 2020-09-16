import { statisticsRequest, statisticsDetailRequest, statisticsInfoRequest, statisticsDetailBySeqRequest, statisticsUserRequest, statisticsUsersBySeqRequest, statisticsUserExportRequest, statisticsUsersBySeqExportRequest } from '@/api/learningplan'

const learningplan = {
  state: {},
  mutations: {},
  actions: {
    statisticsStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    statisticsDetailStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsDetailRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    statisticsInfoStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsInfoRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    statisticsDetailBySeqStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsDetailBySeqRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    statisticsUserStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsUserRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 本阶段人员
    statisticsUsersBySeqStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsUsersBySeqRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 人员导出
    statisticsUserExportStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsUserExportRequest(data)
      })
    },
    // 本阶段人员详情导出
    statisticsUsersBySeqExportStaff(_, data) {
      return new Promise((resolve, reject) => {
        statisticsUsersBySeqExportRequest(data)
      })
    }
  }
}

export default learningplan
