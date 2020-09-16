<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/workcategory">工种设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <div slot="header" class="clearfix">
        <el-breadcrumb class='inline_flex'>
          <el-breadcrumb-item>工种列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class='primary-btn' @click="openDialog(null)">添加工种</el-button>
      </div>
      <el-table :data="newWorkcategoryList" row-key="id" :header-cell-style="{backgroundColor: '#F5F7FA'}">
        <el-table-column prop='name' label='工种名称' align='center'></el-table-column>
        <el-table-column prop='des' label='工种简介' align='center'></el-table-column>
        <el-table-column prop='' label='操作' align='center' width='200px'>
          <template slot-scope="scope">
            <el-button type="text" class="text-btn" @click="openDialog(scope.row)">修改</el-button>
            <el-button type="text" class="error-text-btn" @click="isDeleteCurrentPro(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTit" :visible.sync="dialogFormVisible">
      <el-form :model="professionInfo">
        <el-form-item label="工种名称" label-width="120px">
          <el-input v-model="professionInfo.name" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="工种简介" label-width="120px">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="professionInfo.des"
            :style="{width: '400px'}"
            class='input-focus'>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="120px">
          <el-input v-model="professionInfo.sort" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)" class='primary-btn' :loading="addLoading">{{isRevise?'修改':'添加'}}</el-button>
      </div>
    </el-dialog>
    <div></div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'workcategory',
  data() {
    return {
      newWorkcategoryList: [
        // {name: 'lalla', des: 'sajisn', id: '0'}
      ],
      dialogFormVisible: false,
      dialogTit: '添加工种',
      professionInfo: {
        type: 1,
        name: '',
        des: '',
        id: '',
        sort: 0
      },
      addLoading: false,
      isRevise: false
    }
  },
  methods: {
    ...mapActions(['addworktype', 'Renbgg', 'delworktype', 'modifyworktype']),
    openDialog(row) {
      this.dialogFormVisible = true
      this.professionInfo = {
        name: '',
        des: '',
        id: '',
        type: 1,
        sort: 0
      }
      if(row) {
        this.isRevise = true
        this.professionInfo = {
          name: row.name,
          des: row.des,
          id: row.cid,
          type: 1,
          sort: row.sort
        }
      }else{
        this.isRevise = false
      }
    },
    closeDialog(boo) {
      if(boo === true) {
        if(this.isRevise === false) {
          let data = {
            type: this.professionInfo.type,
            name: this.professionInfo.name,
            des: this.professionInfo.des,
            sort: this.professionInfo.sort
          }
          if(data.name === '') {
            this.$message({type: 'warning', message: '工种名称不能为空'})
          }else{
            this.addworktype(data).then(data => {
              if(data.code === 0) {
                this.Renbgg().then(({data}) => {
                  this.newWorkcategoryList = data.profession
                })
                this.$message({type: 'success', message: '工种添加成功'})
                this.dialogFormVisible = false
              }else{
                this.$message({type: 'error', message: data.msg})
              }
            })
          }
        }else if(this.isRevise === true) {
          let data = {
            type: this.professionInfo.type,
            name: this.professionInfo.name,
            cid: this.professionInfo.id,
            des: this.professionInfo.des,
            sort: this.professionInfo.sort
          }
          if(data.name === '') {
            this.$message({type: 'warning', message: '工种名称不能为空'})
          }else{
            this.modifyworktype(data).then(data => {
              if(data.code === 0) {
                this.Renbgg().then(({data}) => {
                  this.newWorkcategoryList = data.profession
                })
                this.$message({type: 'success', message: '工种修改成功'})
                this.dialogFormVisible = false
              }else{
                this.$message({type: 'error', message: data.msg})
              }
            })
          }
        }
      }else if(boo === false) {
        this.dialogFormVisible = false
      }
    },
    isDeleteCurrentPro(scopeRow) {
      this.$confirm(`您确定要删除<${scopeRow.name}>吗`, '提示', {
        type: 'warning',
        cancelButtonClass: 'default-btn',
        confirmButtonClass: 'error-btn',
        confirmButtonText: '删除'
      }).then(() => {
        // 删除方法
        let data = {
          cid: scopeRow.cid,
          type: this.professionInfo.type
        }
        this.delworktype(data).then(data => {
          if(data.code === 0) {
            this.Renbgg().then(({data}) => {
              this.newWorkcategoryList = data.profession
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({type: 'error', message: data.msg})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  beforeMount() {
    this.Renbgg().then(({data}) => {
      this.newWorkcategoryList = data.profession
    })
  },
  computed: {
    ...mapState({
      yyglbgg_pid: state => console.log(state.common.yyglbgg.pid)
    })
  }
}
</script>
<style lang="stylus" scoped>
  .inline_flex
    display inline-flex
</style>
