<template>
  <div class="app-wrapper">
    <navbar :sidebarHidden='this.$route.meta.sidebarHidden'></navbar>
    <sidebar v-if='!this.$route.meta.sidebarHidden'></sidebar>
    <div class="main-container"
    :style="this.$route.meta.sidebarHidden?{padding:'60px 0px 0px',background:'#fff'}:{paddingLeft:'200px'}">
      <!-- <tabs-view></tabs-view> -->
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import Navbar from './navbar'
  import Sidebar from './sidebar/sidebar'
  // import TabsView from './tabs-view'
  import AppMain from './app-main'
  export default {
    components: {
      Navbar,
      Sidebar,
      // TabsView,
      AppMain
    },
    mounted() {
      // console.log(this.$route.meta.sidebarHidden)
    }
  }
</script>
<style scoped lang="stylus">
.app-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color var(--hsebg)
  .main-container {
    padding-left: 200px;
    padding-top: 60px;
    background-color var(--hsebg)
  }
}
</style>
