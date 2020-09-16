<template>
  <div class="enterprise">
    <!-- <div class="enterprise-header clearfix">
      <el-button type="success" class="add-enterprise"
      @click="()=>this.$router.push({path: '/addenterprise', query: { pid: 0, tit: 'addBusiness', eid: 0 }})">添加企业</el-button>
    </div> -->
    <!-- <el-divider></el-divider> -->
    <el-tabs type="card" class="Header">
      <el-tab-pane label="企业管理">
        <el-card shadow="always" class="search-card">
          <el-input v-model="enterpriseName" placeholder="企业名称"></el-input>
          <el-button id="search" @click="getCompanylist(enterpriseName)">搜索</el-button>
          <div class="enterprise-header clearfix wxyou" v-if="isAdmin">
            <el-button type="success" class="add-enterprise"
            @click="()=>this.$router.push({path: '/addenterprise', query: { pid: 0, tit: 'addBusiness', eid: 0 }})">添加企业</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-row class="wxtable">
      <el-col>
        企业总数：
        <el-button type="text">{{ company_sum_count }}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="companyList"
      row-key="eid"
      default-expand-all
      v-loading='loading'
    >
      <el-table-column prop="title" label="企业名称" width="350" header-align='center'></el-table-column>
      <el-table-column prop="name" label="负责人" align="center"></el-table-column>
      <el-table-column prop="usercount" label="人数占比" align="center"></el-table-column>
      <el-table-column prop="interspace" label="磁盘（MB）" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEnter(scope.row)"
            v-if='!scope.row.is_admin && scope.row.is_come_company'>进入企业</el-button>
          <el-dropdown size="mini" split-button
          v-if='scope.row.is_admin'
          @command="handleCommand"
          @click="handleEditorialBusiness({ tit: 'editBusiness', scopeRow: scope.row})">编辑企业
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ tit: 'businessManagement', scopeRow: scope.row}">管理企业</el-dropdown-item>
              <el-dropdown-item :command="{ tit: 'funSet', scopeRow: scope.row}">功能设置</el-dropdown-item>
              <el-dropdown-item :command="{ tit: 'addChildBusiness', scopeRow: scope.row}">添加子企业</el-dropdown-item>
              <el-dropdown-item :command="{ tit: 'iconSet', scopeRow: scope.row}">图标设置</el-dropdown-item>
              <el-dropdown-item :command="{ tit: 'deleteBusiness', scopeRow: scope.row}">删除企业</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { loadFromLocal } from '@/common/local-storage'
export default {
  name: 'enterprise',
  data() {
    return {
      enterpriseName: '',
      isAdmin: loadFromLocal('is_admin')
      // companyList: [],
      // company_sum_count: 0
    }
  },
  methods: {
    ...mapActions([
      'getCompanylist',
      'deletebusiness'
    ]),
    // 进入企业管理
    handleEnter(row) {
      if(row.eid) {
        this.$router.push({path: '/home', query: {eid: row.eid}})
      }
    },
    // admin编辑企业
    handleCommand({tit, scopeRow}) {
      let pid = scopeRow.eid
      switch(tit) {
        case 'businessManagement':
          this.$router.push({path: '/home', query: { eid: pid }})
          break
        case 'funSet':
          this.$router.push({path: '/iconset', query: { eid: pid, tit }})
          break
        case 'addChildBusiness':
          this.$router.push({path: '/addenterprise', query: { pid, tit, eid: 0 }})
          break
        case 'deleteBusiness':
          this.deleteenterprise(pid)
          break
        case 'iconSet':
          this.$router.push({path: '/iconset', query: { eid: pid, tit }})
          break
        default:
          return false
      }
    },
    handleEditorialBusiness({tit, scopeRow}) {
      let eid = scopeRow.eid
      this.$router.push({path: '/addenterprise', query: { eid, tit, pid: 0 }})
    },
    deleteenterprise(eid) {
      this.deletebusiness(eid)
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.user.companyList,
      company_sum_count: state => state.user.company_sum_count,
      loading: state => state.common.boo
    })
  },
  mounted() {
    this.getCompanylist(this.enterpriseName)
  }
}
</script>
<style lang="stylus" scoped>
.add-enterprise {
  float: right;
}

.search-card {
  background: #F5F5F5;

  .el-button {
    background: #428BCA;
    color: #E1E9EE;
  }
}

.enterprise >>> .el-tabs__item.is-active {
  color: #858586;
}

body .el-dropdown-menu--mini .el-dropdown-menu__item{
  line-height:24px;
  padding:0 20px;
  font-size:14px;
}

.el-input {
  width: 200px;
}
.wxyou{
  display: inline-block;
  float: right;
}
.Header{
  position: fixed;
  background-color: #FFF;
  top: 60px;
  padding-top:5px;
  width:100%;
  z-index: 999;
}
.wxtable{
  margin-top:140px;
}
</style>
