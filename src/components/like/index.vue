<template>
  <van-icon
    color="#777"
    :name="value == 1 ? 'good-job' : 'good-job-o'"
    @click="collection"
  />
</template>
<script>
import { addLike, deleteLike } from "@/api/giveTheThumbsUp";
export default {
  data() {
    return {};
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    value: {
      type: [String, Number],
    },
    likeId: {
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
      let state = -1;
      try {
        if (this.value === 1) {
          // 已点赞  取消
          await deleteLike(this.likeId);
        } else {
          // 未点赞
          await addLike(this.likeId);
          state = 1;
        }
        this.$emit("input", state);
        if (state == 1) {
          this.$notify({
            type: "success",
            message: "点赞成功",
            duration: 1000,
          });
        } else {
          this.$notify({
            type: "success",
            message: "取消成功",
            duration: 1000,
          });
        }
      } catch (error) {
        console.log("点赞失败", error);
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
