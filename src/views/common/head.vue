<template>
  <div class="Headertops text-center">
    <span class="titlesize titlet">{{ headtitle }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Headertop extends Vue {
  @Prop({
    type: String,
    required: true,
    default: "爱普数智"
  })
  headtitle!: string;
}
</script>
<style lang="scss" scoped>
.Headertops {
  height: 44px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  background-color: $color-green;
  font-size: 14px;
  .titlesize {
    font-size: 18px;
    line-height: 44px;
    height: 100%;
    color: $color-white;
  }
  .titlet {
    letter-spacing: 8px;
    text-indent: 8px;
    display: inline-block;
  }
}
</style>
