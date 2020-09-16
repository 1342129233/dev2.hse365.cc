<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- <div class="Journalism_home">
      <div class="Journalism_head">
        <div
          :class="[curriculum == 1 ? 'name_al' : '']"
          class="name"
          @click="curriculumsan(1)"
        >
          内部课程
          <div class="name_active"></div>
        </div>
        <div
          :class="[curriculum == 2 ? 'name_al' : '']"
          class="name"
          @click="curriculumsan(2)"
        >
          公开课程
          <div class="name_active"></div>
        </div>
        <div
          :class="[curriculum == 3 ? 'name_al' : '']"
          class="name"
          @click="curriculumsan(3)"
        >
          主题课程
          <div class="name_active"></div>
        </div>
        <div
          class="name"
        >
          筛选
          <div class="name_active"></div>
        </div>
        <div class="dian" @click="onswitch">
          <div class="dian_hui" v-for="(item, index) in 3" :key="index"></div>
        </div>
      </div>
      <div class="Journalism_content" :class="isOk ? 'Journalism_content_1' : 'Journalism_content_2'" v-if="InternalCourses.length > 0">
        <ul>
          <li class="curriculum_list">
            <section class="curriculum_list_left">
              <img data-v-2df9c5b6="" src="" class="curriculum_list_img">
            </section>
            <hgroup class="curriculum_list_right">
              <header class="curriculum_list_title">延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字</header>
              <h5 class="curriculum_list_rating">
                <span class="curriculum_list_span">123</span>
                <div class="curriculum_list_bottom">
                  <img src="@/assets/img/newPlatform/sigh.png" class="curriculum_list_van"/>
                  <span>6课时未学</span>
                </div>
              </h5>
            </hgroup>
          </li>
          <li class="curriculum_list">
            <section class="curriculum_list_left">
              <img data-v-2df9c5b6="" src="" class="curriculum_list_img">
            </section>
            <hgroup class="curriculum_list_right">
              <header class="curriculum_list_title">延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字</header>
              <h5 class="curriculum_list_rating">
                <span class="curriculum_list_span">123</span>
                <div class="curriculum_list_bottom">
                  <img src="@/assets/img/newPlatform/sigh.png" class="curriculum_list_van"/>
                  <span>6课时未学</span>
                </div>
              </h5>
            </hgroup>
          </li>
          <li class="curriculum_list">
            <section class="curriculum_list_left">
              <img data-v-2df9c5b6="" src="" class="curriculum_list_img">
            </section>
            <hgroup class="curriculum_list_right">
              <header class="curriculum_list_title">延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字延时效果名字</header>
              <h5 class="curriculum_list_rating">
                <span class="curriculum_list_span">123</span>
                <div class="curriculum_list_bottom">
                  <img src="@/assets/img/newPlatform/sigh.png" class="curriculum_list_van"/>
                  <span>6课时未学</span>
                </div>
              </h5>
            </hgroup>
          </li>
        </ul>
      </div>
    </div> -->
    <van-tree-select
      height="55vw"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0">1</div>
        <div v-if="active === 1">2</div>
      </template>
    </van-tree-select>
  </div>
</template>
<script lang="ts">
// 课程接口
interface E {
  eid: string;
  userId: string;
  count: string;
  isOpen: number;
}
import { Component, Vue } from "vue-property-decorator";
import { HomeModule } from "@/store/modules/home";
@Component
export default class CurriculumPage extends Vue {
  private items = [{ text: "分组 1" }, { text: "分组 2" }];
  private active = 0;
  private isOk = 1;
  private value = "";
  private curriculum = 1;
  private InternalCourses: object[] = []; // 内部课程
  // 课程
  private database: E = {
    eid: "81",
    userId: this.$store.state.user.username.user_id,
    count: "6",
    isOpen: 1
  };
  beforeMount() {
    // 课程
    HomeModule.curriculumStaff(this.database).then((data: any) => {
      const setdata = data.data;
      if (setdata.code == 0) {
        this.InternalCourses = setdata.data;
      }
    });
  }
  // 搜索
  onSearch() {
    if (this.value != null) {
      console.log(this.value);
      this.$toast({
        message: "搜索中..."
      });
    }
  }
  // 课程
  curriculumsan(val: number) {
    this.curriculum = val;
  }
  // 切换列表
  onswitch() {
    if (this.isOk === 1) {
      this.isOk = 0;
    } else if (this.isOk === 0) {
      this.isOk = 1;
    }
  }
}
</script>
<style lang="scss" scoped>
.Journalism_home {
  margin-top: 10px;
  .Journalism_head {
    display: flex;
    height: 30px;
    border-bottom: 1px solid $color-E8;
    .dian {
      width: 30px;
      text-align: center;
      // height: 20px;
      line-height: 20px;
      font-size: 14px;
      margin-right: 10px;
      margin-left: auto;
      padding: 8px 0;
      display: flex;
      .dian_hui {
        width: 4px;
        height: 4px;
        background-color: $color-6;
        border-radius: 50%;
        line-height: 30px;
        margin: 2px;
      }
    }
    .name {
      width: 80px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      color: $color-grey;
      font-size: 14px;
    }
    .name_al {
      color: $color-green;
      .name_active {
        width: 40px;
        border-bottom: 1px solid $color-green;
        margin-left: 20px;
        margin-top: 5px;
      }
    }
  }
  .Journalism_content {
    width: 100%;
    overflow: hidden;
  }
}

.Journalism_content_1 {
  .curriculum_list {
    margin: 0 14px;
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    padding: 8px 4px;
    .curriculum_list_left {
      .curriculum_list_img {
        width: 70px;
        height: 70px;
        display: block;
        margin-right: 10px;
      }
    }
    .curriculum_list_right {
      position: relative;
      width: 100%;
      .curriculum_list_title {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .curriculum_list_rating {
        width: 100%;
        position: absolute;
        bottom: 5px;
        display: flex;
        justify-content: space-between;
        height: 12px;
        margin-bottom: 6px;
        .curriculum_list_bottom {
          width: 120px;
          text-align: right;
          .curriculum_list_van {
            width: 16px;
            height: 16px;
            margin: 0 5px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
}

.Journalism_content_2 {
  ul {
    display: flex;
    flex-wrap: wrap;
    .curriculum_list {
      width: 48%;
      padding: 0 2%;
      padding-top: 10px;
      border-bottom: 1px solid #f1f1f1;
      .curriculum_list_left {
        width: 100%;
        height: 130px;
        .curriculum_list_img {
          width: 100%;
          height: 100%;
          display: block;
          margin-right: 10px;
        }
      }
      .curriculum_list_right {
        position: relative;
        width: 100%;
        .curriculum_list_title {
          width: 80%;
          color: $color-grey;
          display: -webkit-box;
          @include webkit(box-orient, vertical);
          @include webkit(line-clamp, 1);
          overflow: hidden;
          font-size: 12px;
          line-height: 18px;
          height: 18px;
        }
        .curriculum_list_rating {
          width: 100%;
          display: flex;
          .curriculum_list_span {
            height: 20px;
          }
          .curriculum_list_bottom {
            width: 100%;
            text-align: right;
            position: relative;
            .curriculum_list_van {
              width: 16px;
              height: 16px;
              margin: 0 5px;
              display: inline-block;
              vertical-align: middle;
              position: absolute;
              right: 0px;
              top: -16px;
            }
          }
        }
      }
    }
    .curriculum_list:nth-child(2n) {
      box-sizing: border-box;
      border-left: 1px solid $color-E8;
      border-bottom: 1px solid $color-E8;
    }
    // .curriculum_list:nth-child(2n-1) {
    //   box-sizing: border-box
    //   border-right: 1px solid $color-E8
    //   border-bottom: 1px solid $color-E8
    // }
  }
}
</style>
