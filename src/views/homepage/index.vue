<template>
  <div class='homepage-container'>
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 基本信息 -->
    <el-card shadow='always' class='marT20 basic-information'>
      <el-breadcrumb>
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
          <el-col :span='8'>
            <div class='icon-bg icon-bg-hseiconyellow'><i class='el-icon-user'></i></div>
            <div class='icon-right'><b>{{this.home.basic_msg.e_user_count || '--'}}</b><p>企业总人数</p></div>
          </el-col>
          <el-col :span='8'>
            <div class='icon-bg icon-bg-hseiconblue'><i class='el-icon-circle-check'></i></div>
            <div class='icon-right'><b>{{this.home.basic_msg.company_learn_user_count || '--'}}</b><p>学习人数</p></div>
          </el-col>
          <el-col :span='8'>
            <div class='icon-bg icon-bg-hseiconred'><i class='el-icon-pie-chart'></i></div>
            <div class='icon-right'><b>{{this.home.basic_msg.learn_proportion || '--'}}</b><p>学习百分比</p></div>
          </el-col>
        </el-row>
    </el-card>
    <!-- 学习情况 -->
    <el-card shadow='always' class='marT20 learning-situation'>
      <el-breadcrumb>
        <el-breadcrumb-item>学习情况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter='20'>
        <el-col :span='6'>
          <div class='grid-content bg-hseorigin clearfix'>
            <div class='learn-icon'><i class='el-icon-notebook-1'></i></div>
            <div class='learn-right'>
              <p>{{is_week_month == 1 ? '本周' : '本月'}}发布课程数</p>
              <b>{{this.home.learn_msg.week_counse_count || '--'}}课程</b>
            </div>
          </div>
        </el-col>
        <el-col :span='6'>
          <div class='grid-content bg-hseyellow clearfix'>
            <div class='learn-icon'><i class='el-icon-date'></i></div>
            <div class='learn-right'>
              <p>{{is_week_month == 1 ? '本周' : '本月'}}发布课时数</p>
              <b>{{this.home.learn_msg.week_counse_lesson_count || '--'}}课时</b>
            </div>
          </div>
        </el-col>
        <el-col :span='6'>
          <div class='grid-content bg-hseblue clearfix'>
            <div class='learn-icon'><i class='el-icon-notebook-2'></i></div>
            <div class='learn-right'>
              <p>{{is_week_month == 1 ? '本周' : '本月'}}新闻资讯更新</p>
              <b>{{this.home.learn_msg.article_count || '--'}}条</b>
            </div>
          </div>
        </el-col>
        <el-col :span='6'>
          <div class='grid-content bg-hsegreen clearfix'>
            <div class='learn-icon'><i class='el-icon-document-delete'></i></div>
            <div class='learn-right'>
              <p>{{is_week_month == 1 ? '本周' : '本月'}}违章处罚情况</p>
              <b>{{this.home.learn_msg.event_count || '--'}}条</b>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 企业上线率 -->
    <el-card shadow='always' class='marT20'>
      <el-breadcrumb>
        <el-breadcrumb-item>企业上线率</el-breadcrumb-item>
      </el-breadcrumb>
      <div class='enterprise-online-rate marT20'>
        <div class='checkWM'>
          <el-radio v-model="is_week_month" label='1' @change="getcompanyindex">本周</el-radio>
          <el-radio v-model="is_week_month" label='2' @change="getcompanyindex">本月</el-radio>
        </div>
        <Enterprise 
          width='100%' 
          height='500px' 
          v-loading='this.common.boo' 
          :yData='this.home.everyday_count.login_time_arr' 
          :xData='this.home.everyday_count.online_proportion_arr'
          :is_week_month='is_week_month'
          :e_user_count='this.home.basic_msg.e_user_count'
          :getCompanyUserLogin_count='this.home.basic_msg.getCompanyUserLogin_count'/>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Enterprise from './echarts'
  import { mapActions, mapState } from 'vuex'
  import {loadFromLocal} from '@/common/local-storage'
  export default {
    name: 'homepage',
    data () {
      return {
        // loading: false// 企业上线率loading
        is_week_month: '1'
      }
    },
    computed: {
      ...mapState([
        'common',
        'home'
      ])
    },
    methods: {
      ...mapActions(['companyindex', 'setEnterpriseId']),
      getcompanyindex() {
        this.companyindex({is_week_month: this.is_week_month})
      }
    },
    components: {
      Enterprise
    },
    created () {
      this.setEnterpriseId({eid: this.$route.query.eid || loadFromLocal('manage_eid')})
    },
    mounted () {
      this.companyindex({is_week_month: this.is_week_month})
    }
  }
</script>
<style scoped lang='stylus'>
  .homepage-container
    min-width 800px

    .basic-information
      .el-row
        margin 40px 0
        .el-col
          border-right 1px solid #e5e5e5
          line-height 50px
          text-align center
        .el-col:nth-child(3)
          border-right none
        .icon-bg
          width 50px
          height 50px
          // display inline-block
          float left
          border-radius 50%
          margin 0 15px 0 70px
        i
          font-size 24px
          color var(--white)
          line-height 50px
        .icon-bg-hseiconyellow
          background-color var(--hseiconyellow)
        .icon-bg-hseiconblue
          background-color var(--hseiconblue)
        .icon-bg-hseiconred
          background-color var(--hseiconred)
        .icon-right
          float left
          height 50px
          line-height 24px

    .learning-situation
      .el-row
        margin 20px 0
        .el-col
          line-height 100px
          .learn-icon
            font-size 50px
            color var(--white)
            margin 0 15px 0 30px
            float left
          .learn-right
            float left
            padding-top 24px
            line-height 24px
            color var(--white)
        .grid-content
          border-radius 4px
        .bg-hseorigin
          background-color var(--hseorigin)
        .bg-hseyellow
          background-color var(--hseyellow)
        .bg-hseblue
          background-color var(--hseblue)
        .bg-hsegreen
          background-color var(--hsegreen)
    
    .enterprise-online-rate
      position relative
      .checkWM
        position absolute
        z-index 1
        top 0
        right 47px
</style>