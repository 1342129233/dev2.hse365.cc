<template>
  <div class="">
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">批量停用</el-button>
      <el-button @click="toggleSelection()">批量删除</el-button>
      <el-button @click="jump()">添加用户</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
       <el-table-column
        prop="nickname"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="verifiedMobile"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="organizations"
        label="单位"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色"
        width="60">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleLock(scope.$index, scope.row)">停用</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleUnlock(scope.$index, scope.row)">启用</el-button>
            <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">批量停用</el-button>
      <el-button @click="toggleSelection()">批量删除</el-button>
      <el-button @click="jump()">添加用户</el-button>
    </div>
  </div>
</template>
<script>
import {getUserList, lockUser, deleteUser} from '@/api/user'
// import { saveToLocal } from '@/common/local-storage'
export default {
  name: 'home1',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleEdit (key, val) {
      console.log('abc')
      console.log(key)
      console.log(val)
      console.log(val.id)
      // saveToLocal(`user_${val.id}`, val)
      this.$router.push({path: '/user/list/add/' + val.id})
    },
    handleDelete (key, val) {
      let params = {
        id: val.id
      }
      deleteUser(params).then((resp) => {
        console.log(resp.data)
      }).catch(() => {
        console.log('获取待审核列表出现异常')
      })
      // saveToLocal(`user_${val.id}`, val)
      // this.$router.push({path: '/user/list/delete/' + val.id})
    },
    handleLock (key, val) {
      let params = {
        id: val.id,
        status: 1
      }
      lockUser(params).then((resp) => {
        console.log(resp.data)
      }).catch(() => {
        console.log('获取待审核列表出现异常')
      })
    },
    handleUnlock (key, val) {
      let params = {
        id: val.id,
        status: 0
      }
      lockUser(params).then((resp) => {
        console.log(resp.data)
      }).catch(() => {
        console.log('获取待审核列表出现异常')
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    jump () {
      this.$router.push({path: '/user/list/add'})
    }
  },
  created () {
    console.log('abccc')
    getUserList(1).then((resp) => {
      console.log(resp.data)
      this.tableData = resp.data
      console.log(this.tableData)
    }).catch(() => {
      console.log('获取待审核列表出现异常')
    })
  },
  mounted () {
    // console.log('abc')
    // console.log(this.unverifiedList)
    /*
    getUnverifiedList().then((resp) => {
      console.log(resp.data)
      this.unverifiedList = resp.data
    }).catch(() => {
      console.log('获取待审核列表出现异常11')
    })
    */
  }
}
</script>

