<template>
  <div class="footer">
    <van-tabbar route>
      <van-tabbar-item icon="wap-home" to="/home">
          首页
      </van-tabbar-item>
      <van-tabbar-item icon="smile-comment" to="/news">
          消息
      </van-tabbar-item>
      <van-tabbar-item icon="star" to="/enterprise">
          hse365
      </van-tabbar-item>
      <van-tabbar-item icon="hot" to="/circle">
          圈子
      </van-tabbar-item>
      <van-tabbar-item icon="manager" to="/my">
          我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footers extends Vue {
  private active = 0;
}
</script>
<style lang="scss" scoped>
.footer {
  height: 80px;
}
</style>
