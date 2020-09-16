import {
  getModule,
  Module,
  Mutation,
  VuexModule,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { addStaffRequest } from "@/api/login";
import { bannerRequest, iconRequest } from "@/api/home";
import { Notify } from "vant";
import VueRouter from "vue-router";
const _api = "/";

// 账号信息
interface E {
  eid: string | null;
  user_id: string | null;
}

let usernamelocal: any = localStorage.getItem("username");
usernamelocal = usernamelocal ? JSON.parse(usernamelocal) : "";

@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true
})

// class 写法
export default class User extends VuexModule {
  token: any = "";
  public username: E = {
    eid: usernamelocal.manage_eid,
    user_id: usernamelocal.id
  };

  @Mutation
  TOKENKEY(tokenkey: any) {
    localStorage.setItem("token", tokenkey.token);
    const key = localStorage.getItem("token");
    this.token = key;

    localStorage.setItem("username", JSON.stringify(tokenkey.user));
    // let usernamelocal:any = localStorage.getItem("username")
    // usernamelocal = usernamelocal ? JSON.parse(usernamelocal) : ''
    // this.username.eid = usernamelocal ? usernamelocal.manage_eid : ''
    // this.username.user_id = usernamelocal ? usernamelocal.id : ''
  }

  @Action
  // 存 token 值
  userspromStaff(data: { router: VueRouter; am: any }) {
    const { router, am } = data;
    return new Promise((resolve, reject) => {
      addStaffRequest(am).then(({ data }) => {
        console.log(data)
        if (data.code == 0) {
          this.context.commit("TOKENKEY", data.data);
          Notify({ type: "success", message: "登陆成功" });
          router.push({ path: "/" });
        }
      });
    });
  }
}

export const UsersModule = getModule(User);
