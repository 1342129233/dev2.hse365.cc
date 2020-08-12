import { HttpService } from "./unils/http";

declare module "vue/types/vue" {
  interface Vue {
    $httpService: HttpService;
  }
}
