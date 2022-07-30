<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    @click="collection"
  />
</template>
<script>
import { collectionAPI, DEcollectionAPI } from "@/api/collection";
export default {
  data() {
    return {};
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    // 默认为value
    value: {
      type: Boolean,
    },
    collectID: {
      type: [Number, String],
    },
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async collection() {
      try {
        if (this.value) {
          // 已收藏
          await DEcollectionAPI(this.collectID);
        } else {
          // 未收藏
          await collectionAPI(this.collectID);
        }
        this.$emit("input", !this.value);
        if (this.value) {
          this.$notify({
            type: "success",
            message: "取消成功",
            duration: 1000,
          });
        } else {
          this.$notify({
            type: "success",
            message: "收藏成功",
            duration: 1000,
          });
        }
      } catch (error) {
          console.log("收藏失败", error);
        
      }
    },
  },
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
<style lang="less" scoped></style>
