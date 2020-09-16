<template>
  <div class="deptmuovi">
    <el-dialog title="移动部门" :visible.sync="dialogFormdeptmuovi" :before-close="handleClose">
      <!-- <el-tabs type="border-card">
        <span v-for="item in newdepartmentList" :key="item.did">
          <el-button style="margin: 5px" :type="tableButton.includes(item.did) ?'danger':''" @click="deptclick(item.did)">{{item.name}}</el-button>
        </span>
      </el-tabs> -->
      <el-tabs v-model="editableTabsValue" type="border-card" class="tab-color" @tab-click="handleDeptTabsClick">
        <el-tab-pane
          :key="items.id"
          :pid="items.pid"
          v-for="items in editabledid"
          :label="items.name"
          :name="items.id"
        >
          <!-- 数据 -->
          <span v-for="item in items.children" :key="item.id" >
            <el-button style="margin: 5px" size='mini' :class="tableData.didId == item.id ? 'default-btn default-btn-active' : 'default-btn'" @click="deptClick(item)">{{item.name}}</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogmuovi(false)">取 消</el-button>
        <el-button type="primary" @click="isdialogFormdeptmuovi(false)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'deptmuovi',
  props: {
    dialogFormdeptmuovi: {
      type: Boolean,
      default: false
    },
    xiougai: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      newdepartmentList: [],  // 部门列表数据
      tableButton: '',  // 选中部门
      editableTabsValue: '0',
      editabledid: [
        {
          name: '全部',
          id: '0',
          children: [],
          pid: '-1'
        }
      ],
      tableData: {
        didId: ''
      }
    }
  },
  watch: {
    // 初始化dept tabs列表 部门
    dept(newDept) {
      this.editabledid[0].children = newDept.dept
    },
    dialogFormdeptmuovi() {
      if(this.dialogFormdeptmuovi === true) {
        this.getDeptProOccList(['dept', 'pro', 'occ'])
      }
    }
  },
  methods: {
    ...mapActions(['getDepartmentList', 'deptmove', 'getDeptProOccList']),
    deptclick(id) {
      if(this.tableButton.includes(id)) {
        this.tableButton = ''
      }else{
        this.tableButton = id
      }
    },
    // 移动工种岗位位置
    isdialogFormdeptmuovi(val) {
      // console.log(this.xiougai)
      let dev = {
        id: this.xiougai,
        did: this.tableData.didId
      }
      if(dev.id === '') {
        this.$message.warning('选中部门不能为空')
      }else if(dev.id === dev.did) {
        this.$message.warning('请不要移动到自己部门下面')
      }else{
        this.deptmove(dev).then((data) => {
          if(data.code === 0) {
            this.$message.success('移动成功')
            this.$emit('ismuovi', val)
          }
          this.editableTabsValue = '0'
          let so = {
            index: this.editableTabsValue
          }
          this.handleDeptTabsClick(so)
          this.tableData.didId = ''
        })
      }
    },
    dialogmuovi(val) {
      this.$emit('cismuovi', val)
    },
    handleClose() {
      this.$emit('ismuovi', false)
    },
    // 部门选中
    deptClick(checkItem) {
      if(checkItem.children && checkItem.children.length) {
        let isDeptTabs = this.editabledid.map(item => item.id !== checkItem.id ? 'true' : 'false')  // 判断导航是否有, 没有就是 true, 有就是 false
        if(!isDeptTabs.includes('false')) {
          let obj = {
            name: checkItem.name,
            id: checkItem.id,
            // children: checkItem.children,
            pid: checkItem.pid,
            path: checkItem.p
          }
          // let deptTabs = this.editabledid
          // let val = []
          // deptTabs.forEach(item => {
          //   if(item.id === obj.id) {
          //     val.push('true')
          //   }else{
          //     val.push('false')
          //     // this.deptTabs.push(obj)
          //   }
          // })
          // let a = val.includes('true')
          let isFalse = checkItem.children.map(tem => tem.id === checkItem.id ? 'true' : 'false')  // 一级元素等于不等于子元素id  false
          if(!isFalse.includes('true')) {
            checkItem.children.unshift(obj)
          }
          this.editabledid.push(checkItem)
          console.log(this.editabledid)
          this.editableTabsValue = checkItem.id
          // if(!a) {
          //   this.editabledid.push(obj)
          //   this.editableTabsValue = checkItem.id
          // }
        }
      }else {
        // 没有子元素
        if(this.tableData.didId === checkItem.id) {
          this.tableData.didId = ''
        }else{
          this.tableData.didId = checkItem.id
          console.log(checkItem)
        }
      }
    },
    // removeTab(targetName) {
    //   let deptTabs = this.editabledid
    //   for(let i = 0; i < deptTabs.length; i++) {
    //     if(deptTabs[i].id === targetName) {
    //       this.editabledid.splice(i, 1)
    //       if(this.editabledid.length <= 1) {
    //         this.editableTabsValue = '0'
    //       }else {
    //         this.editableTabsValue = deptTabs[i - 1].id
    //       }
    //     }
    //   }
    // }
    handleDeptTabsClick(tab) {
      this.editabledid.map((item, ind) => {
        if(ind > tab.index) {
          this.editabledid.splice(ind, this.editabledid.length)
        }
      })
    }
  },
  computed: {
    ...mapState({
      dept: state => state.common.deptProOccList
    })
  },
  beforeMount() {
    this.getDepartmentList().then(({data}) => {
      this.newdepartmentList = data
    })
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

