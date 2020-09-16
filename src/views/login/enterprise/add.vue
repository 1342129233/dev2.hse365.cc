<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加新机构</span>
      </div>
      <div class="add-content">
        <el-form :model="addEnterpriseFormInfo" ref="addEnterpriseFormInfo" :rules="rules" label-position="right" label-width='151px'>
          <el-radio-group v-model="val" size="medium" v-if="tit === 'addBusiness'">
            <el-radio-button label='0'>企业</el-radio-button>
            <el-radio-button label='1'>安监局</el-radio-button>
            <el-radio-button label='2'>第三方</el-radio-button>
          </el-radio-group>
          <el-form-item label="名称" prop='title'>
            <el-input v-model="addEnterpriseFormInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="简称" prop='mtitle'>
            <el-input v-model="addEnterpriseFormInfo.mtitle"></el-input>
          </el-form-item>
          <el-form-item label="LOGO" prop='data'>
            <el-upload
              class='avatar-uploader'
              :multiple='false'
              :action="avatarUploadUrl"
              accept='.jpg,.gif,.jpeg,.png'
              :before-upload='beforeUpload'
              :on-success='successUpload'
              :file-list="fileList"
              :show-file-list="false"
              :data="QiniuData"
              :on-remove="removeUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100%" height="100%">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传.jpg/.png/.jpeg/.gif文件</div>
            </el-upload>
            <!-- <div class='imgStyle' v-if="dialogImageUrl">
              <img width="100%" :src="dialogImageUrl" alt="">
            </div> -->
          </el-form-item>
          <el-form-item label="区域" prop='areaId'>
            <el-cascader v-model="addEnterpriseFormInfo.areaId"
            :options="PCATreeData"
            :props="{value: 'areaId', label: 'areaName', children: '_child'}"
            clearable></el-cascader>
          </el-form-item>
          <el-form-item label="地址" prop='address'>
            <el-input v-model="addEnterpriseFormInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="最大员工数" prop='maxnum' v-if="!(tit === 'addChildBusiness')">
            <el-input-number v-model="addEnterpriseFormInfo.maxnum" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="可用空间（单位：M）" porp='interspace' v-if="!(tit === 'addChildBusiness')">
            <el-input-number v-model="addEnterpriseFormInfo.interspace" controls-position="right" :min="1" :max="1024"></el-input-number>
          </el-form-item>
          <el-form-item label="到期时间" prop="endTime" v-if="!(tit === 'addChildBusiness')">
            <el-date-picker
              v-model="addEnterpriseFormInfo.endTime"
              format='yyyy-MM-dd'
              value-format='yyyy-MM-dd'
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="负责人" prop='nickname'
          v-if="!(tit === 'editBusiness')">
            <el-input v-model="addEnterpriseFormInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop='mobile'
          v-if="!(tit === 'editBusiness')">
            <el-input v-model="addEnterpriseFormInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='password'
          v-if="!(tit === 'editBusiness')">
            <el-input placeholder="请输入密码" v-model="addEnterpriseFormInfo.password" show-password></el-input>
            <span>6-20位英文、数字、符号、区分大小写</span>
          </el-form-item>
          <el-form-item label="确认密码" prop='confirmPassword'
          v-if="!(tit === 'editBusiness')">
            <el-input placeholder="请输入密码" v-model="addEnterpriseFormInfo.confirmPassword" show-password></el-input>
            <!-- <span>请再次确认密码</span> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addEnterprise('addEnterpriseFormInfo')">完成</el-button>
            <el-button @click="()=>this.$router.push('/enterprise')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'addenterprise',
  data() {
    this.confirmPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addEnterpriseFormInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // https://up-z1.qiniu.com
    return {
      fileList: [],
      avatarUploadUrl: 'https://upload-z1.qiniup.com',
      QiniuData: {
        key: '',
        token: '',
        data: {}
      },
      tit: '',
      imageUrl: '',
      val: 0,
      addEnterpriseFormInfo: {
        // val: 0, // 企业类型
        title: '', // 企业名称
        mtitle: '', // 企业简称
        logo: '', // 企业logo
        areaId: [],
        areaId1: 0, // 省
        areaId2: 0, // 市
        areaId3: 0, // 区
        address: '', // 地址
        maxnum: 1, // 最大人员数
        interspace: 1, // 最大内存
        endTime: '', // 到期时间
        nickname: '', // 负责人
        mobile: '', // 手机号
        password: '', // 密码
        confirmPassword: '', // 确认密码
        pid: this.$route.query.pid || 0, // 父级id
        eid: this.$route.query.eid || 0,
        data: '' // 企业logo
      },
      // 禁止选择当前日期之前的日期
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: {
        title: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        mtitle: [{ required: true, message: '请输入企业简称', trigger: 'blur' }],
        areaId: [{ required: true, message: '请选择区域范围', trigger: 'change' }],
        address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择到期时间', trigger: 'change' }],
        nickname: [{ required: true, message: '请输入企业负责人', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1{1}[0-9]{10}$/, message: '请输入合法手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置密码', trigger: 'blur' },
          { pattern: /^[\w.]{6,20}$/, message: '请设置合法密码', trigger: 'blur' }
        ],
        confirmPassword: [{ required: true, validator: this.confirmPasswordRule, trigger: 'blur' }],
        data: [{ required: true, message: '请上传企业logo', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState({
      PCATreeData: state => state.common.PCATreeData
    })
  },
  methods: {
    ...mapActions(['getUploadToken', 'getPCATree', 'addEnterpriseRes', 'getEnterprise', 'getCompanylist', 'postEnterprise']),
    // 上传企业logo之前
    beforeUpload(file) {
      this.QiniuData.data = file
      // 、随机数
      let timestamp = (new Date()).valueOf()
      let suiji = ''
      for(let i = 0; i < 10; i++) {
        suiji = suiji + Math.ceil(Math.random() * 10)
      }
      // this.QiniuData.key = `${Math.round(new Date() / 1000) + file.name}`
      this.QiniuData.key = `${timestamp}${suiji}${file.name}`
    },
    // 成功上传企业logo
    successUpload({fkey}) {
      this.addEnterpriseFormInfo.data = `https://test.hse365.cc/${fkey}`
      this.imageUrl = this.addEnterpriseFormInfo.data
    },
    // 移除上传logo
    removeUpload() {
      this.addEnterpriseFormInfo.data = ''
    },
    // 添加编辑企业
    addEnterprise(addEnterpriseFormInfo) {
      this.$refs[addEnterpriseFormInfo].validate((valid) => {
        if(valid) {
          this.addEnterpriseFormInfo.areaId1 = this.addEnterpriseFormInfo.areaId[0]
          this.addEnterpriseFormInfo.areaId2 = this.addEnterpriseFormInfo.areaId[1]
          this.addEnterpriseFormInfo.areaId3 = this.addEnterpriseFormInfo.areaId[2]
          if(this.tit === 'editBusiness') {
            this.postEnterprise(this.addEnterpriseFormInfo)
          }else{
            console.log(this.addEnterpriseFormInfo)
            this.addEnterpriseRes(this.addEnterpriseFormInfo).then(({data}) => {
              if(data.code) {
                this.getCompanylist('')
                this.$router.push({path: '/iconset', query: { eid: data.eid, tit: 'funSet' }})
              }else{
                this.$message.error(data.msg)
              }
            }).catch((err) => {
              return err
            })
          }
        }
      })
    },
    init() {
      // 获取上传token
      this.getUploadToken().then(({data}) => {
        this.QiniuData.token = data.token
      }).catch((err) => {
        return err
      })
      // 获取省市区数据
      this.getPCATree()
    }
  },
  watch: {
    '$route': {
      handler(newEid, oldEid) {
        this.addEnterpriseFormInfo.eid = newEid.query.eid
        this.addEnterpriseFormInfo.pid = newEid.query.pid
        this.tit = newEid.query.tit
        this.getEnterprise(this.addEnterpriseFormInfo.eid).then(({data}) => {
          // this.addEnterpriseFormInfo = data.company
          this.addEnterpriseFormInfo.areaId = [data.company.areaId1, data.company.areaId2, data.company.areaId3]
          this.addEnterpriseFormInfo.data = data.company.logo
          this.imageUrl = ''
          let str = this.addEnterpriseFormInfo.data.replace('https://test.hse365.cc/', '')
          this.successUpload({fkey: str})
        }).catch(err => {
          return err
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="stylus" scoped>
  .add-content
    width 50%
    margin 0 auto
    .el-form
      display grid
      .el-radio-group
       margin 0 auto 20px

  .add-content >>> .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px;
    cursor pointer
    position relative
    overflow hidden
    width 178px
    height 178px
  .avatar-uploader .el-upload:hover
    border-color #409EFF
  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 178px
    height 178px
    line-height: 178px
    text-align: center
</style>
