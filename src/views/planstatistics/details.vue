<template>
  <div>
    <div class="header">
      <div>人员详情</div>
      <div>
        <el-button type="primary" @click="jihau">返回计划统计列表</el-button>
        <el-button type="primary" @click="topdetails">返回上一页</el-button>
        <el-button type="success" class="daochu" @click="personnelexport">导出</el-button>
      </div>
    </div>
    <div class="sou">
      <el-input
        class="sousan"
        style="width: 200px"
        placeholder="请输入员工姓名"
        v-model="datajs.userName"
        clearable>
      </el-input>
      <el-input
        class="sousan"
        style="width: 200px"
        placeholder="批次分类"
        v-model="datajs.batch_tag"
        clearable>
      </el-input>
      <el-select v-model="datajs.finished_flag" clearable placeholder="请选择" class="sousan">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="lookup">搜索</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="verifiedMobile"
          label="手机号"
          >
        </el-table-column>
        <el-table-column
          prop="didName"
          label="部门"
          >
        </el-table-column>
        <el-table-column
          prop="gidName"
          label="工种"
          >
        </el-table-column>
        <el-table-column
          prop="pidName"
          label="岗位"
          >
        </el-table-column>
        <el-table-column
          prop="plan_status"
          label="完成情况"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.plan_status === 'finished'">已完成</div>
            <div v-if="scope.row.plan_status === 'unfinished'">未完成</div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          v-for='(item,index) in tableList'
          :key='index'
          :label='item.label'
          :prop='item.prop'
        >
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'detailsa',
  props: ['details', 'planId', 'seq', 'stagePersonnel'],
  data() {
    return {
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 'finished',
        label: '已完成'
      }, {
        value: 'unfinished',
        label: '未完成'
      }],
      pagesize: [10],
      currentPage: 1,
      total: 0,
      tableList: [
        {
          label: '姓名',
          prop: 'username'
        },
        {
          label: '手机号',
          prop: 'verifiedMobile'
        },
        {
          label: '部门',
          prop: 'didName'
        },
        {
          label: '工种',
          prop: 'gidName'
        },
        {
          label: '岗位',
          prop: 'pidName'
        },
        {
          label: '完成情况',
          prop: 'plan_status'
        }
      ],
      tableData: [],
      datajs: {
        eid: 0,
        id: 0,
        userId: 0,
        userName: '',
        batch_tag: '',
        finished_flag: '',
        currentPage: 1,
        seq: ''
      }
    }
  },
  beforeMount() {
    this.datajs.eid = this.details.eid
    this.datajs.id = 1 // this.planId  // 1
    this.datajs.userId = this.details.userId
    this.datajs.seq = this.seq
    this.datajs.currentPage = this.details.currentPage
    if(this.stagePersonnel === 1) {
      this.statisticsUserStaff(this.datajs).then((data) => {
        this.tableData = data.data.user
        this.total = +data.data.count
      })
    }else if(this.stagePersonnel === 2) {
      // 查看本阶段人员
      this.statisticsUsersBySeqStaff(this.datajs).then((data) => {
        let sd = data.data.user
        this.tableData.length = 0
        this.tableData = sd
      })
    }
  },
  methods: {
    ...mapActions(['statisticsUserStaff', 'statisticsUsersBySeqStaff', 'statisticsUserExportStaff', 'statisticsUsersBySeqExportStaff']),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.datajs.currentPage = val
      if(this.stagePersonnel === 1) {
        this.statisticsUserStaff(this.datajs).then((data) => {
          let sd = data.data.user
          this.tableData.length = 0
          this.tableData = sd
        })
      }else if(this.stagePersonnel === 2) {
        // 查看本阶段人员
        this.statisticsUsersBySeqStaff(this.datajs).then((data) => {
          let sd = data.data.user
          this.tableData.length = 0
          this.tableData = sd
        })
      }
    },
    lookup() {
      this.currentPage = 1
      this.datajs.currentPage = 1
      if(this.stagePersonnel === 1) {
        this.statisticsUserStaff(this.datajs).then((data) => {
          let sd = data.data.user
          this.tableData.length = 0
          this.tableData = sd
        })
      }else if(this.stagePersonnel === 2) {
        // 查看本阶段人员
        this.statisticsUsersBySeqStaff(this.datajs).then((data) => {
          let sd = data.data.user
          this.tableData.length = 0
          this.tableData = sd
        })
      }
    },
    topdetails() {
      this.$emit('detailsshang', 'false')
    },
    // 人员导出
    personnelexport() {
      if(this.stagePersonnel === 1) {
        this.statisticsUserExportStaff(this.datajs)
      }else if(this.stagePersonnel === 2) {  // 本阶段人员详情导出
        this.statisticsUsersBySeqExportStaff(this.datajs)
      }
    },
    // 返回计划统计列表
    jihau() {
      this.$emit('jihaulist')
    }
  }
}
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.daochu {

}
.sou {
  display: flex;
  margin: 10px 0;
}
.sousan {
  margin-right: 10px;
}
</style>
