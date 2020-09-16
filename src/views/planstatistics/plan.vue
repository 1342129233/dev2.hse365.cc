<template>
<div>
    <div class="ding">
      <div>本计划应学人数为 {{users.total_users}} ，已完成人数为 {{users.learned_users}} ，未完成学习人数为 {{users.unfinished_users}}</div>
      <div>
        <el-button type="primary" @click="topplan">返回上一页</el-button>
        <el-button type="success" @click="personnel">查看人员</el-button>
      </div>
    </div>
    <div class="xuanze">
      <el-select v-model="datajs.seq" placeholder="请选择" class="xuanze_right">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.title"
          :value="item.seq">
        </el-option>
      </el-select>
      <!-- <div class="quedin" @click="optionsvalues">确定</div>
      <div class="quedins">查看本阶段人员</div> -->
      <el-button type="primary" @click="optionsvalues">确定</el-button>
      <el-button type="primary" @click="stage">查看本阶段人员</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1)*pagesize,currentPage*pagesize)"
      style='width: 90%;margin-bottom: 20px;'
      row-key='id'
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        v-for='(item,index) in tableList'
        :key='index'
        :label='item.label'
        :prop='item.prop'
      ></el-table-column>
      <!-- <el-table-column label='操作' width='200'>
      </el-table-column> -->
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['planId'],
  data() {
    return {
      options: [],
      value: '',
      pagesize: [10],
      currentPage: 1,
      users: {
        total_users: '',
        learned_users: '',
        unfinished_users: ''
      },
      tableList: [
        {
          label: '部门',
          prop: 'name'
        },
        {
          label: '应学人数',
          prop: 'user_num'
        },
        {
          label: '完成率',
          prop: 'completion_rate'
        },
        {
          label: '已完成',
          prop: 'learning'
        },
        {
          label: '未完成',
          prop: 'not_learn'
        }
      ],
      tableData: [
        // {
        //   'did': '3183',
        //   'name': '5555555',
        //   'des': '',
        //   'pid': '0',
        //   'sort': '5',
        //   'eid': '81',
        //   'path': '|3183|',
        //   'power_txt': null,
        //   'id': '3183',
        //   'complete_num': 0,
        //   'user_num': 0,
        //   'completion_rate': 0,
        //   'learning': 0,
        //   'not_learn': 0,
        //   'children': [
        //     {
        //       'did': '3180',
        //       'name': '食品的下级部门',
        //       'des': '1',
        //       'pid': '3177',
        //       'sort': '1',
        //       'eid': '81',
        //       'path': '|3177|3180|',
        //       'power_txt': null,
        //       'id': '3180',
        //       'complete_num': 0,
        //       'user_num': 0,
        //       'completion_rate': 0,
        //       'learning': 0,
        //       'not_learn': 0
        //     }
        //   ]
        // }
      ],
      datajs: {
        eid: +(JSON.parse(localStorage.getItem('__vuecms__')).manage_eid),
        userId: +(JSON.parse(localStorage.getItem('__vuecms__')).userId),
        id: 36,  // this.planId,  // 36
        seq: ''
      }
    }
  },
  beforeMount() {
    this.statisticsDetailStaff(this.datajs).then((data) => {
      if(data.data.depart.length > 0) {
        this.tableData = []
        this.tableData = data.data.depart
      }else{
        this.tableData = []
      }
      this.users.total_users = data.data.res.total_users
      this.users.learned_users = data.data.res.learned_users
      this.users.unfinished_users = data.data.res.unfinished_users
    })
    this.statisticsInfoStaff(this.datajs).then((data) => {
      this.options = data.data
    })
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    ...mapActions(['statisticsDetailStaff', 'statisticsInfoStaff', 'statisticsDetailBySeqStaff']),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    optionsvalues() {
      // this.datajs.seq = this.value
      this.statisticsDetailBySeqStaff(this.datajs).then((data) => {
        this.tableData = data.data.depart
        this.users.total_users = data.data.res.total_users
        this.users.learned_users = data.data.res.learned_users
        this.users.unfinished_users = data.data.res.unfinished_users
      })
    },
    personnel() {
      this.$emit('detailslist', 'true', 1)
    },
    topplan() {
      this.$emit('planshang')
    },
    stage() {
      if(this.datajs.seq === '') {
        this.$message({
          message: '请选择阶段',
          type: 'warning'
        })
      }else {
        this.$emit('stageshang', this.datajs.seq, 2)
      }
    }
  }
}
</script>
<style>
.xuanze {
  display: flex;
  margin: 15px 0px;
}
.quedin {
  width: 60px;
  height: 36px;
  text-align: center;
  color: #FFF;
  background-color: rgb(56, 162, 138);
  line-height: 36px;
  border-radius: 10px;
  margin: 0 5px;
}
.quedins {
  width: 150px;
  height: 36px;
  text-align: center;
  color: #FFF;
  background-color: rgb(56, 162, 138);
  line-height: 36px;
  border-radius: 10px;
  margin: 0 5px;
}
.ding {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height:36px;
  line-height: 36px;
}
.xuanze_right {
  margin-right: 10px;
}
</style>
