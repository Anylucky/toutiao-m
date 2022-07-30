<template>
  <div class="">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="value"
    />
  </div>
</template>
<script>
import { modifyNickname } from "@/api/modifyUser";
export default {
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    value: {
      type: Number,
    },
  },
  // 注册的模块
  components: {},
  // 方法
  methods: {
    // 点击确定
    async onConfirm(value, index) {
      console.log(value, index);
      try {
        let { data } = await modifyNickname({
          gender: index,
        });
        // 更新显示
        this.$emit("input", value);
        // 关闭
        this.$emit("close");
        // 成功提示
        this.$toast.success({
          message: "修改成功",
        });
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },

    // 取消
    onCancel() {
      this.$emit("close");
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
