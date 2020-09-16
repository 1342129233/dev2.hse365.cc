<template>
  <div class="Headertops text-center">
    <img src="https://test.hse365.cc/1574738035202.403" class="login" />
    <span class="toptitle" v-if="rou === '/home'">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </span>
    <span v-else class="titlesize titlet">{{ headtitle }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Headertop extends Vue {
  // @Prop({
  //   type: String,
  //   required: true,
  //   default: "爱普数智"
  // })
  // headtitle!: string
  @Prop(String) headtitle!: string;
  private value1 = 0;
  private option1 = [
    { text: this.headtitle, value: 0 },
    { text: "企业一", value: 1 },
    { text: "企业二", value: 2 }
  ];
  private rou = "";
  beforeMount() {
    this.rou = this.$route.path;
  }
}
</script>
<style lang="scss" scoped>
.Headertops {
  height: 44px;
  top: 0;
  width: 100%;
  z-index: 99;
  background-color: $color-green;
  font-size: 14px;
  .login {
    width: 30px;
    height: 30px;
    display: inline-block;
    border-radius: 50%;
    line-height: 44px;
    vertical-align: middle;
    margin: 0 10px;
  }
  .titlesize {
    font-size: 18px;
    line-height: 44px;
    height: 100%;
    color: $color-white;
  }
  .titlet {
    // letter-spacing: 8px;
    // text-indent: 8px;
    display: inline-block;
  }
}
</style>
<style lang="scss">
.toptitle {
  .van-dropdown-menu {
    display: inline-block;
    .van-dropdown-menu__bar {
      height: 44px;
      background-color: $color-green;
    }
  }
}
</style>
