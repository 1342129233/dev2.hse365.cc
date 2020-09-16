import {getDepartmentListRequest, addDepartmentRequest, reviseDepartmentInfoRequest, deleteDepartmentRequest, setProOccRequest, setEmployeelistRequest, addStaffRequest, ExportEmployeeRequest, ImportStaffRequest, setPostRequest, setPostdoRequest, deptmoveRequest, selectUserListRequest, cuRequest, delRequest, listRequest} from '@/api/department'
const department = {
  state: {
    departmentList: [],
    employeeList: []
  },
  mutations: {
    SAVE_DEPARTMENTLIST(state, departmentList) {
      state.departmentList = departmentList
    },
    SAVE_SETEMPLOYEE(state, employeeList) {
      // console.log(employeeList.data)
      state.employeeList = employeeList.data
    }
  },
  actions: {
    // 获取部门列表
    getDepartmentList({commit}) {
      return new Promise((resolve, reject) => {
        getDepartmentListRequest().then(({data}) => {
          commit('SAVE_DEPARTMENTLIST', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 添加部门
    addDepartment(_, departmentInfo) {
      return new Promise((resolve, reject) => {
        addDepartmentRequest(departmentInfo).then(({data}) => {
          return resolve(data)
        }).then(err => {
          return reject(err)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 修改部门信息
    reviseDepartmentInfo(_, departmentInfo) {
      return new Promise((resolve, reject) => {
        reviseDepartmentInfoRequest(departmentInfo).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除部门
    deleteDepartment(_, did) {
      return new Promise((resolve, reject) => {
        deleteDepartmentRequest(did).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 部门下设置工种岗位
    setProOcc(_, setProOccParams) {
      return new Promise((resolve, reject) => {
        setProOccRequest(setProOccParams).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 移动工种岗位位置
    deptmove(_, data) {
      return new Promise((resolve, reject) => {
        deptmoveRequest(data).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 获取员工信息
    setEmployeelist({commit}, num) {
      return new Promise((resolve, reject) => {
        setEmployeelistRequest(num).then(({data}) => {
          commit('SAVE_SETEMPLOYEE', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 导出员工列表
    ExportEmployeelist(_, num) {
      return new Promise((resolve, reject) => {
        ExportEmployeeRequest(num)
      })
    },
    // 导入员工列表
    ImportStaff(_, files) {
      return new Promise((resolve, reject) => {
        ImportStaffRequest(files).then((data) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 添加员工
    addStaff(_, personCre) {
      return new Promise((resolve, reject) => {
        addStaffRequest(personCre).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 分配岗位
    setPostStaff(_, id) {
      return new Promise((resolve, reject) => {
        setPostRequest(id).then((data) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    setPostdoStaff(_, jurisdiction) {
      return new Promise((resolve, reject) => {
        setPostdoRequest(jurisdiction).then((data) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 人员弹框
    selectUserListStaff(_, data) {
      return new Promise((resolve, reject) => {
        selectUserListRequest(data).then(({data}) => {
          if(data.code === 0) {
            return resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 创建模板
    cuStaff(_, data) {
      return new Promise((resolve, reject) => {
        cuRequest(data).then(({data}) => {
          resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除模板
    delStaff(_, data) {
      return new Promise((resolve, reject) => {
        delRequest(data).then(({data}) => {
          resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 部门工种岗位人员用户选择模板列表
    listStaff(_, data) {
      return new Promise((resolve, reject) => {
        listRequest(data).then(({data}) => {
          if(data.code === 0) {
            resolve(data)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default department
