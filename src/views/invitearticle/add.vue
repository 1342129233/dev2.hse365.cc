<template>
  <div class="components-container">
    <div class="container">
      <h3 class="title">创建约稿信息</h3>
      <!-- 基本信息-表单内容 -->
      <el-form class="basic-form" ref="basicForm" :model="basicForm" :rules="rules" label-width="100px">
        <el-form-item label="主题" prop="title">
          <el-input v-model="basicForm.title" placeholder="主题"></el-input>
        </el-form-item>
         <el-form-item label="被约稿人" prop="invitedUsers">
           <el-checkbox v-model="basicForm.userId" label="1">用户1</el-checkbox>
           <el-checkbox v-model="basicForm.userId2" label="2">用户2</el-checkbox>
        </el-form-item>
        <el-form-item label="截止时间" prop="inviteDate">
          <el-input v-model="basicForm.inviteDate" placeholder="截止时间"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" rows="8" placeholder="备注" v-model="basicForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitbasicForm('basicForm')">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      basicForm: {
        title: '',
        invitedUsers: '',
        inviteDate: '',
        remarks: ''
      },
      // 基本信息验证规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  // computed: {
  //   sysMark() {
  //     return this.basicForm.sysMark
  //   }
  // },
  watch: {
  },
  methods: {
    // 附件的处理
    // 基本信息提交
    submitbasicForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let params = {
            title: this.basicForm.title,
            invitedUsers: this.basicForm.invitedUsers,
            inviteDate: this.basicForm.inviteDate,
            remarks: this.basicForm.remarks
          }
          console.log(params)
          // addOrg(_data).then( res => {
          //   console.log(res)
          // })
        } else {
          return false
        }
      })
    },
    // 取消提交
    cancel() {
      this.$refs['basicForm'].resetFields()
    }
  },
  created() {
    //
  }

}
</script>
<style scoped lang="stylus">
.basic-form
  width 500px
.sys-mark-wrapper
  .input-two
    position absolute
    top 0
    right -110px
    width 100px
</style>
