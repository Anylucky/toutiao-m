<template>
  <div class="">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in resultArray"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { searchResultAPI } from "@/api/search";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pageMath: 20,
      resultArray: [],
      error: false,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    searchText: String,
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async onLoad() {
      try {
        let { data } = await searchResultAPI({
          page: this.page,
          per_page: this.pageMath,
          q: this.searchText,
        });
        this.resultArray = [...this.resultArray, ...data?.data?.results];
        this.loading = false;
        console.log(data?.data?.results);
        if (data?.data?.results.length <= 0) {
          this.finished = true;
        } else {
          this.page++;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        return console.log(error);
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
