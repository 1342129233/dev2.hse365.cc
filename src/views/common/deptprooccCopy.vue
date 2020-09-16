<!-- 必传参数：outerVisible / tabRadio / closeDeptproocc-->
<template>
  <div class="deptproocc">
    <el-dialog :visible.sync="outerDialogVisible" :close-on-click-modal='false' :show-close='false'>
      <!-- <el-row :gutter="53" v-if="modalNameVisible" class="marB20">
        <el-col :span="18">
          <el-select
            v-model="deptModalValue"
            filterable
            allow-create
            placeholder='请选择模版'
            class="select-color"
            popper-class="select-options-color"
            :filter-method="cuSearchDeptTem">
            <el-option key='' label="请选择模版" value=""></el-option>
            <el-option
              v-for="item in deptModalList"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button class="default-btn" @click="cuDeptTem">保存模版</el-button>
          <el-button type="danger">删除模版</el-button>
        </el-col>
      </el-row> -->
      <el-radio-group v-model="tabRadioCurrentValue" class='marB20 radio-color'>
        <!-- <el-radio-button label="dept" v-if="tabRadio.includes('dept')">部门</el-radio-button> -->
        <el-radio-button label="pro" v-if="tabRadio.includes('pro')">工种</el-radio-button>
        <el-radio-button label="occ" v-if="tabRadio.includes('occ')">岗位</el-radio-button>
        <!-- <el-radio-button label="person" v-if="tabRadio.includes('person')">人员</el-radio-button> -->
      </el-radio-group>
      <!-- <div class="tag-group marB20">
        <span class="tag-group__title">可选择多项：</span>
        <span v-show="tabRadioCurrentValue === 'dept'">
          <span v-for="item in tagDeptList" :key="item.id">
            <el-tag effect="dark" closable class="marTRBL5 tag-color" v-if='deptCheckedId.includes(item.id)' @close="deptIsChecked(item)">{{ item.name }}</el-tag>
          </span>
        </span>
        <span v-show="tabRadioCurrentValue === 'pro'">
          <span v-for="item in profession" :key="item.cid">
            <el-tag effect="dark" closable class="marTRBL5 tag-color" v-if='proCheckedId.includes(item.cid)' @close="proIsChecked(item)">{{ item.name }}</el-tag>
          </span>
        </span>
        <span v-show="tabRadioCurrentValue === 'occ'">
          <span v-for="item in occupation" :key="item.cid">
            <el-tag effect="dark" closable class="marTRBL5 tag-color" v-if='occCheckedId.includes(item.cid)' @close="occIsChecked(item)">{{ item.name }}</el-tag>
          </span>
        </span>
      </div> -->
      <el-tabs v-model="defaultDeptTabsValue" type="border-card" @tab-click="handleDeptTabsClick" class="tab-color" v-show="tabRadioCurrentValue === 'dept'">
        <el-tab-pane v-for="items in deptTabs" :label="items.name" :name="items.id" :key="items.id" :pid="items.pid">
          <el-row>
            <el-button type="text" class="text-btn" @click="getChildrenId(items, !isDeptQuSelect)">全选</el-button>
          </el-row>
          <el-badge v-for="item in items.children" :key="item.id" :value="item.num>0?item.num:''" :max="99" class="item">
            <el-button size='mini' :class="deptCheckedId.includes(item.id)?'default-btn default-btn-active':'default-btn'" @click="deptIsChecked(item)">{{item.name}}</el-button>
          </el-badge>
        </el-tab-pane>
      </el-tabs>
      <el-menu mode="horizontal" background-color="#F5F7FA" active-text-color="#38A28A" @select="handleSelect"
      :default-active="PYDefaultValue" v-if="tabRadioCurrentValue === 'pro' || tabRadioCurrentValue === 'occ'">
        <el-menu-item v-for="item in PYArr" :key="item.index" :index="item.index">{{item.text}}</el-menu-item>
        <!-- <el-menu-item index="0">所有</el-menu-item>
        <el-menu-item index="1">AB</el-menu-item>
        <el-menu-item index="2">CD</el-menu-item>
        <el-menu-item index="3">EFG</el-menu-item>
        <el-menu-item index="4">HJ</el-menu-item>
        <el-menu-item index="5">KL</el-menu-item>
        <el-menu-item index="6">MNO</el-menu-item>
        <el-menu-item index="7">PQR</el-menu-item>
        <el-menu-item index="8">STW</el-menu-item>
        <el-menu-item index="9">XYZ</el-menu-item>
        <el-menu-item index="#">#</el-menu-item> -->
      </el-menu>
      <el-card v-show="tabRadioCurrentValue !== 'dept'">
        <el-form v-show="tabRadioCurrentValue === 'person'">
          <el-form-item>
            <el-input v-model="personParams.phoneName" :style="{width: '195px'}" placeholder="请输入人员姓名/手机号" class="input-focus"/>
            <el-select v-model="personParams.deptName" :value-key="personParams.deptId" remote filterable placeholder="请输入部门名称" class="select-color"></el-select>
            <el-button class="primary-btn" icon="el-icon-search" @click="personParams.page = 1;getPersonList(personParams)">筛选</el-button>
          </el-form-item>
        </el-form>
        <el-table v-show="tabRadioCurrentValue === 'person'" :data="personList" row-key="id" border
        :header-cell-style="{backgroundColor: '#F5F7FA'}" @selection-change="selectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="" label="姓名" width="150" align='center'>
            <template slot-scope="scope">
              {{scope.row.truename || scope.row.verifiedMobile}}
            </template>
          </el-table-column>
          <el-table-column prop="dept" label="部门" align='center'></el-table-column>
          <el-table-column prop="profession" label="工种" align='center'></el-table-column>
          <el-table-column prop="occupation" label="岗位" align='center'></el-table-column>
        </el-table>
        <el-pagination v-show="tabRadioCurrentValue === 'person'" :current-page.sync="personParams.page" background layout="prev, pager, next" :total="total-0" hide-on-single-page @current-change="personCurrentChange"></el-pagination>
        <el-row>
            <el-button v-show="tabRadioCurrentValue === 'pro'" type="text" class="text-btn" @click="getProId(newProfession)">全选 / 取消</el-button>
            <el-button v-show="tabRadioCurrentValue === 'occ'" type="text" class="text-btn" @click="getOccId(newOccupation)">全选 / 取消</el-button>
          </el-row>
        <el-button v-show="tabRadioCurrentValue === 'pro'" size='mini' :class="proCheckedId.includes(item.cid)?'default-btn marTRB5 default-btn-active':'default-btn marTRB5'" v-for="item in newProfession" :key="item.id" @click="proIsChecked(item)">{{item.name}}</el-button>
        <el-button v-show="tabRadioCurrentValue === 'occ'" size='mini' :class="occCheckedId.includes(item.cid)?'default-btn marTRB5 default-btn-active':'default-btn marTRB5'" v-for="item in newOccupation" :key="item.id" @click="occIsChecked(item)">{{item.name}}</el-button>
      </el-card>
      <!-- <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" class="primary-btn">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false">确定</el-button>
        </div>
      </el-dialog> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOuterDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeOuterDialog(true)" class='primary-btn'>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'deptproocc',
  props: {
    // 必传参数，且参数值只能是boolean
    outerVisible: {
      type: Boolean,
      default: false
    },
    // 必传参数，且参数值只能是以下四种
    tabRadio: {
      type: Array,
      default: ['dept', 'pro', 'occ', 'preson']
    },
    FproCheckedId: {
      type: Array,
      default: []
    },
    FoccCheckedId: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // innerVisible: false,
      outerDialogVisible: false, // 外部dialogVisible
      tabRadioCurrentValue: this.tabRadio[1], // 当前默认展示（部门、工种、岗位、人员）
      modalNameVisible: false, // 模版名称是否展示
      personParams: {
        phoneName: '', // 人员姓名或手机号
        deptId: '0', // 人员搜索部门id
        deptName: '', // 人员搜索部门名称
        page: 1, // 人员当前页
        per_page: 10 // 人员默认返回条数
      },
      deptCheckedId: [], // 部门选中id
      tagDeptList: [], // tags展示list
      // 部门tabs
      deptTabs: [
        {
          name: '全部',
          id: '0',
          children: [],
          pid: '-1'
        }
      ],
      defaultDeptTabsValue: '0', // 默认选中部门
      deptModalValue: '', // 选中部门工种岗位模版value
      temName: '', // 搜索创建部门工种岗位模版名称
      proCheckedId: [], // 工种选中id
      occCheckedId: [], // 岗位选中id
      isDeptQuSelect: false, // 部门是否全部选中
      isProQuSelect: false, // 工种是否全部选中
      isOccQuSelect: false, // 岗位是否全部选中
      PYObj: {
        '0': {arr: ['*'], text: '全部'},
        '1': {arr: ['A', 'B'], text: 'AB'},
        '2': {arr: ['C', 'D'], text: 'CD'},
        '3': {arr: ['E', 'F', 'G'], text: 'EFG'},
        '4': {arr: ['H', 'J'], text: 'HJ'},
        '5': {arr: ['K', 'L'], text: 'KL'},
        '6': {arr: ['M', 'N', 'O'], text: 'MNO'},
        '7': {arr: ['P', 'Q', 'R'], text: 'PQR'},
        '8': {arr: ['S', 'T', 'W'], text: 'STW'},
        '9': {arr: ['X', 'Y', 'Z'], text: 'XYZ'},
        '#': {arr: ['#'], text: '#'}
      },
      PYArr: [
        {index: '0', text: '全部'},
        {index: '1', text: 'AB'},
        {index: '2', text: 'CD'},
        {index: '3', text: 'EFG'},
        {index: '4', text: 'HJ'},
        {index: '5', text: 'KL'},
        {index: '6', text: 'MNO'},
        {index: '7', text: 'PQR'},
        {index: '8', text: 'STW'},
        {index: '9', text: 'XYZ'},
        {index: '#', text: '#'}
      ],
      PYDefaultValue: '0',
      newProfession: [], // 新的工种列表
      newOccupation: [], // 新的岗位列表
      selectionList: [] // 人员选中列表
    }
  },
  watch: {
    // 通过父组件控制本组件显示隐藏
    outerVisible(newOuterVisible, oldOuterVisible) {
      this.outerDialogVisible = newOuterVisible
    },
    // 监听部门工种岗位人员展示状态
    tabRadio(newTabRadio, oldTabRadio) {
      if(newTabRadio.includes('dept') && newTabRadio.includes('pro') && newTabRadio.includes('occ')) {
        this.modalNameVisible = true
      }else{
        this.modalNameVisible = false
      }
    },
    // 监听tabRadioCurrentValue实现切换
    tabRadioCurrentValue(newTabRadioCurrentValue, oldTabRadioCurrentValue) {
      if(newTabRadioCurrentValue === 'pro' || newTabRadioCurrentValue === 'occ') {
        this.handleSelect(this.PYDefaultValue)
      }
    },
    // 将部门列表赋值到部门tabs列表上渲染
    dept(newDeptList, oldDeptList) {
      this.deptTabs[0].children = newDeptList
    },
    // 监听部门选中个数
    // deptCheckedId(newDeptCheckedId) {
    //   this.deptTabs.map(item => {
    //     item.num = this.deptCheckedCount(item.children)
    //   })
    // }
    FproCheckedId(newFproCheckedId) {
      this.proCheckedId = newFproCheckedId
    },
    FoccCheckedId(newFoccCheckedId) {
      this.occCheckedId = newFoccCheckedId
    }
  },
  computed: {
    ...mapState({
      dept: state => state.common.deptProOccList.dept, // 部门列表
      profession: state => state.common.deptProOccList.profession, // 工种列表
      occupation: state => state.common.deptProOccList.occupation, // 岗位列表
      personList: state => state.common.personListInfo.personList, // 人员列表
      total: state => state.common.personListInfo.total,
      deptModalList: state => state.common.deptModalList // 部门工种岗位模版列表
    })
  },
  methods: {
    ...mapActions(['getDeptProOccList', 'getPersonList', 'getDeptModalList', 'cuDeptTemplate']),
    // 人员选中列表
    selectionChange(selection) {
      this.selectionList = selection
    },
    // 人员分页
    personCurrentChange() {
      this.getPersonList(this.personParams)
    },
    handleSelect(key, keyPath) {
      this.PYDefaultValue = key
      this.newProfession = []
      this.newOccupation = []
      this.PYObj[key].arr.map(item => {
        if(this.tabRadioCurrentValue === 'pro') {
          this.profession.map(ite => {
            if(item === ite.pinyin) {
              this.newProfession.push(ite)
            }else if(item === '#' && !ite.pinyin) {
              this.newProfession.push(ite)
            }else if(item === '*') {
              this.newProfession = this.profession
            }
          })
        }else if(this.tabRadioCurrentValue === 'occ') {
          this.occupation.map(ite => {
            if(item === ite.pinyin) {
              this.newOccupation.push(ite)
            }else if(item === '#' && !ite.pinyin) {
              this.newOccupation.push(ite)
            }else if(item === '*') {
              this.newOccupation = this.occupation
            }
          })
        }
      })
    },
    // 工种全选事件
    getProId(profession) {
      this.isProQuSelect = !this.isProQuSelect
      this.proCheckedId = []
      if(this.isProQuSelect) {
        profession.map(item => {
          this.proCheckedId.push(item.cid)
        })
      }
    },
    // 岗位全选事件
    getOccId(occupation) {
      this.isOccQuSelect = !this.isOccQuSelect
      this.occCheckedId = []
      if(this.isOccQuSelect) {
        occupation.map(item => {
          this.occCheckedId.push(item.cid)
        })
      }
    },
    // 部门全选事件
    getChildrenId(childrenId, isDeptQuSelect) {
      this.isDeptQuSelect = isDeptQuSelect
      if(this.isDeptQuSelect) {
        childrenId.children.map((item, ind) => {
          let pathArr = item.path.split('|')
          if(!this.deptCheckedId.includes(item.id)) {
            this.deptCheckedId.push(item.id)
            this.tagDeptList.map(ite => {
              // console.log(ite)
              if(pathArr.includes(ite.id)) {
                ite.num = ite.num - 0 + childrenId.children.length
              }
              if(item.pid === ite.id) {
                ite.num = childrenId.children.length
              }
            })
            Array.from(new Set(this.deptCheckedId))
          }
          if(item.children && item.children.length) {
            this.getChildrenId(item, this.isDeptQuSelect)
          }
        })
      }else{
        childrenId.children.map((items, inds) => {
          this.deptCheckedId.map((item, ind) => {
            if(items.id === item) {
              this.deptCheckedId.splice(ind, 1)
              this.tagDeptList.map(ite => {
                if(items.pid === ite.id) {
                  ite.num = 0
                }
              })
            }
          })
          if(items.children && items.children.length) {
            this.getChildrenId(items, this.isDeptQuSelect)
          }
        })
      }
    },
    // 模版搜索关键字
    cuSearchDeptTem(temName) {
      this.temName = temName
    },
    // 创建修改部门工种岗位列表
    cuDeptTem() {
      if(this.temName !== '') {
        let deptModalParams = {
          part: this.deptCheckedId,
          profession: this.proCheckedId,
          occupation: this.occCheckedId,
          take_user_id: [],
          name: this.temName
        }
        this.cuDeptTemplate(deptModalParams).then(({data}) => {
          if(data.code === 0) {
            this.$message({type: 'success', message: '创建模版成功'})
            this.getDeptModalList()
          }
        })
      }else{
        this.$message({type: 'error', message: '请输入模版名称'})
      }
    },
    // 更新tagDeptList
    quTagDeptList(tagDeptList) {
      if(tagDeptList) {
        tagDeptList.map((item) => {
          if(item.children) {
            if(item.children.length) {
              this.quTagDeptList(item.children)
              this.tagDeptList = [
                ...this.tagDeptList,
                ...item.children
              ]
              Array.from(new Set(this.tagDeptList))
            }
          }
        })
      }
    },
    // 关闭该组件dialog
    closeOuterDialog(boo) {
      if(!boo) {
        this.deptCheckedId = []
        this.proCheckedId = []
        this.occCheckedId = []
      }else{
        if(!this.proCheckedId.length) {
          this.$message({type: 'warning', message: '请选择工种'})
          return
        }
        if(!this.occCheckedId.length) {
          this.$message({type: 'warning', message: '请选择岗位'})
          return
        }
      }
      let obj = {
        deptCheckedId: this.deptCheckedId,
        proCheckedId: this.proCheckedId,
        occCheckedId: this.occCheckedId
      }
      this.$emit('closeDeptproocc', boo, obj)
    },
    // 部门选中
    deptIsChecked(checkId) {
      // 查看是否有子元素
      if(checkId.children && checkId.children.length) {
        let isDeptTabs = this.deptTabs.map(item => item.id !== checkId.id ? 'true' : 'false')  // 判断导航是否有, 没有就是 true, 有就是 false
        if(!isDeptTabs.includes('false')) {
          let obj = {
            id: checkId.id,
            name: checkId.name,
            pid: checkId.pid,
            path: checkId.path
          }
          let isFalse = checkId.children.map(tem => tem.id === checkId.id ? 'true' : 'false')  // 一级元素等于不等于子元素id  false
          if(!isFalse.includes('true')) {
            checkId.children.unshift(obj)
          }
          this.deptTabs.push(checkId)
        }
        // console.log(this.deptTabs)
        this.defaultDeptTabsValue = checkId.id  // 默认选中部门
      }else{  // 没有子元素
        let pathArr = checkId.path.split('|')
        if(this.deptCheckedId.includes(checkId.id)) {   // this.deptCheckedId 部门选中ID false
          this.deptCheckedId.map((item, ind) => {
            if(item === checkId.id) {
              this.deptCheckedId.splice(ind, 1)
              this.tagDeptList.map(item => {
                if(pathArr.includes(item.id) && item.id !== checkId.id) {
                  if(item.num) {
                    item.num -= 1
                  }else{
                    item.num = ''
                  }
                }
              })
            }
          })
        }else{
          this.deptCheckedId.push(checkId.id)
          this.tagDeptList.map(item => {    // tags展示list
            if(pathArr.includes(item.id) && item.id !== checkId.id) {
              if(item.num) {
                item.num += 1
              }else{
                item.num = 1
              }
            }
          })
        }
      }
    },
    // 工种选中
    proIsChecked(checkId) {
      if(this.proCheckedId.includes(checkId.cid)) {
        this.proCheckedId.map((item, ind) => {
          if(item === checkId.cid) {
            this.proCheckedId.splice(ind, 1)
          }
        })
      }else{
        this.proCheckedId.push(checkId.cid)
      }
    },
    // 岗位选中
    occIsChecked(checkId) {
      if(this.occCheckedId.includes(checkId.cid)) {
        this.occCheckedId.map((item, ind) => {
          if(item === checkId.cid) {
            this.occCheckedId.splice(ind, 1)
          }
        })
      }else{
        this.occCheckedId.push(checkId.cid)
      }
    },
    // 部门级别切换
    handleDeptTabsClick(tab, event) {
      this.deptTabs.map((item, ind) => {
        if(ind > tab.index) {
          this.deptTabs.splice(ind, this.deptTabs.length)
        }
      })
    },
    // 初始化组件
    init() {
      // 调取部门/工种/岗位列表
      this.getDeptProOccList(this.tabRadio).then(({data}) => {
        this.tagDeptList = data.dept || []
        this.newProfession = data.profession
        this.newOccupation = data.occupation
      })
      // 调取人员列表
      this.getPersonList(this.personParams)
      // 调取模版
      this.getDeptModalList()
    }
  },
  mounted() {
    // 初始化组件
    this.init()
  }
}
</script>
<style lang="stylus" scoped>
  .deptproocc >>> .el-dialog
    width 1040px
  .deptproocc >>> .el-radio-button__inner
    width 250px
  .deptproocc >>> .el-dialog__body
    padding-top 0
  // .deptproocc >>> .el-button+.el-button
  //   margin-left 0
  .marTRB5
    margin 5px 5px 5px 0
    // width 100px
  .default-btn-active
    color #ffffff
    background-color #38A28A
  .el-button--text
    color #38A28A
    float right
  .el-badge
    margin 5px 25px 5px 0
  .el-pagination
    text-align center
    margin 10px 0 0 0
</style>
