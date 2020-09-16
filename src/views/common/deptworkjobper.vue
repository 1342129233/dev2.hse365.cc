<!-- 部门工种岗位人员组件 -->
<!--
必传属性：
  outerVisible：false（默认）控制本组件显示隐藏配合closeOuterDialog使用
必传事件：
  closeOuterDialog：通过父组件来实现显示隐藏
-->
<template>
  <div class="deptworkjobper">
    <!-- 外部dialog -->
    <el-dialog :visible="outerVisible" :show-close="false">
      <!-- 设置模版 -->
      <el-row :gutter="53" class="marB20">
        <el-col :span="6">
          <el-input v-model="mobal.name" placeholder="请输入模板名称"></el-input>
        </el-col>
        <!-- Template -->
        <el-col :span="10">
          <el-select
            v-model="deptWorkJobTemValue"
            filterable
            allow-create
            placeholder='请选择模版'
            class="select-color"
            popper-class="select-options-color">
            <el-option key='' label="未选中模板" value=""></el-option>
            <el-option
              v-for="item in deptWorkJobTemList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="success" @click="switchmodel">确定</el-button>
          <el-button class="default-btn" @click="preservation">保存模版</el-button>
          <el-button type="danger" @click="delmodel">删除模版</el-button>
        </el-col>
      </el-row>
      <!-- 部门/工种/岗位/人员 radio -->
      <el-radio-group v-model="tabRadioCurrentValue" class='marB20 radio-color'>
        <el-radio-button label="dept" v-if="tabRadio.includes('dept')">部门</el-radio-button>
        <el-radio-button label="pro" v-if="tabRadio.includes('pro')">工种</el-radio-button>
        <el-radio-button label="occ" v-if="tabRadio.includes('occ')">岗位</el-radio-button>
        <el-radio-button label="person" v-if="tabRadio.includes('person')">人员</el-radio-button>
      </el-radio-group>
      <!-- 部门content -->
      <el-tabs v-model="defaultDeptTabsValue" type="border-card" @tab-click="handleDeptTabsClickdept" class="tab-color" v-show="tabRadioCurrentValue === 'dept'" @tab-remove="removeTab">
        <el-tab-pane v-for="items in deptTabs" :label="items.name" :name="items.id" :key="items.id" :pid="items.pid">
          <!-- 数据 -->
          <span v-for="item in items.children" :key="item.id" >
            <el-button style="margin: 5px" :type="item.id == tableData.didId?'danger':''" @click="deptClick(item)">{{item.name}}</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
      <!-- 字母 -->
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
      <!-- 工种content -->
      <el-tabs type="border-card" class="tab-color" v-show="tabRadioCurrentValue === 'pro'">
        <el-row>
          <el-button type="text" class="text-btn marL10" @click="isgidcontent">取消全选</el-button>
          <el-button type="text" class="text-btn" @click="gidcontentgz">全选</el-button>
        </el-row>
        <!-- 数据 -->
        <!-- <span v-for="item in newOccupation" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.gidArrs.indexOf(item.cid) != -1?'danger':''" @click="occClick(item.cid)">{{item.name}}</el-button>
        </span> -->
        <span v-for="item in newProfession" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.gidArrs.indexOf(item.cid) != -1?'danger':''" @click="occClick(item.cid)">{{item.name}}</el-button>
        </span>
      </el-tabs>
      <!-- 岗位content -->
      <el-tabs type="border-card" class="tab-color" v-show="tabRadioCurrentValue === 'occ'">
        <el-row>
          <el-button type="text" class="text-btn marL10" @click="ispidcontent">取消全选</el-button>
          <el-button type="text" class="text-btn" @click="pidcontent">全选</el-button>
        </el-row>
        <!-- 数据 -->
        <span v-for="item in newOccupation" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.pidArrs.indexOf(item.cid) != -1?'danger':''" @click="proClick(item.cid)">{{item.name}}</el-button>
        </span>
      </el-tabs>
      <!-- 人员 content -->
      <el-tabs type="border-card" class="tab-color" v-if="tabRadio.includes('person')" v-show="tabRadioCurrentValue === 'person'">
        <!-- <el-row>
          <el-button type="text" class="text-btn marL10" @click="ispidcontent">取消全选</el-button>
          <el-button type="text" class="text-btn" @click="pidcontent">全选</el-button>
        </el-row> -->
        <!-- 数据 -->
        <!-- <span v-for="item in person" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.personArrs.indexOf(item.id) != -1?'danger':''" @click="personClick(item.id)">{{item.truename}}</el-button>
        </span> -->
        <el-row class="tablemarg">
          <el-col :span="6">
            <el-input v-model="UserLists.keyword" placeholder="请输入姓名/手机号"></el-input>
          </el-col>
          <el-col :span="16"></el-col>
          <el-col :span="2" class="rightTable">
            <el-button type="success" @click="sousuo">搜索</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="person"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="truename"
            label="姓名"
            width="120"
          >
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column
            prop="dept"
            label="部门"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="profession"
            label="工种"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="occupation"
            label="岗位"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <div
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          class="loadingclass"
          v-if="loading"
        >
        </div>
        <div v-if="!loading" class="loadingclass" @click="personload">加载更多...</div>
      </el-tabs>
      <!-- 外部dialog footer -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOuterDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeOuterDialog(false);handleConfirmUseLayoutBtn()" class='primary-btn'>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'deptworkjobper', // 组件name
  props: {
    // 组件visible
    outerVisible: {
      type: Boolean,
      default: false
    },
    pupa: {
      // 3 是人员关闭权限 4 是 通知公告关闭权限
      type: Number,
      default: '0'
    },
    // show 部门/工种/岗位/人员
    tabRadio: {
      type: Array,
      default: []
    },
    // 传过来点击当前条信息
    tableData: {
      type: Object,
      default: () => {
        return {}
      }
    }
    // 父组件传过来的deptCheckItem
    // deptCheckItemProp: {
    //   type: Array,
    //   default: []
    // }
  },
  data() {
    return {
      renyuan: [],
      // 模板名称
      mobal: {
        name: '',
        part: '',  // 部门
        profession: [],  // 工种id数组
        occupation: [],  // 岗位id数组
        take_user_id: [],  // 用户id数组
        id: 0
      },
      loading: false,
      deptWorkJobTemList: [], // 模版列表
      deptWorkJobTemValue: '', // 选中模版value
      tabRadioCurrentValue: this.tabRadio[1], // 当前tabRadio
      defaultDeptTabsValue: '0', // 默认选中deptTabs
      // 部门tabs
      deptTabs: [
        {
          name: '全部',
          id: '0',
          children: [],
          pid: '-1'
        }
      ],
      // 工种tabs
      proTabs: [
        // {
        //   name: '全部',
        //   id: '0',
        //   children: [],
        //   pid: '-1'
        // }
      ],
      // 岗位tabs
      occTabs: [
        // {
        //   name: '全部',
        //   id: '0',
        //   children: [],
        //   pid: '-1'
        // }
      ],
      // 人员
      person: [

      ],
      // 人员搜索的分页
      UserLists: {
        keyword: '',  // 关键词，可按用户名、手机号、真实姓名搜索
        page: 1,  // 页码
        dept_id: '',  // 部门 id
        profession: '',  // 工种 id
        occupation: ''  // 岗位 id
      },
      deptCheckedId: [], // 部门选中id
      // 提交的
      tijiao: {
        id: '',
        did: '',
        gid: [],
        pid: []
      },
      // 提交人员
      tijiaoper: [],
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
      newProfession: [], // 新的岗位列表
      newOccupation: [], // 新的工种列表
      selectionList: [],
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
      }
    }
  },
  watch: {
    // 初始化dept tabs列表 部门
    dept(newDept) {
      this.deptTabs[0].children = newDept.dept
      // this.proTabs = newDept.profession
      // this.occTabs = newDept.occupation
      // console.log(this.proTabs[0].children)
      // console.log(this.deptTabs[0].children.dept)
      // console.log(this.deptTabs[0].children.profession)
      // console.log(this.deptTabs[0].children.occupation)
    },
    // tabRadioCurrentValue(newName) {
    //   this.tabRadioCurrentValue = newName
    // },
    // 切换工种部门岗位
    tabRadioCurrentValue(newTabRadioCurrentValue, oldTabRadioCurrentValue) {
      if(newTabRadioCurrentValue === 'pro' || newTabRadioCurrentValue === 'occ') {
        this.handleSelect(this.PYDefaultValue)
      }
    },
    // 监听传过来的数值
    tableData: {
      handler: function (newVal, oldVal) {
      },
      deep: true,
      // 代表开启深度监控。意思是数据的任何一个属性发生变化，监视函数需要执行
      immediate: true
      // 如果immediate 设置为true, 代表代码一加载 立马执行监视函数
    }
    // 岗位
    // occupation(newDept) {
    //   this.deptTabs[0].children = newDept
    // }
    // 初始化部门选中item及tabs列表
    // deptCheckItemProp: {
    //   handler(newDeptCheckItem) {
    //     this.deptCheckId = []
    //     newDeptCheckItem.map(item => {
    //       this.deptCheckId.push(item.id)
    //     })
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    ...mapActions(['getDeptProOccList', 'settinging', 'selectUserListStaff', 'cuStaff', 'delStaff', 'listStaff']),
    sousuo() {
      this.UserLists.page = 1
      this.person = []
      this.selectUserListStaff(this.UserLists).then(({data}) => {
        this.person = data.data
      })
    },
    // 删除模板
    delmodel() {
      this.delStaff(this.deptWorkJobTemValue).then((data) => {
        if(data.code === 0) {
          this.$message({
            message: '模板删除成功',
            type: 'success'
          })
          this.listStafflist()
        }else {
          this.$message.error('模板删除失败')
        }
      })
      // console.log(this.deptWorkJobTemValue)
    },
    // 切换模板
    switchmodel() {
      if(this.deptWorkJobTemValue === '') {
        this.empty()
        this.toggleSelection()
      }else {
        this.renyuan = []
        this.toggleSelection()

        this.deptWorkJobTemList.forEach((item) => {
          if(item.id === this.deptWorkJobTemValue) {
            this.empty()
            if(this.tabRadio.includes('person')) {
              this.tableData.didId = item.part[0]
              this.tableData.pidArrs = item.occupation
              this.tableData.gidArrs = item.profession
              this.renyuan = item.take_user_id
            } else {
              this.tableData.didId = item.part[0]
              this.tableData.pidArrs = item.occupation
              this.tableData.gidArrs = item.profession
              this.tijiao.did = item.part[0]
              this.tijiao.gid = item.profession
              this.tijiao.pid = item.occupation
            }
          }
        })
        if(this.tabRadio.includes('person')) {
          for(let i = (this.UserLists.page - 1) * 10; i < (this.UserLists.page) * 10; i++) {  // this.person.length
            if(this.renyuan.includes(this.person[i].id)) {
              this.toggleSelection([this.person[i]])
            }
          }
        }
      }
      this.listStafflist()
    },
    // 人员选中
    toggleSelection(rows) {
      if(this.tabRadio.includes('person')) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
    },
    // 清空方法
    empty() {
      this.tableData.didId = ''
      this.tableData.gidArrs = []
      this.tableData.pidArrs = []
      this.tijiaoper = []
    },
    // 创建模板
    preservation() {
      // this.mobal: {
      //   name: '',
      //   part: '',  // 部门
      //   profession: '',  // 工种id数组
      //   occupation: '',  // 岗位id数组
      //   take_user_id: '',  // 用户id数组
      //   id: ''
      // }
      if(this.mobal.name === '') {
        this.$message({
          message: '模板名称不能为空',
          type: 'warning'
        })
      }else{
        this.mobal.part = this.tijiao.did
        this.mobal.profession = this.tijiao.gid
        this.mobal.occupation = this.tijiao.pid
        this.tijiaoper.forEach((item) => {
          this.mobal.take_user_id.push(item.id)
        })
        this.cuStaff(this.mobal).then((data) => {
          if(data.code === 0) {
            this.$message({
              message: '保存模板成功',
              type: 'success'
            })
            this.mobal.name = ''
            this.listStafflist()
          }
        })
      }
    },
    // 人员加载更多
    personload() {
      this.loading = true
      this.UserLists.page += 1
      this.selectUserListStaff(this.UserLists).then(({data}) => {
        let dbcont = data.data
        for(let i = 0; i < dbcont.length; i++) {
          this.person.push(dbcont[i])
        }

        // this.renyuan = []
        // this.toggleSelection()

        // this.deptWorkJobTemList.forEach((item) => {
        //   if(item.id === this.deptWorkJobTemValue) {
        //     this.empty()

        //     this.tableData.didId = item.part[0]
        //     this.tableData.pidArrs = item.occupation
        //     this.tableData.gidArrs = item.profession
        //     renyuan = item.take_user_id
        //   }
        // })

        for(let i = (this.UserLists.page - 1) * 10; i < (this.UserLists.page) * 10; i++) {  // this.person.length
          if(this.renyuan.includes(this.person[i].id)) {
            this.toggleSelection([this.person[i]])
          }
        }

        this.loading = false
      })
    },
    // 人员选中
    handleSelectionChange(val) {
      this.tijiaoper = val
    },
    // 关闭dialog，点击确定要通过父组件将outerVisible设置为false来关闭，否则不关闭
    closeOuterDialog(boo) {
      let objParams = {
        outerVisible: boo
      }
      if(this.pupa === 3) {
        this.$emit('closeOuterDialog', objParams)
      }else if (this.pupa === 4) {
        this.$emit('customoff', objParams)
      }
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
    // 部门级别切换
    handleDeptTabsClickdept(tab, event) {
      this.deptTabs.map((item, ind) => {
        if(ind > tab.index) {
          this.deptTabs.splice(ind, this.deptTabs.length)
        }
      })
    },
    // pid 全选
    pidcontent() {
      let professionPro = this.newOccupation
      this.tableData.pidArrs = []
      for(let i = 0; i < professionPro.length; i++) {
        this.tableData.pidArrs.push(professionPro[i].cid)
        this.tijiao.pid.push(professionPro[i].cid)
      }
      this.tijiao.pid = [...new Set(this.tijiao.pid)]
    },
    // pid 全取消
    ispidcontent() {
      this.tableData.pidArrs = []
      this.tijiao.pid = []
    },
    // gid 全选 (工种)
    gidcontentgz() {
      let occupationPro = this.newProfession
      console.log(this.tableData)
      this.tableData.gidArrs = []
      for(let i = 0; i < occupationPro.length; i++) {
        this.tableData.gidArrs.push(occupationPro[i].cid)
        this.tijiao.gid.push(occupationPro[i].cid)
      }
      this.tijiao.gid = [...new Set(this.tijiao.gid)]
    },
    // gid 全取消
    isgidcontent() {
      this.tableData.gidArrs = []
      this.tijiao.gid = []
    },
    // 提交
    handleConfirmUseLayoutBtn() {
      if(this.pupa === 3) {
        this.settinging(this.tijiao).then(data => {
          let del = data.data.code
          if(del === 0) {
            this.$emit('ggshua')
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            })
          }else{
            this.$message.error('错了哦，修改失败')
          }
        })
      } else if (this.pupa === 4) {
        // 通知公告
        this.tijiaoper.forEach((item) => {
          this.mobal.take_user_id.push(item.id)
        })
        this.tableData.member = this.mobal.take_user_id
        this.$emit('tsplay', this.tableData)
      }
    },
    // 部门级别切换
    handleDeptTabsClick(tab, event) {
      // this.deptTabs.map((item, ind) => {
      //   if(ind > tab.index) {
      //     this.deptTabs.splice(ind, this.deptTabs.length)
      //   }
      // })
    },
    // 部门选中
    deptIsChecked(checkItem) {
      if(checkItem.children && checkItem.children.length) {
        let isDeptTabs = this.deptTabs.map(item => item.id !== checkItem.id ? 'true' : 'false')
        if(!isDeptTabs.includes('false')) {
          let obj = {
            id: checkItem.id,
            name: checkItem.name,
            pid: checkItem.pid,
            path: checkItem.path
          }
          let isFalse = checkItem.children.map(tem => tem.id === checkItem.id ? 'true' : 'false')
          if(!isFalse.includes('true')) {
            checkItem.children.unshift(obj)
          }
          this.deptTabs.push(checkItem)
        }
        this.defaultDeptTabsValue = checkItem.id
      }else{
        // this.$emit('upDeptCheckItemProp', checkItem)
        if(this.deptCheckedId.includes(checkItem.id)) {
          this.deptCheckedId.map((item, ind) => {
            if(item === checkItem.id) {
              this.deptCheckedId.splice(ind, 1)
              this.tagDeptList.map(item => {
                if(checkItem.pid === item.id) {
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
          this.deptCheckedId.push(checkItem.id)
          this.tagDeptList.map(item => {
            if(checkItem.pid === item.id) {
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
    // 循环
    // xunhuan(arr) {
    //   if(arr.children && arr.children.length) {
    //     this.xunhuan(arr.children)
    //   }else{
    //     this.tableData.didId = arr.id
    //     this.tijiao.did = arr.id
    //   }
    // },
    // 部门选中
    deptClick(checkItem) {
      if(checkItem.children && checkItem.children.length) {
        let obj = {
          name: checkItem.name,
          id: checkItem.id,
          children: checkItem.children,
          pid: checkItem.pid
        }
        let deptTabs = this.deptTabs
        let val = []
        deptTabs.forEach(item => {
          if(item.id === obj.id) {
            val.push('true')
          }else{
            val.push('false')
            // this.deptTabs.push(obj)
          }
        })
        let a = val.includes('true')
        if(!a) {
          this.deptTabs.push(obj)
          this.defaultDeptTabsValue = checkItem.id
        }
        // console.log(this.deptTabs)
      }else{
        this.tableData.didId = checkItem.id
        this.tijiao.did = checkItem.id
      }
    },
    // 移除
    removeTab(targetName) {
      let deptTabs = this.deptTabs
      for(let i = 0; i < deptTabs.length; i++) {
        if(deptTabs[i].id === targetName) {
          this.deptTabs.splice(i, 1)
          if(this.deptTabs.length <= 1) {
            this.defaultDeptTabsValue = '0'
          }else {
            this.defaultDeptTabsValue = deptTabs[i - 1].id
          }
        }
      }
    },
    // 岗位
    proClick(name) {
      if(this.tableData.pidArrs.includes(name)) {
        let xia = this.tableData.pidArrs.indexOf(name)
        this.tableData.pidArrs.splice(xia, 1)
      }else{
        this.tableData.pidArrs.push(name)
      }
      this.tijiao.pid = this.tableData.pidArrs
    },
    occClick(name) {
      if(this.tableData.gidArrs.includes(name)) {
        let xia = this.tableData.gidArrs.indexOf(name)
        this.tableData.gidArrs.splice(xia, 1)
      }else{
        this.tableData.gidArrs.push(name)
      }
      this.tijiao.gid = this.tableData.gidArrs
    },
    personClick(name) {
      if(this.tableData.personArrs.includes(name)) {
        let xia = this.tableData.personArrs.indexOf(name)
        this.tableData.personArrs.splice(xia, 1)
      }else{
        this.tableData.personArrs.push(name)
      }
      this.tijiao.pid = this.tableData.personArrs
    },
    // 调取部门/工种/岗位列表
    init() {
      this.getDeptProOccList(this.tabRadio).then(({data}) => {
        this.deptTabs[0].children = data.dept // 部门
        this.newProfession = data.profession  // 工种
        this.newOccupation = data.occupation  // 岗位
        // this.person = data.person
      })
      this.selectUserListStaff(this.UserLists).then(({data}) => {
        this.person = data.data
      })
    },
    // 模板列表及其内容
    listStafflist() {
      this.deptWorkJobTemList = []

      this.deptWorkJobTemValue = ''
      this.listStaff().then(({data}) => {
        this.deptWorkJobTemList = data
      })
    }

  },
  computed: {
    ...mapState({
      // dept: state => state.common.deptProOccList.dept
      dept: state => state.common.deptProOccList,
      profession: state => state.common.deptProOccList.profession, // 工种列表
      occupation: state => state.common.deptProOccList.occupation  // 岗位列表
      // occupation: state => state.common.deptProOccList.occupation,
      // profession: state => state.common.deptProOccList.profession
    })
  },
  beforeMount() {
    this.tijiao.id = this.tableData.id
    this.tijiao.did = this.tableData.didId
    this.tijiao.pid = this.tableData.pidArrs
    this.tijiao.gid = this.tableData.gidArrs
    // 模板列表及其内容
    this.listStafflist()
    // this.listStaff().then(({data}) => {
    //   this.deptWorkJobTemList = data
    // })
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="stylus" scoped>
.loadingclass {
  width:100%;
  height: 20px;
  text-align:center;
  color: #000;
  margin-top: 20px;
}
.tablemarg {
  margin: 10px 0px;
}
.rightTable {
  float: right;
}
.deptworkjobper >>> .el-dialog
  width 1040px
.deptworkjobper >>> .el-radio-button__inner
  width 250px
.deptworkjobper >>> .el-dialog__body
  padding-top 0
.el-button--text
  color #38A28A
  float right
.el-badge
  margin 5px 25px 5px 0
</style>
