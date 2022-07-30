<template>
  <div class="">
    <van-cell title="搜索历史" class="fixde1">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon
          name="iconmoon icon-12"
          class="search-icon"
          v-if="show"
          @click="show = false"
        />
        <div v-else>
          <span @click="AllClick">全部删除 </span>
          &nbsp;&nbsp;
          <span @click="show = true">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      @click="delete1(item, index)"
    >
      <template #right-icon>
        <van-icon
          name="iconmoon icon-7"
          class="search-icon"
          v-if="show == false"
        />
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    history: Array,
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    delete1(item, index) {
      if (this.show == false) {
        // 删除
        this.history.splice(index, 1);
      } else {
        // 跳转
        this.$emit("search", item);
      }
    },
    AllClick() {
      this.$emit("delete");
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
<style lang="less" scoped>
:deep(.fixde1) {
  padding-top: 110px;
}
</style>
