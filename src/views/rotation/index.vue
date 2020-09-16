<template>
  <div class="rotation">
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/rotation">轮播图设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="item in tables" :key="item.id" :label="item.name" :name="item.id">
          <el-form :label-position="labelPosition" label-width="80px" :model="item">
            <el-form-item label="名称">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="跳转地址">
              <el-upload
                class="avatar-uploader"
                :action="domain"
                :data='QiniuData'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="item.img" :src="item.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="图片链接">
              <el-input v-model="item.jumpUrl"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="item.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <el-switch v-model="item.status"></el-switch>
            </el-form-item>
            <el-button type="danger" class="submiting" @click="submitClick(item.id)">提交</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'rotation',
  data() {
    return {
      labelPosition: 'right',  // 右对齐
      activeName: '', // 默认选中
      tables: [],
      domain: 'https://upload-z1.qiniup.com', // 七牛云的上传地址（华南区）
      QiniuData: {
        key: '', // 图片名字处理
        token: '' // 七牛云token
      },
      host: ''
    }
  },
  beforeMount() {
    // 请求 token
    this.qiniuyunrunning().then(({data}) => {
      this.QiniuData.token = data.token
      this.host = data.host
    })
    this.rotationrunning().then(({data}) => {
      this.tables = data
      this.activeName = data[0].id
    })
  },
  methods: {
    ...mapActions(['qiniuyunrunning', 'rotationrunning', 'setrotationrunning']),
    handleAvatarSuccess(res, file) {
      // let imageUrl = URL.createObjectURL(file.raw);
      this.tables.map(item => {
        if(item.id === this.activeName) {
          item.img = `${this.host}/${res.fkey}`
        }
      })
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      // return extension && isLt2M
      // 、随机数
      let timestamp = (new Date()).valueOf()
      let suiji = ''
      for(let i = 0; i < 10; i++) {
        suiji = suiji + Math.ceil(Math.random() * 10)
      }
      this.QiniuData.key = `${timestamp}${suiji}${file.name}`
    },
    submitClick(id) {
      const connt = this.tables.filter(item => {
        return item.id === id
      })
      this.setrotationrunning(connt).then(data => {
        if(data.code === 0) {
          this.$message.success('提交成功')
          this.rotationrunning().then(({data}) => {
            this.tables = data
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .submiting {
    float: right;
  }
</style>
