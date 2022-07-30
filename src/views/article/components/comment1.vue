<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
  >
    <commitItem
      @replyClick="$emit('replyClick1', $event)"
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    />
  </van-list>
</template>
<script>
import { commentAPI } from "@/api/article";

// 导入组件
import commitItem from "./comment-item.vue";
export default {
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
      numAll: 0,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    artId: {
      type: [String],
    },
    list: {
      type: [Array, Object],
      default: () => [],
    },
    type: {
      type: String,
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  // 注册的模块
  components: {
    commitItem,
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      try {
        let { data } = await commentAPI({
          // 评论类型
          type: this.type,
          //   防止浏览器编码
          source: this.artId,
          // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          offset: this.offset,
          limit: this.limit,
        });
        console.log("222");
        // this.list = [...this.list, ...data.data.results];
        this.list.push(...data.data.results);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (data.data.results.length) {
          console.log("1213");
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = trues;
        this.loading = false;

        console.log("获取评论失败", error);
      }
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {},
  // 钩子函数 挂载
  async mounted() {
    let { data } = await commentAPI({
      // 评论类型
      type: "a",
      //   防止浏览器编码
      source: this.artId,
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: this.offset,
      limit: this.limit,
    });
    this.numAll = data.data.total_count;
    console.log(data.data.total_count);
    this.$emit("num1", data.data.total_count);
  },
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style lang="less" scoped></style>
