<template>
<div>
  <div class="heads">
    新闻资讯
  </div>
  <div class="title">
    <span v-for="item in titledata" :key="item.id" :class="[activeName == item.id ? 'active' : '']" @click="activenew(item.id)">{{item.title}}</span>
  </div>
  <div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item">{{item}}</van-cell>
      </van-list>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class noticenews extends Vue{
  private activeName = 1;
  private titledata = [
    {
      id: 1,
      title: '新闻资讯'
    },
    {
      id: 2,
      title: '通知公告'
    }
  ]
  private list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private loading = false;
  private finished = false;
  onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    
  }
  activenew(val:number) {
    this.activeName = val
  }
}
</script>
<style lang="scss" scoped>
.heads {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  text-align: center;;
}
.title {
  height: 35px;
  font-size: 22px;
  line-height: 35px;
  margin: 8px;
  span{
    width: 100px;
    text-align: center;
    margin-right: 15px;
    display: inline-block;
  }
  .active {
    color: #FF9959;
    border-bottom: 3px solid #FF9959;
  }
}
</style>