import {uploadTokenResquest, getPCATreeRequest, getDeptProOccResquest, getPersonListRequest, getDeptModalListRequest,
  cuDeptTemplateRequest, ryglbgg, setting, staffDeleteRequest, administratorsmodifyRequest, ModifyEmployeeRequest} from '@/api/common'
// const SET_LOADING = 'SET_LOADING'
const common = {
  state: {
    boo: false, // 全局loading
    uploadToken: '', // 获取上传token
    PCATreeData: [], // 获取省市区数据
    // 部门工种岗位列表
    deptProOccList: {
      dept: [],
      profession: [],
      occupation: []
    },
    // 人员列表信息
    personListInfo: {
      personList: [],
      last_page: 0,
      total: 0
    },
    deptModalList: [], // 部门工种岗位模版列表
    yyglbgg: {
      did: [],
      pid: [],
      gid: []
    }
  },
  mutations: {
    // 全局loading
    SET_LOADING(state, boo) {
      state.boo = boo
    },
    // 获取上传token
    SAVE_UPLOADTOKEN(state, uploadToken) {
      state.uploadToken = uploadToken
    },
    // 获取省市区数据
    SAVE_PCATREEDATA(state, PCATreeData) {
      state.PCATreeData = PCATreeData
    },
    // 保存部门工种岗位列表
    SAVE_DEPTPROOCCLIST(state, data) {
      state.deptProOccList = data
    },
    // 保存人员列表信息
    SAVE_PERSONLISTINFO(state, personListInfo) {
      state.personListInfo.personList = personListInfo.data
      state.personListInfo.last_page = personListInfo.last_page
      state.personListInfo.total = personListInfo.total
    },
    // 保存部门工种岗位模版列表
    SAVE_DEPTMODALLIST(state, deptModalList) {
      state.deptModalList = deptModalList
    },
    SAVE_RYGLBGG(state, bgg) {
      state.yyglbgg.did = bgg.dept
      state.yyglbgg.pid = bgg.occupation
      state.yyglbgg.gid = bgg.profession
    }
  },
  actions: {
    // 全局loading
    loading({ commit }, boo) {
      commit('SET_LOADING', boo)
    },
    // 获取上传token
    getUploadToken({ commit }) {
      return new Promise((resolve, reject) => {
        uploadTokenResquest().then(({data}) => {
          commit('SAVE_UPLOADTOKEN', data.data.token)
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 获取省市区数据
    getPCATree({ commit }) {
      return new Promise((resolve, reject) => {
        getPCATreeRequest().then(({data}) => {
          commit('SAVE_PCATREEDATA', data.data)
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 获取部门工种岗位列表
    getDeptProOccList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDeptProOccResquest(data).then(({data}) => {
          commit('SAVE_DEPTPROOCCLIST', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 获取人员列表
    getPersonList({ commit }, personParams) {
      return new Promise((resolve, reject) => {
        getPersonListRequest(personParams).then(({data}) => {
          commit('SAVE_PERSONLISTINFO', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 获取部门工种岗位模版列表
    getDeptModalList({ commit }) {
      return new Promise((resolve, reject) => {
        getDeptModalListRequest().then(({data}) => {
          commit('SAVE_DEPTMODALLIST', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 创建修改部门工种岗位模版
    cuDeptTemplate(_, deptModalParams) {
      return new Promise((resolve, reject) => {
        cuDeptTemplateRequest(deptModalParams).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 人员管理的部门工种岗位列表
    Renbgg({ commit }) {
      return new Promise((resolve, reject) => {
        ryglbgg().then(({data}) => {
          commit('SAVE_RYGLBGG', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 员工部门工种岗位设置
    settinging(_, Arrval) {
      return new Promise((resolve, reject) => {
        setting(Arrval).then(data => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除员工
    staffDelete(_, id) {
      return new Promise((resolve, reject) => {
        staffDeleteRequest(id).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 管理员修改用户密码
    administratorsmodify(_, val) {
      return new Promise((resolve, reject) => {
        administratorsmodifyRequest(val).then(data => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 修改员工信息
    ModifyEmployeeify(_, val) {
      return new Promise((resolve, reject) => {
        ModifyEmployeeRequest(val).then(data => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  },
  getters: {
    // uploadToken: state => state.uploadToken,
    // PCATreeData: state => state.PCATreeData
  }
}
export default common
