<template>
  <!-- 导航栏 -->
  <div class="">
    <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="Submit"
    />
    <!-- textary 区域 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="12"
      placeholder=""
      show-word-limit
      size="large"
    />
  </div>
</template>
<script>
import { modifyNickname } from "@/api/modifyUser";
export default {
  data() {
    return {
      message: this.value,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    value: {
      type: String,
    },
  },
  // 注册的模块
  components: {},
  // 方法
  methods: {
    async Submit() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        let { data } = await modifyNickname({
          name: this.message,
        });

        this.$emit("input", this.message);
        this.$emit("close");
        this.$toast.success({
          message: "修改成功",
        });
      } catch (error) {
        if (error.response && error.response.state == 409) {
          return this.$toast.fail("用户名已存在");
        }
        this.$toast.fail("修改失败");
      }
    },
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 局部指令
  directives: {},
  // 依赖注入
  provide: function () {
    return {};
  },
  // 依赖导入
  inject: {},
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
