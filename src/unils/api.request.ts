import HttpRequest from "./axios";
// import baseURL from '@/api/baseUrl'
const baseURL = "https://dev2.hse365.cc";
const axios = new HttpRequest(baseURL);

export default axios;
