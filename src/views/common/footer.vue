<template>
  <div class="footer">
    <van-tabbar route active-color="#07c160">
      <van-tabbar-item to="/">
        <div v-if="lypath == '/'">
          <svg-icon icon-class="shouye-select" class="weizhi"></svg-icon>
        </div>
        <div v-else>
          <svg-icon icon-class="shouye-unselect" class="weizhi"></svg-icon>
        </div>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/news">
        <div v-if="lypath == '/news'">
          <svg-icon icon-class="xiaoxiselect" class="weizhi"></svg-icon>
        </div>
        <div v-else>
          <svg-icon icon-class="xiaoxi-unselect" class="weizhi"></svg-icon>
        </div>
        <span>消息</span>
      </van-tabbar-item>
      <van-tabbar-item to="/enterprise" class="qi">
        <div class="hse">
          <div v-if="lypath == '/enterprise'" class="chse">
            <svg-icon icon-class="Hse" class="weizhi"></svg-icon>
          </div>
          <div v-else>
            <svg-icon icon-class="qiye" class="weizhi"></svg-icon>
          </div>
        </div>

        <div class="qiname">hse365</div>
      </van-tabbar-item>
      <van-tabbar-item to="/circle">
        <div v-if="lypath == '/circle'">
          <svg-icon icon-class="quanzi-select" class="weizhi"></svg-icon>
        </div>
        <div v-else>
          <svg-icon icon-class="quanzi-unselect" class="weizhi"></svg-icon>
        </div>
        <span>圈子</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <div v-if="lypath == '/my'">
          <svg-icon icon-class="wode-select" class="weizhi"></svg-icon>
        </div>
        <div v-else>
          <svg-icon icon-class="wode-unselect" class="weizhi"></svg-icon>
        </div>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footers extends Vue {
  private active = 0;
  private lypath = "";
  public beforeRouteEnter(to: any, from: any, next: any) {}
  beforeMount() {
    this.lypath = this.$route.path;
  }
}
</script>
<style lang="scss" scoped>
.footer {
  height: 80px;
}
.weizhi {
  margin-bottom: 5px;
}
.qi {
  position: relative;
  .hse {
    position: absolute;
    top: -25px;
    background-color: #fff;
    width: 50px;
    height: 25px;
    border: 1px solid $color-E8;
    z-index: 99;
    border-radius: 36px 36px 0 0;
    border-bottom: none;
    div {
      position: absolute;
      margin-top: 7px;
      width: 36px;
      height: 36px;
      left: 7px;
      svg {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }
  .qiname {
    width: 50px;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
