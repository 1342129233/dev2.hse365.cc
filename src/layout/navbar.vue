<template>
  <div class="top-navbar">
    <el-menu
      mode="horizontal"
      text-color="#fff"
      active-text-color="#fff"
      :style="this.sidebarHidden ? {'backgroundColor':'#222222'} : {'backgroundColor':'#38A28A'}">
      <!-- <router-link to="/home" style="display: table;">
        <el-menu-item index="1" class="title-name">
          <el-avatar class="marR10" :size="40" @error="errorHandler" v-show='!this.sidebarHidden'>
          <img :src="require('../../static/image/logo.jpeg')"/>
        </el-avatar>{{this.sidebarHidden ? $t('backstage.title') : $t('navbar.title')}}</el-menu-item>
      </router-link> -->

        <el-menu-item index="1" class="title-name">
          <!-- <router-link to="/enterprise" class='title-logo' :style="this.sidebarHidden ? {color:'#838383'} : {color: '#fff'}">
            <el-avatar class="marR10" :size="40" @error="errorHandler" v-show='!this.sidebarHidden'>
              <img :src="require('../../static/image/logo.jpeg')"/>
            </el-avatar>{{this.sidebarHidden ? $t('backstage.title') : $t('navbar.title')}}
          </router-link> -->
          <div class='title-logo' :style="this.sidebarHidden ? {color:'#838383'} : {color: '#fff'}">
            <el-avatar class="marR10" :size="40" @error="errorHandler" v-show='!this.sidebarHidden'>
              <img :src="require('../../static/image/logo.jpeg')"/>
            </el-avatar>{{this.sidebarHidden ? $t('backstage.title') : $t('navbar.title')}}
          </div>
          <div class='manage' v-if="this.sidebarHidden">
            <router-link to="/enterprise">企业</router-link>
            <router-link to="">用户</router-link>
            <router-link to="">运营</router-link>
            <router-link to="">系统</router-link>
            <router-link to="">开发者</router-link>
            <router-link to="">课程</router-link>
            <router-link to="">课时库</router-link>
            <router-link to="">信息获取</router-link>
          </div>
        </el-menu-item>

      <!-- 换肤/全屏/中英文切换 -->
      <!-- <change-theme class="theme-container"></change-theme>

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <div class="lang-select">
        <lang-select></lang-select>
      </div> -->

      <div class="avatar-container">
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar">
            <div class="username-wrapper" :style="this.sidebarHidden ? {color:'#838383'} : {color: '#fff'}">
              <span class="user-name">{{name}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <!-- <router-link class='inlineBlock' to="/user/profile">
              <el-dropdown-item>
                {{$t('navbar.profile')}}
              </el-dropdown-item>
            </router-link>
            <router-link class='inlineBlock' to="/user/avatar">
              <el-dropdown-item>
                {{$t('navbar.avatar')}}
              </el-dropdown-item>
            </router-link> -->
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import LangSelect from '@/components/lang-select'
  import Screenfull from '@/components/screenfull'
  import ChangeTheme from '@/components/theme'
  import { loadFromLocal } from '@/common/local-storage'
  export default {
    name: '',
    data() {
      return {
        name: loadFromLocal('name'),
        avatar: loadFromLocal('avatar')
      }
    },
    props: {
      sidebarHidden: {
        type: Boolean,
        default: false
      }
    },
    components: {
      LangSelect,
      Screenfull,
      ChangeTheme
    },
    methods: {
      ...mapActions({
        userLogout: 'logout'
      }),
      errorHandler() {
        return true
      },
      logout() {
        this.userLogout().then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
.top-navbar
  position fixed
  width 100%
  z-index 10
  .el-menu
    border-bottom: none
    background-color: var(--hsegreen)
    .title-logo
      float left
    .manage
      float left
      font-size 16px
      margin-left 10px
      height 60px
      >a
        padding 0 7px
        line-height 60px
        float left
        color #838383
      >a:hover
        background-color #080808
        color #D9DBD1
      >a:focus
        background-color #080808
        color #D9DBD1
    .lang-select
      position absolute
      top 18px
      right 150px
    .lang-select /deep/ .el-dropdown
      font-size 20px
      color #fff
    .avatar-container
      position absolute
      top 15px
      right 40px
      .avatar-wrapper
        cursor pointer
    .avatar-container /deep/ .user-avatar
          width 30px
          height 30px
          border-radius 50%
          vertical-align middle
      .username-wrapper
        display inline-block
        height 30px
        line-height 30px
        color #fff
.top-navbar /deep/ .el-menu-item {
  border-bottom: none
  font-size 20px
  &:hover {
    background-color: transparent
  }
  &:focus {
    background-color: transparent
  }
}
.top-navbar /deep/ .theme-container {
  position absolute
  top 15px
  right 225px
  color #fff
  font-size 24px
  cursor pointer
  // background-image linear-gradient(red, blue)
}
.top-navbar .screenfull {
  position: absolute
  top: 20px
  right: 190px
}

</style>
