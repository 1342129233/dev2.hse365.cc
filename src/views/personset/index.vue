<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/personset">员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <el-form :inline="true">
        <el-form-item label='部门选择' label-width='70px' class='from-item-marb0'>
          <el-cascader :options="yyglbgg_did" :props="{ value: 'id', label: 'name'}" v-model="deptName" :show-all-levels="false" clearable></el-cascader>
        </el-form-item>
        <el-form-item label='工种选择' label-width='70px' class='from-item-marb0'>
          <!-- <el-input label='工种选择' :style="{width: '170px'}" class='input-focus' v-model="pro"/> -->
          <el-select v-model="proId"
              clearable placeholder="请选择工种"
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in yyglbgg_gid"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='岗位选择' label-width='70px' class='from-item-marb0'>
          <el-select v-model="occId"
              clearable placeholder="请选择岗位"
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in yyglbgg_pid"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='' label-width='70px' class='from-item-marb0'>
          <el-input :style="{width: '200px'}" class='input-focus' v-model="keyword" placeholder="请输入用户名/手机号/姓名"/>
        </el-form-item>
        <el-form-item class='from-item-marb0 fr marR0'>
          <el-button class='primary-btn' icon="el-icon-search" @click="sift">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow='always' class='marT20'>
      <div slot="header" class="clearfix">
        <el-breadcrumb class='inline_flex'>
          <el-breadcrumb-item>部门列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class='primary-btn marL10' @click="openDialog({row: null,tit: ''})">添加员工</el-button>
        <el-button class='primary-btn' @click="ExportEmployee">批量导出员工</el-button>
        <!-- <download-excel class="primary-btn" :data="json_data"  name="员工.xls">
          <el-button class='primary-btn' @click="ExportEmployee">批量导出员工</el-button>
        </download-excel> -->
        <el-button class='primary-btn' @click="Import">批量导入员工</el-button>
      </div>
      <el-table :data="newdepartmentList" row-key="id" :header-cell-style="{backgroundColor: '#F5F7FA'}" max-height="500">
        <el-table-column prop='' label='头像' align='center' width="150">
          <template>
            <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
          </template>
        </el-table-column>
        <!-- <el-table-column prop='nickname' label='用户名' align='center' width="150"></el-table-column> -->
        <el-table-column prop='truename' label='真实姓名' align='center' width="150"></el-table-column>
        <el-table-column prop='verifiedMobile' label='手机号' align='center' width="150"></el-table-column>
        <el-table-column prop='did' label='部门' align='center' width="150"></el-table-column>
        <el-table-column prop='gid' label='工种' align='center' width="150"></el-table-column>
        <el-table-column prop='pid' label='岗位' align='center' width="150"></el-table-column>
        <el-table-column prop='createdTime' label='加入时间' align='center' width="150" :formatter="formatDate"></el-table-column>
        <el-table-column prop='' label='操作' align='center' width='200px' fixed="right">
          <template slot-scope="newdepartmentList">
            <!-- <el-button type='text' class="text-btn">修改信息</el-button>
            <el-button type='text' class="text-btn">修改密码</el-button> -->
            <el-button type='text' class="text-btn" @click="openSetDeptProOccDialog(newdepartmentList.$index, newdepartmentList.row)">部门工种岗位设置</el-button>
            <el-button type='text' class="text-btn" @click="openSetDeptProOccdeptpost(newdepartmentList.row)">分配岗位组</el-button>
            <!-- <el-button type='text' class="error-text-btn">删除员工</el-button> -->
            <el-dropdown trigger="click">
              <el-button type='text'>更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="ModifyInformation(newdepartmentList.row, 2)">修改信息</el-dropdown-item>
                <el-dropdown-item @click.native="optionpassworld(newdepartmentList.row)">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="staffDeleteWang(newdepartmentList.row)">删除员工</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="align">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="FYsize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 添加人员 -->
    <el-dialog :title="dialogTit" :visible.sync="dialogFormVisible" v-if="update">
      <el-form :model="personCre">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="personCre.nickname" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="personCre.password" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px">
          <el-input v-model="personCre.password2" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="personCre.verifiedMobile" :style="{width: '400px'}" class='input-focus' maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px">
          <el-input v-model="personCre.truename" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="拼音" label-width="120px">
          <el-input v-model="personCre.pinyin" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120px">
          <el-input v-model="personCre.idcard" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="批次分类" label-width="120px">
          <el-input v-model="personCre.batch_tag" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label='部门选择' label-width="120px">
          <el-cascader clearable :options="yyglbgg_did" :show-all-levels="false" v-model="personCre.did" :props="{ value: 'id', label: 'name'}" @change="handleChange(personCre.did)"></el-cascader>
        </el-form-item>
        <el-form-item label="工种选择" label-width="120px">
          <el-select v-model="personCre.gid"
              multiple
              clearable placeholder="请选择工种"
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in yyglbgg_gid"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位选择" label-width="120px">
          <el-select v-model="personCre.pid"
              multiple
              clearable placeholder="请选择岗位"
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in yyglbgg_pid"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iscloseDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeDialog(false)" class='primary-btn' :loading="addLoading">{{isRevise?'修改':'添加'}}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="passworldFormVisible">
      <el-form :model="passworldmodify">
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="passworldmodify.oldpassworld" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px">
          <el-input v-model="passworldmodify.newpassworld" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ispassworldClose(false)">取 消</el-button>
        <el-button type="primary" @click="passworldClose(false)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="导入员工"
      :visible.sync="ImportEmployees"
      width="30%"
      center>
      <el-upload
        class="upload-demo"
        action="https://dev2.hse365.cc/_api/admin/person/importUser"
        :headers="{'token':token}"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="handsuccessfile"
        :on-error="handerrorfile"
        list-type="picture"
         name="excel">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">导入文件大小不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImportEmployees = false">取 消</el-button>
        <el-button type="primary" @click="ImportEmployeessuccess">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogTit" :visible.sync="Modifyelem">
      <el-form :model="xiougaidata">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="xiougaidata.nickname" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="xiougaidata.verifiedMobile" :style="{width: '400px'}" class='input-focus' maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px">
          <el-input v-model="xiougaidata.truename" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="拼音" label-width="120px">
          <el-input v-model="xiougaidata.pinyin" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120px">
          <el-input v-model="xiougaidata.idcard" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="批次分类" label-width="120px">
          <el-input v-model="xiougaidata.batch_tag" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-radio v-model="xiougaidata.gender" label="male">男</el-radio>
          <el-radio v-model="xiougaidata.gender" label="female">女</el-radio>
          <el-radio v-model="xiougaidata.gender" label="secret">保密</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isModifyelemClone(false)">取 消</el-button>
        <el-button type="primary" @click="ModifyelemClone">确 定</el-button>
      </div>
    </el-dialog>
    <Deptworkjobper
      v-if="showis"
      :pupa="3"
      :tableData="tableData"
      :outerVisible="outerVisible"
      :FproCheckedId="proCheckedId"
      :FoccCheckedId="occCheckedId"
      @closeDeptproocc="closeDeptproocc"
      @closeOuterDialog="closeOuterDialog"
      @ggshua="ggshua"
      :tabRadio="['dept','pro','occ']"
      ></Deptworkjobper>
    <Deptpost
      ref="deptpostclick"
      :tableData="tableData"
      :deptpostVisible="deptpostVisible"
      @clospostrDialog="clospostrDialog"
    ></Deptpost>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import Deptproocc from '../common/deptproocc.vue'
import Deptworkjobper from '../common/deptworkjobper'  // 模板
import Deptpost from '../common/deptpost'  // 分配岗位组
import { getToken } from '@/common/auth'
export default {
  name: 'departmentset',
  components: {
    Deptproocc,
    Deptworkjobper,
    Deptpost
  },
  data() {
    return {
      update: false, // 添加人员组件
      // 分配岗位组
      deptpostVisible: false,
      // 上传文件
      fileList: [],
      token: '',
      total: 1, // 总条数
      FYsize: 10, // 分页每页多少条
      currentPage: 1,  // 当前页数
      newdepartmentList: [], // 部门列表数据
      dialogFormVisible: false, // dialog显示隐藏
      passworldFormVisible: false, // 修改密码隐藏显示
      Modifyelem: false, // 修改员工
      ImportEmployees: false,  // 导入员工
      dialogTit: '添加部门', // dialog title
      addLoading: false, // 添加部门loading
      // 修改密码回显
      passworldmodify: {
        id: '',
        oldpassworld: '',
        newpassworld: ''
      },
      // 部门信息
      departmentInfo: {
        truename: '', // 姓名
        verifiedMobile: '', // 手机号
        did: [], // 部门
        pid: [], // 工种
        gid: []  // 岗位
      },
      keyword: '', // 搜索关键字
      isRevise: false, // 是否是修改部门信息
      outerVisible: false, // 子组件dialogVisible
      setProOccDid: '0', // 要设置的工种岗位部门id
      proCheckedId: [],
      occCheckedId: [],
      deptName: '',  // 筛选部门
      proId: '',     // 筛选工种
      occId: '',     // 筛选岗位
      // 添加员工
      personCre: {
        nickname: '',
        password: '',
        password2: '',
        verifiedMobile: '',
        truename: '',
        pinyin: '',
        batch_tag: '',
        did: '',
        pid: [],
        gid: [],
        idcard: ''
      },
      // 修改员工
      xiougaidata: {
        pinyin: '',
        id: '',
        verifiedMobile: '',
        truename: '',
        nickname: '',
        idcard: '',
        gender: '',
        batch_tag: ''
      },
      // 弹框的当前信息
      tableData: {},
      showis: false
    }
  },
  methods: {
    ...mapActions(['getDepartmentList', 'addStaff', 'reviseDepartmentInfo', 'deleteDepartment', 'setProOcc', 'setEmployeelist', 'Renbgg', 'staffDelete', 'administratorsmodify', 'ExportEmployeelist', 'ImportStaff', 'ModifyEmployeeify']),
    openSetDeptProOccDialog(index, data) {
      this.outerVisible = true
      this.tableData = data
      this.showis = true
    },
    // 刷新
    ggshua() {
      this.setEmployeelist().then(({data}) => {
        this.total = +data.total
        this.newdepartmentList = data.data
      })
    },
    // 时间戳转换
    formatDate(row) {
      let tim = Number(row.createdTime) * 1000
      let date = moment(tim).format('YYYY-MM-DD')
      return date
    },
    // 分配岗位组
    openSetDeptProOccdeptpost(data) {
      this.deptpostVisible = true
      this.tableData = data
      this.$refs.deptpostclick.$emit('setPostdept', this.tableData.id)
    },
    // 关闭分配岗位
    clospostrDialog(val) {
      this.deptpostVisible = val
    },
    // 修改信息
    ModifyInformation(row) {
      this.dialogTit = '修改人员信息'
      let data = {
        pinyin: row.pinyin,
        id: row.id,
        verifiedMobile: row.verifiedMobile,
        truename: row.truename,
        nickname: row.nickname,
        idcard: row.idcard,
        gender: row.gender,
        batch_tag: row.batch_tag
      }
      this.xiougaidata = data
      this.Modifyelem = true
    },
    isModifyelemClone(val) {
      this.Modifyelem = val
    },
    ModifyelemClone() {
      if(this.verificationsong()) {
        this.ModifyEmployeeify(this.xiougaidata).then(data => {
          if(data.data.msg === 'success') {
            this.$message({type: 'success', message: '修改成功'})
            this.handleCurrentChange()
            this.Modifyelem = false
          }else{
            this.$message({type: 'warning', message: '请从新修改'})
          }
        })
      }

      // this.Modifyelem = false
    },
    // 导入员工
    Import() {
      this.ImportEmployees = true
    },
    // 开始导入
    KSImportEmployees() {
      // this.ImportStaff(this.fileList)
      // this.ImportEmployees = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {

    },
    handsuccessfile(response) {
      let data = response.data.allUserData
      let len = response.data.errorInfo
      if(len.length <= 0) {
        this.ImportStaff(data).then((data) => {
          this.$message({type: 'success', message: '上传成功'})
        })
      }
    },
    handerrorfile() {
      this.$message({type: 'warning', message: '上传失败'})
    },
    ImportEmployeessuccess() {
      this.ImportEmployees = false
      this.fileList = []
    },
    // 导出员工列表
    ExportEmployee() {
      let num = {
        export: 'y'
      }
      this.ExportEmployeelist(num).then(data => {
        console.log(data)
      })
    },
    // 提示框
    open(val, title) {
      this.$alert(val, title, {
        dangerouslyUseHTMLString: true
      })
    },
    // 删除员工
    staffDeleteWang(row) {
      // this.staffDelete(row.id)
      this.$confirm(`您确定要删除<${row.nickname}>吗`, '提示', {
        type: 'warning',
        cancelButtonClass: 'default-btn',
        confirmButtonClass: 'error-btn',
        confirmButtonText: '删除'
      })
      .then(() => {
        this.staffDelete(row.id)
        .then(data => {
          if(data.code === 0) {
            this.open('删除成功', '员工消息')
            this.setEmployeelist().then(({data}) => {
              this.total = +data.total
              this.newdepartmentList = data.data
            })
          }else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改密码
    optionpassworld(row) {
      this.passworldmodify.id = row.id
      this.passworldFormVisible = true
    },
    passworldClose(val) {
      if(this.passworldmodify.oldpassworld === '') {
        this.$message({type: 'warning', message: '输入密码不能为空'})
        return true
      }else if(this.passworldmodify.newpassworld === '') {
        this.$message({type: 'warning', message: '输入密码不能为空'})
        return true
      }else if(this.passworldmodify.oldpassworld !== this.passworldmodify.newpassworld) {
        this.$message({type: 'warning', message: '两次输入密码必须保持一致'})
      }else{
        this.administratorsmodify(this.passworldmodify)
        .then((data) => {
          console.log(data.data.code)
          if(data.data.code === 0) {
            this.passworldFormVisible = false
            this.$message({type: 'success', message: '修改成功'})
            this.passworldmodify.oldpassworld = ''
            this.passworldmodify.newpassworld = ''
            this.passworldmodify.id = ''
          }
        })
      }
    },
    ispassworldClose(val) {
      this.passworldFormVisible = false
    },
    // 关闭弹框
    closeOuterDialog(objParams) {
      this.outerVisible = objParams.outerVisible
    },
    // 分页  每页条数
    handleSizeChange(val) {

    },
    // 分页  当前第几页
    handleCurrentChange() {
      let num = {
        page: this.currentPage,
        did: this.deptName[0],
        pid: this.proId,
        gid: this.occId,
        keyword: this.keyword
      }
      this.setEmployeelist(num).then(({data}) => {
        this.total = +data.total
        let sd = data.data
        // this.newdepartmentList = data.data
        this.$set(this.newdepartmentList, 0, sd)
        for(let i = 0; i < sd.length; i++) {
          this.$set(this.newdepartmentList, i, sd[i])
        }
      })
    },
    // 检测提交信息
    verification() {
      let jc = this.personCre
      let reg = /^1[0-9]{10}$/
      if(jc.nickname === '') {
        this.$message({type: 'warning', message: '账号不能为空'})
        return false
      }else if(jc.password === '') {
        this.$message({type: 'warning', message: '密码不能为空'})
        return false
      }else if(jc.password2 === '') {
        this.$message({type: 'warning', message: '再次输入密码不能为空'})
        return false
      }else if(jc.verifiedMobile === '' || jc.verifiedMobile.length <= 10 || !reg.test(jc.verifiedMobile)) {
        this.$message({type: 'warning', message: '请输入正确的手机号码'})
        return false
      }else if(jc.truename === '') {
        this.$message({type: 'warning', message: '真实姓名不能为空'})
        return false
      }else if(jc.pinyin === '') {
        this.$message({type: 'warning', message: '拼音不能为空'})
        return false
      }else if(!jc.idcard || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(jc.idcard)) {
        this.$message({type: 'warning', message: '身份证号不正确'})
        return false
      }else if(jc.batch_tag === '') {
        this.$message({type: 'warning', message: '批次分类不能为空'})
        return false
      }else if(jc.did.length === 0) {
        this.$message({type: 'warning', message: '部门不能为空'})
        return false
      }else if(jc.pid.length === 0) {
        this.$message({type: 'warning', message: '岗位不能为空'})
        return false
      }else if(jc.gid.length === 0) {
        this.$message({type: 'warning', message: '工种不能为空'})
        return false
      }else if(jc.password !== jc.password2) {
        this.$message({type: 'warning', message: '请保证两次输入的密码一直'})
        return false
      }else {
        return true
      }
    },
    verificationsong() {
      let jc = this.xiougaidata
      let reg = /^1[0-9]{10}$/
      if(jc.nickname === '') {  //
        this.$message({type: 'warning', message: '账号不能为空'})
        return false
      }else if(jc.verifiedMobile === '' || jc.verifiedMobile.length <= 10 || !reg.test(jc.verifiedMobile)) {  //
        this.$message({type: 'warning', message: '请输入正确的手机号码'})
        return false
      }else if(jc.truename === '') {  //
        this.$message({type: 'warning', message: '真实姓名不能为空'})
        return false
      }else if(jc.pinyin === '') {   //
        this.$message({type: 'warning', message: '拼音不能为空'})
        return false
      }else if(!jc.idcard || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(jc.idcard)) {  //
        this.$message({type: 'warning', message: '身份证号不正确'})
        return false
      }else if(jc.batch_tag === '') {   //
        this.$message({type: 'warning', message: '批次分类不能为空'})
        return false
      }else {
        return true
      }
    },
    // 弹出dialog
    openDialog({row, tit}) {
      this.dialogFormVisible = true
      if(tit === 'addChildDepartment') {
        this.dialogTit = '添加子部门'
        this.departmentInfo = {
          pid: row.did,
          name: '',
          des: ''
        }
      }else if(tit === 'departmentInfoRevise') {
        this.isRevise = true
        this.dialogTit = '修改部门信息'
        this.departmentInfo = {
          did: row.did,
          name: row.name,
          des: row.des
        }
      }else{
        this.dialogTit = '添加员工'
        this.departmentInfo = {
          truename: '', // 姓名
          verifiedMobile: '', // 手机号
          did: [], // 部门
          pid: [], // 工种
          gid: []  // 岗位
        }
        this.update = true
      }
    },
    // 关闭dialog
    iscloseDialog(val) {
      this.dialogFormVisible = false
      this.personCre.did = ''
      this.update = false
    },
    handleChange(val) {
      let len = val.length - 1
      this.personCre.did = val[len]
    },
    closeDialog(val) {
      if(this.verification()) {
        // console.log(this.personCre.did)
        // this.personCre.did = this.personCre.did[0]
        this.addStaff(this.personCre).then((data) => {
          if(data.code !== 0) {
            this.$message.error(data.msg)
          }else{
            this.addLoading = false
            this.dialogFormVisible = false
            this.$message.success('添加成功')
            this.personCre = {
              nickname: '',
              password: '',
              password2: '',
              verifiedMobile: '',
              truename: '',
              pinyin: '',
              batch_tag: '',
              did: '',
              pid: [],
              gid: [],
              idcard: ''
            }
            this.update = false
          }
          this.setEmployeelist().then(({data}) => {
            this.newdepartmentList = data.data
            this.personCre.did = ''
          }).catch(() => {
            this.ersonCre.did = ''
            this.dialogFormVisible = false
          })
        })
      }
    },
    // 筛选
    sift() {
      let num = {
        page: this.currentPage,
        did: this.deptName[0],
        pid: this.proId,
        gid: this.occId,
        keyword: this.keyword
      }
      this.setEmployeelist(num).then(({data}) => {
        // console.log(data.data)
        this.total = +data.total
        this.newdepartmentList = data.data
      })
      // let itemPath = []
      // let newArrData = []
      // this.siftChild(this.departmentList, itemPath)
      // Array.from(new Set(itemPath))
      // this.departmentList.map(item => {
      //   if(itemPath.includes(item.did)) {
      //     newArrData.push(item)
      //   }
      // })
      // this.newdepartmentList = newArrData
    },
    // 递归查找返回path
    // siftChild(children, itemPath) {
    //   children.map((item, ind) => {
    //     if(item.name.indexOf(this.keyword) !== -1) {
    //       itemPath.push(item.path.split('|')[1])
    //     }else{
    //       if(item.children && item.children.length) {
    //         this.siftChild(item.children, itemPath)
    //       }else{
    //         return false
    //       }
    //     }
    //   })
    // },
    // 下拉选中
    handleCommand({tit, scopeRow}) {
      switch(tit) {
        case 'departmentInfoRevise':
          this.openDialog({tit, row: scopeRow})
          break
        case 'workCategorySet':
          this.openDeptproocc(scopeRow)
          break
        case 'deleteCurrentDepartment':
          this.isDeleteCurrentDepartment(scopeRow)
          break
        default:
          return false
      }
    },
    // 打开子组件dialog
    openDeptproocc(scopeRow) {
      this.setProOccDid = scopeRow.did
      this.outerVisible = true
    },
    // 关闭子组件dialog
    closeDeptproocc(boo, obj) {
      let setProOccParams = {
        did: this.setProOccDid,
        workcid: obj.proCheckedId,
        postcid: obj.occCheckedId
      }
      if(boo) {
        this.setProOcc(setProOccParams).then(({data}) => {
          if(data.code) {
            this.$message({type: 'success', message: '工种岗位设置成功'})
          }else{
            this.$message({type: 'error', message: data.msg})
          }
        })
      }
      this.outerVisible = false
      this.proCheckedId = []
      this.occCheckedId = []
    },
    // 是否删除当前部门
    isDeleteCurrentDepartment(scopeRow) {
      this.$confirm(`您确定要删除<${scopeRow.name}>吗`, '提示', {
        type: 'warning',
        cancelButtonClass: 'default-btn',
        confirmButtonClass: 'error-btn',
        confirmButtonText: '删除'
      }).then(() => {
        this.deleteDepartment(scopeRow.did).then((data) => {
          if(data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {
    ...mapState({
      departmentList: state => state.department.departmentList,
      dept: state => state.common.deptProOccList.dept,
      profession: state => state.common.deptProOccList.profession,
      occupation: state => state.common.deptProOccList.occupation,
      yyglbgg_did: state => state.common.yyglbgg.did,
      yyglbgg_pid: state => state.common.yyglbgg.pid,
      yyglbgg_gid: state => state.common.yyglbgg.gid,
      employeeList: state => state.department.employeeList
    })
  },
  mounted() {
    console.log(moment(this.newdepartmentList.createdtimes).format('YYYY-MM-DD'))
    this.getDepartmentList().then(({data}) => {
      // this.newdepartmentList = data
      // console.log(data)
    })
    this.setEmployeelist().then(({data}) => {
      this.total = +data.total
      this.newdepartmentList = data.data
      console.log(this.newdepartmentList)
    })

    this.Renbgg().then(({data}) => {
      console.log(data)
      // this.newdepartmentList = data.data
    })
  },
  beforeMount() {
    this.token = getToken()
  }
}
</script>
<style lang="stylus" scoped>
  .inline_flex
    display inline-flex
  .fr
    float right
  .marR0
    margin-right 0px
  .el-dropdown-menu__item:hover
    color #38A28A
    border-color #38A28A
  .align
    text-align center
    margin-top 20px
</style>
