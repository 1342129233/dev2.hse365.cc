<template>
  <div class="components-container">
    <div class="container">
      <h3 class="title">创建栏目</h3>
      <!-- 基本信息-表单内容 -->
      <el-form class="basic-form" ref="basicForm" :model="basicForm" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="basicForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="分值" prop="point">
          <el-input v-model="basicForm.point" placeholder="分值"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="basicForm.memo" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="typeId">
          <el-input v-model="basicForm.typeId" placeholder="分类"></el-input>
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
import {addCategory} from '@/api/category'
export default {
  data() {
    return {
      activeName: 'first',
      basicForm: {
        title: '',
        point: '0',
        memo: '',
        typeId: '0'
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
          addCategory(this.basicForm.title, this.basicForm.point, this.basicForm.memo, this.basicForm.typeId).then(res => {
            console.log(res)
          })
          this.$router.push({path: '/category'})
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
