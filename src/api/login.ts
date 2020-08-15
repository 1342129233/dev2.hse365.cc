import axios from "@/unils/api.request";

const _api = "_api";
export function addStaffRequest(data: any) {
  return axios.request({
    url: `${_api}/login`,
    method: "POST",
    data
  });
}
