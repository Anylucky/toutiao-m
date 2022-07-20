<template>
  <div class="">
    <!-- <van-nav-bar :title="$route.meta.title" /> -->
    <router-view></router-view>
    <van-tabbar route active-color="#fb7299">
      <van-tabbar-item replace to="/home" icon="icomoon icon-16"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/qa" icon="icomoon icon-18"
        >问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="icomoon icon-13 "
        >视频</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="icomoon icon-19">{{
        $store.state.userimg ? "我的" : "未登录"
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {},
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {},
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {},
  // 钩子函数 挂载
  mounted() {},
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style scoped>
/* ::v-deep .van-nav-bar__title {
  color: #fffcfd;
}
::v-deep .van-nav-bar__content {
  background: #fb7299;
} */
</style>
