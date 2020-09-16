<template>
  <div class="">
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">批量删除</el-button>
      <el-button @click="jump()">创建约稿</el-button>
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
        prop="title"
        label="主题"
        width="320">
      </el-table-column>
      <el-table-column
        prop="point"
        label="被约稿人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="invitedate"
        label="截止时间"
        width="180">
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
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">批量删除</el-button>
      <el-button @click="jump()">创建约稿</el-button>
    </div>
    <div class="block">
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getInviteList} from '@/api/articles'
export default {
  name: 'home1',
  data () {
    return {
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 12,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 5
    }
  },
  methods: {
    getData () {
      getInviteList().then((resp) => {
        console.log(resp.data)
        console.log(this.totalCount)
        this.tableData = resp.data
        this.totalCount = resp.data.length
      }).catch(() => {
        console.log('获取待审核列表出现异常')
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    jump () {
      this.$router.push({path: '/invitearticle/add'})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.PageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.getData()
  }
}
</script>
