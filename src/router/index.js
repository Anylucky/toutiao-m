import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页" },
      },

      {
        path: "qa",
        name: "qa",
        component: () => import("@/views/qa/index.vue"),
        meta: { title: "问答" },
      },

      {
        path: "video",
        name: "video",
        component: () => import("@/views/video/index.vue"),
        meta: { title: "视频" },
      },

      {
        path: "my",
        name: "my",
        component: () => import("@/views/my/index.vue"),
        meta: { title: "个人中心" },
      },
    ],
  },
  {
    path: "/login",
    // 路由懒加载
    component: () => import("@/views/login.vue"),
    meta: { title: "登录" },
  },
  {
    path: "/search",
    component: () => import("@/views/search/index"),
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article/index"),
    props: true,
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/index"),
  },

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
];

const router = new VueRouter({
  routes,
});

export default router;
