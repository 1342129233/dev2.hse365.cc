import { companyindexRequest } from '@/api/home'
// import { getToken, setToken, removeToken } from '@/common/auth'
const home = {
  state: {
    basic_msg: {},
    learn_msg: {},
    everyday_count: {
      login_time_arr: [],
      online_proportion_arr: []
    }
  },
  mutations: {
    SAVE_BASIC_LEARN_MSG(state, data) {
      state.basic_msg = data.basic_msg || {}
      state.learn_msg = data.learn_msg || {}
      state.everyday_count.login_time_arr = []
      state.everyday_count.online_proportion_arr = []
      data.everyday_count.map(item => {
        state.everyday_count.login_time_arr.push(item.login_time)
        state.everyday_count.online_proportion_arr.push(item.count)
      })
    }
  },
  actions: {
    // 首页数据
    companyindex({commit}, data) {
      return new Promise((resolve, reject) => {
        companyindexRequest(data).then(({data}) => {
          if(data.code === 0) {
            commit('SAVE_BASIC_LEARN_MSG', data.data)
          }
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default home