<template>
  <div class="">
    
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // 模块名
  name: "",
  // 被传递的内容
  props: {},
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {},
  // 钩子函数 创建
  created() {},
  // 钩子函数 挂载
  mounted() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
  // 局部指令
  directives: {},
};
</script>
<style lang="less" scoped></style>
