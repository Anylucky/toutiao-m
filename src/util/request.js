import axios from "axios";
import store from "../store/index";
axios.defaults.baseURL = "http://toutiao.itheima.net";
// 设置请求拦截器
axios.interceptors.request.use(
  function (config) {
    const { userimg } = store.state;
    if (userimg) {
      config.headers.Authorization = "Bearer " + userimg;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axios;
