import axios from "axios";
import store from "../store/index";
// 解决大数字问题
import bigint from "json-bigint";
// axios.defaults.baseURL = "http://toutiao.itheima.net";
const JSONBig = bigint({ storeAsString: true }); // 通过该配置，让超大数字转为字符串

const axios1 = axios.create({
  baseURL: "http://toutiao.itheima.net",

  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data);
        //return JSON.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data,
        };
      }
    },
  ],
});
// 设置请求拦截器
axios1.interceptors.request.use(
  function (config) {
    const { userimg } = store.state;
    if (userimg) {
      config.headers.Authorization = `Bearer ${store.state.userimg}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axios1;
