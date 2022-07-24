import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/fonts/style.css";
import Vant from "vant";
import "vant/lib/index.css";
import "amfe-flexible";

// 导入时间包
import "./util/dayjs";
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
