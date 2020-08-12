/**
 * @author  keiferju
 * @time    2019-08-29 12:57
 * @title   http请求封装
 * @desc
 *
 */
import qs from 'qs'
import { Interceptors } from "@/unils/interceptors";
// import { message, Modal } from "ant-design-vue"; // 弹吐司
// import router from "../router";

export class HttpService {
  public axios: any;
  public modal: any;

  constructor() {
    // 获取axios实例
    this.axios = new Interceptors().getInterceptors();
  }

  /**
   * get请求
   * @param params  参数
   * @param jwt   是否token校验
   * @param modulename    模块
   * @param operation     接口
   * @param flag          标记
   * @param verson       版本,默认1.0.0
   * @param service      服务,默认services
   */
  public getData(
    params: object,
    // jwt: boolean,
    // modulename: string,
    operation: string
    // flag: string,
    // verson = "1.0.0",
    // service = "services"
  ) {
    const url = operation;
    const body = {
      parameter: {
        data: params
        // tag: flag
      }
    };

    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body
          // headers: { isJwt: jwt }
        })
        .then((res: any) => {
          this.resultHandle(res, resolve);
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  /**
   * post请求
   * @param params  参数
   * @param jwt   是否token校验
   * @param modulename    模块
   * @param operation     接口
   * @param flag          标记
   * @param verson       版本,默认1.0.0
   * @param service      服务,默认services
   */
  public postData(
    params: any,
    // jwt: boolean,
    operation: string
  ) {
    const url = operation;
    return new Promise((resolve, reject) => {
      this.axios
        // ({
        //   url: url,
        //   method: 'POST',
        //   params
        // })
        .post(url, qs.stringify(params), {
          // headers: { isJwt: jwt }
          // header: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((res: any) => {
          // this.resultHandle(res, resolve)
          resolve(res.data);
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  /**
   *
   * @param res
   * @param resolve
   */
  public resultHandle(res: any, resolve: any) {
    if (res.status > 0) {
      resolve(res.data);
    } else {
      this.errorHandle(res);
    }
  }

  /**
   * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
   * @param res
   */
  public errorHandle(res: any) {
    // message.warn(res.msg); // 统一谈服务端提示,我们提示统一由服务端提供
    console.log("弹框");
    // 状态码判断
    switch (res.status) {
      case -102:
        break;
      case -152:
        break;
      default:
      // console.log(other);
    }
  }
}
