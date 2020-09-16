<template>
  <div class="deptpost">
    <!-- 外层dialog -->
    <el-dialog :visible="deptpostVisible" :show-close="false">
      <!-- 设置模板 -->
      <el-row :gutter="53">
        <el-col :span="24">
          分配岗位组
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <!-- <span v-for="item in postNum" :key="item.id">
          <el-button style="margin: 5px" :type="tableButton.indexOf(item.id) != -1?'danger':''" @click="deptclick(item.id)">{{item.title}}</el-button>
        </span> -->
        <el-table
          ref="multipleTable"
          :data="tableDataset.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="岗位"
          >
          </el-table-column>
          <el-table-column
            prop="departName"
            label="作用部门"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </el-tabs>
      <!-- 外部dialog footer -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="ispostDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="postDialog(false)" class='primary-btn'>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'deptpost',
  props: {
    deptpostVisible: {
      type: Boolean,
      default: true
    },
    // 传过来点击当前条信息
    tableData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      postNum: [],
      tableButton: [],
      tableDataset: [],
      multipleSelection: [],
      currentPage: 1,   // 页数
      pagesize: 10,  // 每页条数
      total: 0  // 长度  // rolegroupld
    }
  },
  beforeMount() {
    this.setPostdeptzi()
  },
  methods: {
    ...mapActions(['setPostStaff', 'setPostdoStaff']),
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setPostdeptzi() {
      this.$on('setPostdept', (res) => {
        this.setPostStaff(res).then(data => {
          if(data.status === 200) {
            let database = data.data.data
            this.tableDataset = []
            for(let i = 0; i < database.length; i++) {
              this.$set(this.tableDataset, i, database[i])
            }
            this.total = this.tableDataset.length
            // console.log(this.tableDataset)
          }else {
            this.$message({type: 'warning', message: '请求失败'})
          }
        })
      })
    },
    // 关闭弹框
    ispostDialog(boo) {
      this.$emit('clospostrDialog', boo)
    },
    postDialog(boo) {
      let jurisdiction = {
        id: this.tableData.id,
        data: this.multipleSelection
      }
      this.setPostdoStaff(jurisdiction).then(data => {
        let dea = data.data
        if(dea.code === 0) {
          this.$message({type: 'success', message: dea.msg})
          this.tableButton = []
          this.$emit('clospostrDialog', boo)
        }
      })
    },
    deptclick(id) {
      if(this.tableButton.includes(id)) {
        let xia = this.tableButton.indexOf(id)
        this.tableButton.splice(xia, 1)
      }else{
        this.tableButton.push(id)
      }
    }
  }
}
</script>
