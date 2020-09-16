import HttpRequest from '@/utils/axios'
// import baseURL from '@/api/baseUrl'
const baseURL = '/_api'
const axios = new HttpRequest(baseURL)

export default axios
