<template>
  <div class="components-container">
    <div class="container">
      <h3 class="title">创建用户信息</h3>
      <!-- 基本信息-表单内容 -->
      <el-form class="basic-form" ref="basicForm" :model="basicForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="basicForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="basicForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="basicForm.password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="所在单位" prop="org">
          <el-input v-model="basicForm.organizations" placeholder="所在单位"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="basicForm.roles" placeholder="请选择">
            <el-option label="系统管理员" value="1"></el-option>
            <el-option label="采编人员" value="2"></el-option>
            <el-option label="报送人员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="verifiedMobile">
          <el-input v-model="basicForm.verifiedMobile" placeholder="手机号"></el-input>
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
import { addUser } from '@/api/user'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.basicForm.confirmPassword !== '') {
          this.$refs.basicForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码222'))
      } else if (value !== this.basicForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validateMobile = (rule, value, callback) => {
      var re = /^1\d{10}$/
      if(!re.test(value)) {
        callback(new Error('手机格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      basicForm: {
        username: '',
        password: '',
        confirmPassword: '',
        org: '',
        type: '',
        verifiedMobile: ''
      },
      content: '',
      // 基本信息验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        org: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        verifiedMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ]
      }
    }
  },
  // computed: {
  //   sysMark() {
  //     return this.basicForm.sysMark
  //   }
  // },
  // watch: {
  //   'basicForm.sysMark': function(newVal, oldVal) {
  //     if(this.basicForm.sysMarkType === '2') {
  //       this.basicForm.accountMark = newVal
  //     }
  //   }
  // },
  methods: {
    getData() {
      console.log('getData')
    },
    // 基本信息提交
    submitbasicForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let params = {
            nickname: this.basicForm.username,
            password: this.basicForm.password,
            org: this.basicForm.org,
            roles: this.basicForm.type,
            verifiedMobile: this.basicForm.verifiedMobile
          }
          console.log(params)
          addUser(params).then(res => {
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
      this.$router.push({path: '/user/list/user'})
    }
  },
  created () {
    console.log('newadd')
    this.getData()
  },
  mounted () {
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
