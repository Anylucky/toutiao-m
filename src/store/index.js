import Vue from "vue";
import Vuex from "vuex";
import { setItem, getItem } from "./strong.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 读取数据  转为转为对象
    userimg: getItem("userimg"),
  },
  getters: {},
  mutations: {
    // 存入 转换为json类型
    setUser(state, val) {
      console.log(val);
      state.userimg = val;
      console.log(state.userimg);
      // 备份  读取vuex数据
      setItem("userimg", state.userimg);
    },
  },
  actions: {},
  modules: {},
});
