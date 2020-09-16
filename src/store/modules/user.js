// import { logout } from '@/api/login1'

import { login, companylistRequest, addEnterpriseResquest, deletebusinessResquest,
  getIconListResquest, getFunListResquest, setIconResquest, setFunResquest, getEnterpriseResquest,
  postEnterpriseResquest, setEnterpriseIdResquest} from '@/api/login'
import { getToken, setToken } from '@/common/auth'
import { saveToLocal } from '@/common/local-storage'
import { Message } from 'element-ui'
import router from '@/router'
import Cookies from 'js-cookie'

const TokenKey = 'token'
// import { getUserInfo } from '@/api/user'

const SET_TOKEN = 'SET_TOKEN'
const SET_USERINFO = 'SET_USERINFO'
const SET_MANAGE_EID = 'SET_MANAGE_EID'
// const SET_NAME = 'SET_NAME'
// const SET_AGE = 'SET_AGE'
// const SET_AVATAR = 'SET_AVATAR'
// const SET_PERMISSIONS = 'SET_PERMISSIONS'
// const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'
// const SET_EXPIRES = 'SET_EXPIRES'
// const SET_TOKEN_TYPE = 'SET_TOKEN_TYPE'

const user = {
  state: {
    token: getToken(), // token
    name: '',
    // age: 0,
    avatar: '',
    manage_eid: 0,
    // permissions: '',
    // refreshToken: '',
    // expires: 0,
    // tokenType: '',
    companyList: [],
    company_sum_count: 0,
    iconList: [],
    funList: []
  },
  mutations: {
    // 设置token
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_USERINFO](state, user) {
      state.name = user.show_name
      state.avatar = user.mediumAvatar
      console.log(user)
      saveToLocal('name', user.show_name)
      saveToLocal('avatar', user.mediumAvatar)
      saveToLocal('is_admin', user.is_admin)
      saveToLocal('userId', user.id)
    },
    [SET_MANAGE_EID](state, manageEid) {
      state.manage_eid = manageEid
      saveToLocal('manage_eid', manageEid)
    },
    // [SET_NAME](state, name) {
    //   state.name = name
    // },
    // [SET_AGE](state, age) {
    //   state.age = age
    // },
    // [SET_AVATAR](state, avatar) {
    //   state.avatar = avatar
    // },
    // [SET_PERMISSIONS](state, permissions) {
    //   state.permissions = permissions
    // },
    // [SET_REFRESH_TOKEN](state, refreshToken) {
    //   state.refreshToken = refreshToken
    // },
    // [SET_EXPIRES](state, expires) {
    //   state.expires = expires
    // },
    // [SET_TOKEN_TYPE](state, tokenType) {
    //   state.tokenType = tokenType
    // },
    // setUserToken(state, { username, password, permissions, access_token, refresh_token, expires_in }) {
    //   saveToLocal('username', username)
    //   saveToLocal('permissions', permissions)
    //   saveToLocal('access_token', access_token)
    //   saveToLocal('refresh_token', refresh_token)
    //   saveToLocal('expires_in', expires_in)
    //   saveToLocal('created_time', new Date().getTime())
    // },
    SET_COMPANYLIST(state, companyList) {
      state.companyList = companyList.company_data
      state.company_sum_count = companyList.company_sum_count
    },
    SET_ICONLIST(state, iconList) {
      state.iconList = iconList
    },
    SET_FUNLIST(state, funList) {
      state.funList = funList
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(({ data }) => {
          if (data.code === 0) {
            commit('SET_LOADING', false)
            setToken(data.data.token)
            commit(SET_TOKEN, data.data.token)     // 存 token
            commit(SET_USERINFO, data.data.user)   // 存账号密码
            return resolve(data)
          }else{
            Message.error(data.msg)
            commit('SET_LOADING', false)
            return resolve(data)
          }
        }).catch(err => {
          // console.log(用户不存在)
          commit('SET_LOADING', false)
          return reject(err)
        })
      })
    },
    // 设置企业id
    setEnterpriseId({commit}, eid) {
      return new Promise((resolve, reject) => {
        setEnterpriseIdResquest(eid).then(({data}) => {
          commit(SET_MANAGE_EID, data.data.manage_eid)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 新用户登录
    // newlogin({ commit }, { username, password }) {
    //   return new Promise((resolve, reject) => {
    //     newlogin(username, password).then(resp => {
    //       let data = resp.data
    //       setToken(data.access_token)
    //       /*
    //       setRefreshToken(data.refresh_token)
    //       commit(SET_TOKEN, data.token)
    //       commit(SET_REFRESH_TOKEN, data.refresh_token)
    //       commit(SET_TOKEN_TYPE, data.token_type)
    //       commit(SET_EXPIRES, data.expires_in)
    //       commit(SET_NAME, username)
    //       */
    //       // commit(SET_AGE, data.age)
    //       // commit(SET_AVATAR, data.avatar)
    //       // commit(SET_PERMISSIONS, '/excel,/clipboard,/theme, /user/list, /user/*, /homepage')
    //       // commit('setUserToken', {
    //       //   'username': username,
    //       //   'password': password,
    //       //   'permissions': '/excel,/clipboard,/theme, /user/list, /user/*, /homepage',
    //       //   'access_token': data.access_token,
    //       //   'refresh_token': data.refresh_token,
    //       //   'expires_in': data.expires_in
    //       // })
    //       return resolve()
    //     }).catch(err => {
    //       console.log(err)
    //       return reject(err)
    //     })
    //   })
    // },
    // 用户登录
    // login1({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(resp => {
    //       let data = resp.data
    //       setToken(data.token)
    //       commit(SET_TOKEN, data.token)
    //       // commit(SET_NAME, data.name)
    //       // commit(SET_AGE, data.age)
    //       // commit(SET_AVATAR, data.avatar)
    //       // commit(SET_PERMISSIONS, data.permissions)
    //       return resolve()
    //     }).catch(err => {
    //       return reject(err)
    //     })
    //   })
    // },
    // 拉取用户信息
    // pullUserInfo({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     let username = loadFromLocal('username')
    //     getUserInfo(username).then(resp => {
    //       let data = resp.data
    //       console.log(data)
    //       // commit(SET_NAME, data.name)
    //       // commit(SET_AGE, data.age)
    //       // commit(SET_AVATAR, data.avatar)
    //       // commit(SET_PERMISSIONS, data.permissions)
    //       return resolve(data)
    //     }).catch(err => {
    //       return reject(err)
    //     })
    //   })
    // },
    // 用户退出登录
    logout({ commit }) {
      Cookies.remove(TokenKey)
      // return new Promise((resolve, reject) => {
      //   logout().then(resp => {
      //     removeToken()
      //     commit(SET_TOKEN, '')
      //     // commit(SET_NAME, '')
      //     // commit('setUserToken', {
      //     //   'user_name': '',
      //     //   'password': '',
      //     //   'permissions': '',
      //     //   'access_token': '',
      //     //   'refresh_token': '',
      //     //   'expires_in': 0
      //     // })
      //     return resolve()
      //   }).catch(err => {
      //     return reject(err)
      //   })
      // })
    },
    // 企业登陆管理列表
    getCompanylist({commit}, keyword) {
      return new Promise((resolve, reject) => {
        companylistRequest(keyword).then(({data}) => {
          console.log(data)
          commit('SET_COMPANYLIST', data.data)
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 添加企业（子）
    addEnterpriseRes(_, addEnterpriseFormInfo) {
      return new Promise((resolve, reject) => {
        addEnterpriseResquest(addEnterpriseFormInfo).then(({data}) => {
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 编辑企业
    getEnterprise(_, eid) {
      return new Promise((resolve, reject) => {
        getEnterpriseResquest(eid).then(({data}) => {
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    postEnterprise(_, addEnterpriseFormInfo) {
      return new Promise((resolve, reject) => {
        postEnterpriseResquest(addEnterpriseFormInfo).then(({data}) => {
          if(data.code === 0) {
            router.push('/enterprise')
          }else{
            Message.error(data.msg)
          }
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除企业
    deletebusiness(_, eid) {
      return new Promise((resolve, reject) => {
        deletebusinessResquest(eid).then(({data}) => {
          if(data.data.code) {
            Message.success('删除成功')
            this.dispatch('getCompanylist', '')
          }else{
            Message.error(data.data.message)
          }
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 获取icon或功能列表
    getIconFunList({commit}, iconFunObj) {
      return new Promise((resolve, reject) => {
        if(iconFunObj.tit === 'iconSet') {
          getIconListResquest(iconFunObj.eid).then(({data}) => {
            commit('SET_ICONLIST', data.data)
            return resolve(data)
          }).catch((err) => {
            return reject(err)
          })
        }else if(iconFunObj.tit === 'funSet') {
          getFunListResquest(iconFunObj.eid).then(({data}) => {
            commit('SET_FUNLIST', data.data)
            return resolve(data)
          }).catch((err) => {
            return reject(err)
          })
        }
      })
    },
    // 保存icon或功能列表
    setIconFun(_, iconFunObj) {
      return new Promise((resolve, reject) => {
        if(iconFunObj.tit === 'iconSet') {
          let val = []
          iconFunObj.multipleSelection.map(item => {
            val.push(item.id)
          })
          setIconResquest({val, eid: iconFunObj.eid}).then(({data}) => {
            if(data.code === 0) {
              router.push('/enterprise')
            }else{
              Message.error('设置失败')
            }
            return resolve(data)
          }).catch((err) => {
            return reject(err)
          })
        }else if(iconFunObj.tit === 'funSet') {
          let val = []
          iconFunObj.multipleSelection.map(item => {
            val.push(item.wid)
          })
          setFunResquest({val, eid: iconFunObj.eid}).then(({data}) => {
            if(data.code === 0) {
              router.push('/enterprise')
            }else{
              Message.error('设置失败')
            }
            return resolve(data)
          }).catch((err) => {
            return reject(err)
          })
        }
      })
    }
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
    // age: state => state.age,
    avatar: state => state.avatar
    // permissions: state => state.permissions,
    // refreshToken: state => state.refreshToken,
    // tokenType: state => state.tokenType,
    // expiresIn: state => state.expiresIn
    // companyList: state => state.companyList
  }
}

export default user
