<template>
  <div>
    <Headertop :headtitle="headtitle" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="lazyimg" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="item in images" :key="item.id">
        <van-image round width="38px" height="38px" src="item.img" />
        <span>{{ item.title }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Headertop from "@/views/common/head.vue";
@Component({
  components: {
    Headertop
  }
})
export default class Home extends Vue {
  private name = "首页";
  private headtitle = "爱普数智HSE365";
  private images = [
    {
      id: 1,
      img: "https://test.hse365.cc/1590835147985.155",
      title: "查询"
    },
    {
      id: 2,
      img: "https://test.hse365.cc/1596708849575.384",
      title: "学习计划"
    },
    {
      id: 3,
      img: "https://test.hse365.cc/1590835147985.155",
      title: "活动排行"
    },
    {
      id: 4,
      img: "https://test.hse365.cc/1596708849575.384",
      title: "排行榜"
    }
  ];
}
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.lazyimg {
  width: 100%;
  height: 117px;
}
</style>
