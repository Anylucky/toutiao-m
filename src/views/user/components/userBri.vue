<template>
  <div class="">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>
<script>
import dayjs from "dayjs";
import { modifyNickname } from "@/api/modifyUser";
export default {
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(...this.value.split("-")),
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
    async onConfirm(value) {
      let upData = dayjs(value).format("YYYY-MM-DD");
      //   console.log(updata);
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      console.log(upData);
      try {
        let { data } = await modifyNickname({
          birthday: upData,
        });
        this.$emit("input", upData);
        this.$emit("close");
        this.$toast.success("修改成功");
      } catch (error) {
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
