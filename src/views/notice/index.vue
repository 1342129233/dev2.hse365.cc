<template>
  <div>
    <div v-show="establish === 1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="form.input"  style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            style="width: 400px;"
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-button type="success" class="new_notice" @click="newnotice">新建通知公告</el-button>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="通知公告"
            width="300">
          </el-table-column>
          <el-table-column
            prop="province"
            label="全体用户"
            width="200">
          </el-table-column>
          <el-table-column
            prop="city"
            label="定时发送"
            width="300">
          </el-table-column>
          <el-table-column
            prop="address"
            label="实际发送时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="最后编辑人"
            width="200">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="状态"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="fenye.numtal"
            layout="total, prev, pager, next"
            :total="fenye.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <Newnotice v-show="establish === 2" v-model='establish'></Newnotice>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Newnotice from './newnotice'
export default {
  data() {
    return {
      fenye: {
        total: 1000,   // 显示数量
        numtal: 10     // 每页多少个
      },
      establish: 1,
      currentPage1: 1,
      form: {
        input: '',
        value1: ''
      },
      tableData: [{
        id: 1,
        name: '直播功能暂停使用三天，8月30日恢复正常',
        province: '是',
        city: '2020-08-28 13：00：00',
        address: '张三',
        zip: '未发送'
      }]
    }
  },
  components: {
    Newnotice
  },
  beforeMount() {
    this.notlistStaff().then((res) => {
      console.log(res.data)
    })
  },
  methods: {
    ...mapActions(['notlistStaff']),
    handleClick(row) {
      console.log(row)
    },
    onSubmit() {
      console.log(123)
    },
    newnotice() {
      this.establish = 2
    },
    handleSizeChange() {
      console.log(`每页条`)
    },
    handleCurrentChange() {
      console.log(`当前页`)
    }
  }
}
</script>
<style scoped lang="stylus">
.new_notice {
  margin: 10px 0px;
}
.block {
  text-align: center;
}
</style>
