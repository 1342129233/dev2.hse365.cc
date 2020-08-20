import {
  getModule,
  Module,
  Mutation,
  VuexModule,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import {
  bannerRequest,
  iconRequest,
  journalismRequest,
  curriculumRequest
} from "@/api/home";
const _api = "/";
@Module({
  namespaced: true,
  name: "home",
  store,
  dynamic: true
})

// class 写法
export default class Home extends VuexModule {
  public icons: object[] = [];

  // icon
  @Mutation
  ICON(data: any) {
    data.forEach((item: any, index: number) => {
      data[index].img = item.img;
    });
    this.icons = data;
  }

  // 轮播图
  @Action
  bannerStaff(): any {
    return new Promise((resolve, reject) => {
      bannerRequest()
        .then((data: any) => {
          let ds = data.data;
          if (ds.code == 0) {
            resolve(ds);
          }
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  // icon
  @Action
  iconStaff(): any {
    return new Promise((resolve, reject) => {
      iconRequest()
        .then((data: any) => {
          const ds: any = data.data;
          if (ds.code == 0) {
            this.context.commit("ICON", ds.data.homeIcon);
          }
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  // 新闻
  @Action
  journalismStaff(eid: string): any {
    return new Promise((resolve, reject) => {
      journalismRequest(eid)
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  // 课程
  @Action
  curriculumStaff(data: object): any {
    return new Promise((resolve, reject) => {
      curriculumRequest(data)
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

export const HomeModule = getModule(Home);
