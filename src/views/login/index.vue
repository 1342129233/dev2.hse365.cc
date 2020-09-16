<template>
  <div>
    <Headertop :headtitle="headtitle"></Headertop>
    <div class="login-section">
      <van-tabs v-model="active">
        <van-tab title="登录">
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-checkbox v-model="checked" icon-size="14px" class="pass_jz"
              >记住密码</van-checkbox
            >
            <div style="margin: 16px">
              <van-button
                round
                block
                type="primary"
                native-type="submit"
                size="small"
              >
                登录
              </van-button>
            </div>
          </van-form>
          <div class="retrieve">找回密码</div>
        </van-tab>
        <van-tab title="注册">
          <van-form @submit="zhuce">
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field v-model="tel" type="tel" label="手机号" />
            <!-- 短信验证码 -->
            <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  type="primary"
                  native-type="submit"
                  size="small"
                  @click.prevent="senden"
                  >{{ verificationcode }}</van-button
                >
              </template>
            </van-field>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <!-- 允许输入正整数，调起纯数字键盘 -->
            <van-field v-model="digit" type="digit" label="企业码" />
            <van-checkbox v-model="agreement" class="pass_jz" icon-size="14px"
              >我已阅读并同意<span class="color-green"
                >《HSE服务协议》</span
              ></van-checkbox
            >
            <div style="margin: 16px">
              <van-button
                round
                block
                type="primary"
                native-type="submit"
                size="small"
              >
                注册
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { Provide, Component, Vue } from "vue-property-decorator";
import Headertop from "@/views/common/head.vue";
// import { UserModule } from "@/store/modules/users"
// import { getModule } from 'vuex-module-decorators'
import { UsersModule } from "@/store/modules/users";

@Component({
  components: {
    Headertop
  }
})
export default class Login extends Vue {
  private headtitle = "登录/注册";
  private checked = true; // 记住密码
  private active = 2; // 切换注册登录
  private username = "12345678913"; // 账号
  private password = "666666"; // 密码
  private tel = ""; // 手机号
  private sms = ""; // 短信验证码
  private digit = ""; // 企业码
  private agreement = true; // 协议
  private verificationcode = "获取验证码"; // 获取验证码 切换 倒计时
  private secoped = 60;
  // 登录
  onSubmit(): void {
    const am = {
      username: this.username,
      password: this.password
    };
    UsersModule.userspromStaff({ router: this.$router, am });
  }
  // 获取验证码
  senden() {
    const interval = window.setInterval(() => {
      this.verificationcode = "(" + this.secoped + "秒)";
      --this.secoped;
      if (this.secoped < 0) {
        this.verificationcode = "重新发送";
        this.secoped = 60;
        window.clearInterval(interval);
      }
    }, 1000);
  }
  // 注册
  zhuce() {
    console.log(123);
  }
}
</script>
<style lang="scss" scoped>
.login-section {
  padding: 100px 20px 0px 20px;
  .pass_jz {
    margin-top: 10px;
  }
  .retrieve {
    color: $color-green;
  }
}
</style>
