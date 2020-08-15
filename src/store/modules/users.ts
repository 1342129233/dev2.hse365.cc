import {
  getModule,
  Module,
  Mutation,
  VuexModule,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { addStaffRequest } from "@/api/login";
import { Notify } from "vant";
import VueRouter from "vue-router";

@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true
})

// class 写法
export default class User extends VuexModule {
  token: any = "";

  @Mutation
  TOKENKEY(tokenkey: any) {
    localStorage.setItem("token", tokenkey);
    const key = localStorage.getItem("token");
    this.token = key;
  }

  @Action
  // 存 token 值
  userspromStaff(data: { router: VueRouter; am: any }) {
    const { router, am } = data;
    new Promise((resolve, reject) => {
      return addStaffRequest(am).then(({ data }) => {
        console.log(data);
        if (data.code == 0) {
          this.context.commit("TOKENKEY", data.data.token);
          Notify({ type: "success", message: "登陆成功" });
          router.push({ path: "/home" });
        }
      });
    });
  }
}

export const UsersModule = getModule(User);
