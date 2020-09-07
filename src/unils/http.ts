import axios from "axios";
import qs from "qs";
class Http {
  private service: any = null;
  constructor() {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    this.service = axios.create({
      baseURL: "/api",
      timeout: 15000
    });
    this.service.interceptors.request.use(
      (config: any) => {
        if (localStorage.getItem("token")) {
          config.headers.Authorization = localStorage.getItem("token");
        }
        config.data = qs.stringify(config.data); // form-data 传参
        return config;
      },
      (error: any) => Promise.reject(error)
    );
    this.service.interceptors.response.use(
      (response: any) => {
        if (response.status === 200) {
          if (response.data) {
            if (response.data.Code === 0) {
              return Promise.resolve(response.data || true);
            }
            return Promise.reject(response.data || true);
          }
          return Promise.resolve(response || false);
        }
        return Promise.reject(response || false);
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }
  public get(url: any, params = {}) {
    return this.service.get(`${url}`, { params });
  }
  public post(url: any, data = {}, config = {}) {
    return this.service.post(`${url}`, data, config);
  }
}

export default new Http();
