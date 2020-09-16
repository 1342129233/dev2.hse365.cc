<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="this.tit === 'iconSet'">图标设置</span>
        <span v-if="this.tit === 'funSet'">功能设置</span>
      </div>
      <div class="box_card_content">
        <!-- icon设置 -->
        <el-table
          ref="multipleTable"
          :data="iconList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-if="this.tit === 'iconSet'">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="title"
            label="可分配图标">
          </el-table-column>
        </el-table>

        <el-table
          ref="multipleTable"
          :data="funList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-if="this.tit === 'funSet'">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="wid"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="可管理权限">
          </el-table-column>
          <el-table-column
            prop="keys"
            label="KEYS">
          </el-table-column>
        </el-table>
        <div class="box_card_bot">
          <el-button type="primary" @click="setIconFun({tit, multipleSelection, eid})">保存</el-button>
          <el-button @click="toggleSelection()">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        tit: '',
        eid: 0,
        multipleSelection: []
      }
    },
    methods: {
      ...mapActions(['getIconFunList', 'setIconFun']),
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
          this.$router.push('/enterprise')
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    },
    computed: {
      ...mapState({
        iconList: state => state.user.iconList,
        funList: state => state.user.funList
      })
    },
    watch: {
      '$route': {
        handler(newTit, oldTit) {
          this.multipleSelection = []
          this.tit = newTit.query.tit
          this.eid = newTit.query.eid
          if(newTit.query.tit === 'iconSet' || newTit.query.tit === 'funSet') {
            this.getIconFunList({tit: newTit.query.tit, eid: newTit.query.eid}).then(({data}) => {
              data.map(item => {
                if(item.check) {
                  this.multipleSelection.push(item)
                }
              })
              this.toggleSelection(this.multipleSelection)
            })
          }
        },
        immediate: true
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .box_card_content
    width 100%
    .el-table
      width 100%
    .box_card_bot
      margin-top 20px
  
  .box_card_content >>> .el-table__header-wrapper .el-table__header
    width 100% !important
  .box_card_content >>> .el-table__body-wrapper .el-table__body
    width 100% !important
</style>