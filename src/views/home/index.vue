<template>
  <div>
    <Headertop :headtitle="headtitle" />
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" v-if="images.length > 0">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          v-lazy="image.img"
          class="lazyimg"
          alt="找不到图片了"
          onerror="this.src='';this.onerror=null"
        />
      </van-swipe-item>
    </van-swipe>
    <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" v-else>
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <!-- icon -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        style="width: 25%;"
        v-for="item in $store.state.home.icons"
        :key="item.id"
      >
        <div class="middle-banner">
          <div class="img_list">
            <img :src="item.img" />
          </div>
          <div class="img_text">{{ item.title }}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 新闻 -->
    <div class="Journalism_home">
      <div class="Journalism_head">
        <div
          :class="[activeName == 1 ? 'name_al' : '']"
          class="name"
          @click="newJou(1)"
        >
          新闻资讯
          <div class="name_active"></div>
        </div>
        <div
          :class="[activeName == 2 ? 'name_al' : '']"
          class="name"
          @click="newJou(2)"
        >
          通知公告
          <div class="name_active"></div>
        </div>
        <div class="dian">
          <div class="dian_hui" v-for="(item, index) in 3" :key="index"></div>
        </div>
      </div>
      <div class="Journalism_content" v-if="newscontent.length > 0">
        <div class="Journalism_san" v-for="item in newscontent" :key="item.id">
          <div class="Journalism_sanimg">
            <van-image
              width="90px"
              height="60px"
              fit="contain"
              :src="item.picture"
              v-if="item.picture"
            />
            <van-image
              v-else
              width="90px"
              height="60px"
              fit="contain"
              src="@/assets/img/newPlatform/course.png"
            />
          </div>
          <div class="Journalism_santext">
            <div class="Journalism_santext_title">{{ item.title }}</div>
            <div class="Journalism_santext_time">
              {{ item.updatedTime | formatTimer }}
            </div>
          </div>
        </div>
      </div>
      <!-- 错误 -->
      <div class="jou_err" v-else>
        <van-empty image="error" description="没有最新数据" />
      </div>
    </div>
    <!-- 课程 -->
    <div class="Journalism_home">
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
        <div class="dian">
          <div class="dian_hui" v-for="(item, index) in 3" :key="index"></div>
        </div>
      </div>
      <div class="Journalism_content" v-if="InternalCourses.length > 0">
        <div class="curriculum_san">
          <van-row>
            <van-col
              span="12"
              class="curriculum_list"
              v-for="item in InternalCourses"
              :key="item.id"
            >
              <div class="curriculum_list_img">
                <img
                  :src="item.middlePicture"
                  alt="找不到图片"
                  v-if="item.middlePicture"
                />
                <img
                  src="@/assets/img/newPlatform/course.png"
                  alt="找不到图片"
                  v-else
                />
              </div>
              <div class="curriculum_list_content">
                <div class="curriculum_list_title">{{ item.title }}</div>
                <div
                  class="curriculum_list_minbiao"
                  v-if="item.unfinished > 0 && item.publishedLessonNum > 0"
                >
                  <img src="@/assets/img/newPlatform/sigh.png" />
                </div>
              </div>
              <div class="curriculum_list_button">
                <div class="curriculum_list_type">{{ item.category }}</div>
                <div
                  class="curriculum_list_number"
                  v-if="item.unfinished > 0 && item.publishedLessonNum > 0"
                >
                  {{ item.unfinished }}课时未学
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 错误 -->
      <div class="jou_err" v-else>
        <van-empty image="error" description="没有最新数据" />
      </div>
    </div>
    <!-- 测评考试 Evaluation-->
    <div class="Journalism_home">
      <div class="Journalism_head">
        <div
          :class="[evaluation == 1 ? 'name_al' : '']"
          class="name"
          @click="isEvaluation(1)"
        >
          我的测评
          <div class="name_active"></div>
        </div>
        <div
          :class="[evaluation == 2 ? 'name_al' : '']"
          class="name"
          @click="isEvaluation(2)"
        >
          我的考试
          <div class="name_active"></div>
        </div>
        <div class="dian">
          <div class="dian_hui" v-for="(item, index) in 3" :key="index"></div>
        </div>
      </div>
      <div class="Journalism_content">
        <div class="evaluation_list">我要答题多选</div>
        <div class="evaluation_list">我要答题多选</div>
        <div class="evaluation_list">我要答题多选</div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Headertop from "@/views/common/head.vue";
import Footers from "@/views/common/footer.vue";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
// If you use Swiper 6.0.0 or higher
// import 'swiper/swiper-bundle.css'
import "swiper/css/swiper.min.css";
import { HomeModule } from "@/store/modules/home";
@Component({
  components: {
    Headertop,
    Swiper,
    SwiperSlide,
    Footers
  }
})
export default class Home extends Vue {
  private evaluation = 1 // 1测评 2考试
  private curriculum = 1; // 课程
  private InternalCourses: object[] = []; // 内部课程
  private activeName = 1; // 新闻
  private newscontent: object[] = []; // 新闻
  private name = "首页";
  private headtitle = "爱普数智HSE365";
  private cc = require("@/assets/img/newPlatform/daily-tasks.png");
  private images = [];
  private swiperOptions = {
    slidesPerView: 4, // 一页几个
    // spaceBetween: 30,  // 宽度间距
    // 定义slides的数量多少为一组
    slidesPerGroup: 4,
    navigation: {
      nextEl: ".swiper-button-prev",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
    // pagination: '.swiper-pagination',
    // paginationClickable: true,
    // Some Swiper option/callback...
  };
  beforeMount() {
    // 轮播
    HomeModule.bannerStaff().then((data: any) => {
      this.images = data.data;
    });
    // icon
    HomeModule.iconStaff();
    // 新闻
    const enterpriseEid: string = this.$store.state.user.username.eid;
    HomeModule.journalismStaff(enterpriseEid).then((data: any) => {
      const base = data.data;
      if (base.code == 0) {
        this.newscontent = base.data;
      }
    });

    // 课程
    interface E {
      eid: string;
      user_id: string;
      count: string;
      isOpen: string;
    }
    console.log(this.$store.state.user.username);
    let database: E = {
      eid: "81",
      user_id: this.$store.state.user.username.user_id,
      count: "6",
      isOpen: "1"
    };
    HomeModule.curriculumStaff(database).then((data: any) => {
      const setdata = data.data;
      if (setdata.code == 0) {
        this.InternalCourses = setdata.data;
      }
    });
    database.isOpen = "2";
    HomeModule.curriculumStaff(database).then((data: any) => {
      const setdata = data.data;
      if (setdata.code == 0) {
        console.log(setdata.data);
      }
    });
  }
  // 新闻
  newJou(name: number): void {
    this.activeName = name;
  }
  // 课程
  curriculumsan(name: number): void {
    this.curriculum = name;
  }
  // 测评 考试
  isEvaluation(name:number): void {
    this.evaluation = name
  }
  iconMessage() {
    console.log();
  }
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
.middle-banner {
  height: 90px;
  .img_list {
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 50%;
    text-align: center;
    margin: 8px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img_text {
    position: static;
    text-align: center;
  }
}
.Journalism_home {
  margin-top: 10px;
  .Journalism_head {
    display: flex;
    height: 30px;
    border-bottom: 1px solid $color-E8;
    .dian {
      width: 30px;
      text-align: center;
      height: 20px;
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
.Journalism_san {
  display: flex;
  padding: 8px;
  border-bottom: 1px solid $color-E8;
  .Journalism_sanimg {
    width: 90px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Journalism_santext {
    height: 60px;
    margin: 0 8px;
    position: relative;
    font-size: 12px;
    line-height: 17px;
    .Journalism_santext_title {
      color: $color-grey;
      display: -webkit-box;
      @include webkit(box-orient, vertical);
      @include webkit(line-clamp, 2);
      overflow: hidden;
    }
    .Journalism_santext_time {
      position: absolute;
      bottom: 0;
      color: $color-qian;
    }
  }
}
// 课程
.curriculum_san {
  margin: 0 14px;
}
.curriculum_list {
  height: 175px;
  padding-top: 10px;
  padding-bottom: 10px;
  .curriculum_list_img {
    width: 100%;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .curriculum_list_content {
    width: 100%;
    height: 34px;
    margin: 4px 0px;
    .curriculum_list_title {
      width: 80%;
      color: $color-grey;
      display: -webkit-box;
      @include webkit(box-orient, vertical);
      @include webkit(line-clamp, 2);
      overflow: hidden;
      font-size: 12px;
      line-height: 17px;
      float: left;
    }
    .curriculum_list_minbiao {
      display: inline-block;
      width: 16px;
      height: 16px;
      float: right;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .curriculum_list_button {
    width: 100%;
    font-size: 12px;
    .curriculum_list_type {
      line-height: 17px;
      color: $color-qian;
      width: 50%;
      overflow: hidden;
      display: inline-block;
    }
    .curriculum_list_number {
      line-height: 17px;
      color: $color-qian;
      width: 50%;
      overflow: hidden;
      display: inline-block;
      text-align: right;
    }
  }
}
.curriculum_list:nth-child(2n) {
  padding-left: 3%;
  border-left: 1px solid $color-E8;
  border-bottom: 1px solid $color-E8;
}
.curriculum_list:nth-child(2n-1) {
  padding-right: 3%;
  border-right: 1px solid $color-E8;
  border-bottom: 1px solid $color-E8;
}
// 测评考试
.evaluation_list {
  height: 30px;
  line-height: 30px;
  margin: 0 14px;
  border-bottom: 1px solid #666;
}
.jou_err {
  width: 100%;
  height: 260px;
  overflow: hidden;
}
</style>
