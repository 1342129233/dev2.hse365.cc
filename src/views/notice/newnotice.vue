<template>
  <div class="newnotice">
    <div class="fanhui">
      <el-button @click="Change" class="fanhuis">返回</el-button>
    </div>
    <el-form ref="form" :model="datatables" label-width="80px">
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="domain"
          :data="QiniuData"
          accept='.jpg,.gif,.jpeg,.png'
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="datatables.img" :src="datatables.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="datatables.title"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        <el-card style="height: 440px;">
          <quill-editor v-model="datatables.content" ref="myQuillEditor" style="height: 300px;" :options="editorOption">
          </quill-editor>
        </el-card>
      </el-form-item>
      <el-form-item label="发布范围">
        <el-radio-group v-model="datatables.type" size="small">
          <el-radio-button label="0">本企业公开</el-radio-button>
          <el-radio-button label="1"><div  @click="custom">自定义</div></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发布时间">
        <div class="block">
          <el-date-picker
            v-model="xsTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addnot">提交</el-button>

    <Deptworkjobper
      :outerVisible="outerVisible"
      :tabRadio="['dept','pro','occ','person']"
      :tableData="tableData"
      :pupa="4"
      @customoff="customoff"
      @tsplay="tsplay"
    ></Deptworkjobper>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Deptworkjobper from '../common/deptworkjobper'  // 模板
// import Deptproocc from '../common/deptproocc.vue'
export default {
  name: 'newNotice',
  props: ['establish'],
  model: {
    prop: 'establish',
    event: 'establishClick'
  },
  data() {
    return {
      domain: 'https://upload-z1.qiniup.com', // 七牛云的上传地址（华南区）
      QiniuData: {
        key: '', // 图片名字处理
        token: '' // 七牛云token
      },
      outerVisible: false, // 子组件dialogVisible
      // 弹框的当前信息
      tableData: {
        didId: [],
        gidArrs: [],
        pidArrs: [],
        personArrs: []
      },
      host: '',  // 本地地址
      content: null,
      editorOption: {},
      fit: 'fill',
      form: {
        name: '',
        desc: '',
        img: '',
        times: '',
        range: 'left'
      },
      xsTime: '',  // 发布时间
      datatables: {
        title: '',
        content: '',
        img: '',
        id: '',
        type: 0,  // 0 是所有人 1 是选择部门工种岗位人员
        releaseTime: '',  // 发布时间
        did: '',  // 部门
        gid: [],  // 工种
        pid: [],  // 岗位
        member: []  // 人员
      }
    }
  },
  components: {
    quillEditor,
    Deptworkjobper
  },
  beforeMount() {
    // 请求 token
    this.qiniuyunrunning().then(({data}) => {
      this.QiniuData.token = data.token
      this.host = data.host
    })
  },
  methods: {
    ...mapActions(['qiniuyunrunning', 'rotationrunning', 'addOrUpdateStaff']),
    Change() {
      this.$emit('establishClick', 1)
    },
    // 打开
    custom() {
      this.outerVisible = true
    },
    // 关闭
    customoff(objParams) {
      this.outerVisible = objParams.outerVisible
    },
    handleAvatarSuccess(res, file) {
      this.datatables.img = `${this.host}/${res.fkey}`
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
    // 更新值
    tsplay(data) {
      this.tableData = {}
      this.tableData = data
      // console.log(data)
      this.datatables.did = ''
      this.datatables.gid = []
      this.datatables.pid = []
      this.datatables.did = data.didId
      this.datatables.gid = data.gidArrs
      this.datatables.pid = data.pidArrs
      this.datatables.personArrs = data.member
      this.datatables.member = this.datatables.personArrs
    },
    addnot() {
      this.datatables.releaseTime = this.timecurrent(this.xsTime)
      if(this.datatables.img === '') {
        this.$message({
          message: '图片检测不到',
          type: 'warning'
        })
      } else if (this.datatables.title === '') {
        this.$message({
          message: '名字检测不到',
          type: 'warning'
        })
      } else if (this.datatables.content === '') {
        this.$message({
          message: '内容检测不到',
          type: 'warning'
        })
      } else if (isNaN(this.datatables)) {
        this.$message({
          message: '时间检测不到',
          type: 'warning'
        })
      } else if (this.datatables.did === '') {
        this.$message({
          message: '部门不能为空',
          type: 'warning'
        })
      } else if (this.datatables.gid.length === 0) {
        this.$message({
          message: '工种不能为空',
          type: 'warning'
        })
      } else if (this.datatables.pid.length === 0) {
        this.$message({
          message: '岗位不能为空',
          type: 'warning'
        })
      } else if (this.datatables.member.length === 0) {
        this.$message({
          message: '人员不能为空',
          type: 'warning'
        })
      }else {
        this.addOrUpdateStaff(this.datatables).then(() => {  // this.mobal.take_user_id
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
      }
    },
    // 处理时间，变成时间戳
    timecurrent(xsTime) {
      let a = xsTime.toString()
      let d = new Date(a)
      d = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate()) + ' ' + this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      let s = new Date(d).getTime()
      let timeor = s / 1000
      return timeor
    },
    p(s) {
      return s < 10 ? '0' + s : s
    }
  }
}
</script>
<style scoped lang="stylus">
.fanhuis {
  float: right;
}
.fanhui:before, .fanhui:after {
  content: '';
  display: table;
}
.fanhui::after {
  display: block;
  content: "";
  clear: both;
}
..fanhui {
  *zoom: 1;
}
</style>
<style lang="stylus">
.newnotice {
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
}
</style>
