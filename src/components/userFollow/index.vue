<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-if="isFollowed == false"
    @click="guanZhu"
    >关注</van-button
  >
  <van-button v-else class="follow-btn" round size="small" @click="guanZhu"
    >已关注</van-button
  >
</template>
<script>
import { guanZhu1, guanZhu1Dele } from "@/api/article";

export default {
  data() {
    return {};
  },
  model: {
    prop: "isFollowed",
    event: "update-is_followed",
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    isFollowed: {
      type: Boolean,
      default: false,
    },
    autId: {
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
    // 关注
    guanZhu() {
      try {
        if (this.isFollowed) {
          // 已关注
          guanZhu1Dele(this.autId);
        } else {
          // 未关注
          guanZhu1(this.autId);
        }
        // this.list.is_followed = !this.list.is_followed;
        this.$emit("update-is_followed", !this.isFollowed);
      } catch (error) {
        return console.log("设置关注失败", error);
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
