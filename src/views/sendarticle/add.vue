<template>
  <div class="components-container">
    <div class="container">
      <h3 class="title">创建报送信息</h3>
      <!-- 基本信息-表单内容 -->
      <el-form class="basic-form" ref="basicForm" :model="basicForm" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="basicForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
          <el-input v-model="basicForm.subTitle" placeholder="副标题"></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input type="textarea" rows="8" placeholder="正文" v-model="basicForm.content"></el-input>
        </el-form-item>
        <el-form-item label="是否约稿" prop="isInvited">
          <el-radio v-model="basicForm.isInvited" label="1">是</el-radio>
          <el-radio v-model="basicForm.isInvited" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="附件" prop="attachment">
          <el-button>上传附件</el-button>
        </el-form-item>
        <el-form-item label="选择栏目" prop="category">
          <el-select v-model="basicForm.category" placeholder="请选择">
            <el-option label="系统管理员" value="1"></el-option>
            <el-option label="采编人员" value="2"></el-option>
            <el-option label="报送人员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择分类" prop="articletype">
          <el-select v-model="basicForm.articletype" placeholder="请选择">
            <el-option label="系统管理员" value="1"></el-option>
            <el-option label="采编人员" value="2"></el-option>
            <el-option label="报送人员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用积分" prop="pointtype">
          <el-select v-model="basicForm.pointtype" placeholder="请选择">
            <el-option label="栏目积分" value="1"></el-option>
            <el-option label="分类积分" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分" prop="point">
          <label>5</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitbasicForm('basicForm')">保存</el-button>
          <el-button type="primary" @click="submitbasicForm('basicForm')">上报</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addArticle} from '@/api/articles'
export default {
  data() {
    return {
      activeName: 'first',
      basicForm: {
        title: '',
        subTitle: '',
        content: '',
        isInvited: '1',
        category: '0',
        articletype: '0',
        pointtype: '0'
      },
      // 基本信息验证规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择栏目', trigger: 'change' }
        ],
        articletype: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
            subTitle: this.basicForm.subTitle,
            body: this.basicForm.content,
            invitearticleId: this.basicForm.isInvited,
            categoryId: this.basicForm.category,
            typeId: this.basicForm.articletype
          }
          console.log(params)
          addArticle(params).then(res => {
            console.log(res)
          })
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
