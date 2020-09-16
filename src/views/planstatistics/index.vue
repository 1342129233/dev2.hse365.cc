<template>
  <div>
    <div v-if="numsaff.one">
      <div>计划统计列表</div>
      <div class="liebiao">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="title"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="id"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="plan(scope.row.id)">
                <!-- <router-link :to="{name:'plan' ,params: { tableId: scope.row.id }}"> -->
                  操作计划
                <!-- </router-link> -->
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="datajs.currentPage"
          :page-sizes="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <Plan v-if="numsaff.two" :planId="planId" @detailslist="detailslist" @planshang="planshang" @stageshang="stageshang"></Plan>
    <Details v-if="numsaff.three" :details="datajs" @detailsshang="detailsshang" :planId="planId" :seq="seq" :stagePersonnel="stagePersonnel" @jihaulist="jihaulist"></Details>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Plan from './plan'
import Details from './details'
export default {
  name: 'departmentset',
  data() {
    return {
      // 人员/ 阶段人员
      stagePersonnel: 1,
      numsaff: {
        one: true,
        two: false,
        three: false
      },
      planId: 0,
      planplan: false,
      tableData: [],
      total: 0,  // 多少条
      pagesize: [10],
      tableId: 0,
      datajs: {
        eid: 0,
        userId: 0,
        currentPage: 0
      },
      seq: ''
    }
  },
  components: {
    Plan,
    Details
  },
  beforeMount() {
    let user = JSON.parse(localStorage.getItem('__vuecms__'))
    this.datajs = {
      eid: +user.manage_eid,
      userId: +user.userId,
      currentPage: 1
    }
    this.statisticsStaff(this.datajs).then((val) => {
      this.tableData = val.data.planList
      this.total = +val.data.count  // 条数
    })
  },
  methods: {
    ...mapActions(['statisticsStaff']),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.datajs.currentPage = val
      this.statisticsStaff(this.datajs).then((val) => {
        let sd = val.data.planList
        this.tableData.length = 0
        this.tableData = sd
      })
    },
    plan(id) {
      this.planId = id
      this.numsaff.one = false
      this.numsaff.two = true
      this.numsaff.three = false
      this.tableId = id
    },
    planshang() {
      this.numsaff.one = true
      this.numsaff.two = false
      this.numsaff.three = false
    },
    detailslist(val, num) {
      this.numsaff.one = !val
      this.numsaff.two = !val
      this.numsaff.three = val
      this.stagePersonnel = num
    },
    detailsshang(val) {
      this.numsaff.one = false
      this.numsaff.two = true
      this.numsaff.three = false
    },
    stageshang(seq, num) {
      this.numsaff.one = false
      this.numsaff.two = false
      this.numsaff.three = true
      this.seq = seq
      this.stagePersonnel = num
    },
    // 返回计划统计列表
    jihaulist() {
      this.numsaff.one = true
      this.numsaff.two = false
      this.numsaff.three = false
    }
  }
}
</script>
<style scoped>
.liebiao {
  margin-top: 10px;
  height: 600px;
  overflow: hidden;
}
.plan {
  width:100%;
  height: 100%;
  position: fixed;
  top: 80px;
  background-color: var(--hsebg)
}
</style>
