<template>
  <div class="">
    <van-cell
      icon="iconmoon icon-17"
      v-for="(item, index) in searchH"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="font(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { searchHintAPI } from "@/api/index";
// 导入工具包
import { debounce } from "lodash";
export default {
  data() {
    return {
      searchH: [],
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    searchHint: String,
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {
    searchHint: {
      handler: debounce(async function (val) {
        try {
          let { data } = await searchHintAPI(val);
          //   过滤掉为空的数据
          this.searchH = data?.data?.options.filter((it) => it);
        } catch (error) {
          return console.log("数据为空", error);
        }
      }, 1000),
      immediate: true,
    },
  },

  // 方法
  methods: {
    font(val) {
      let rule = `<span class='active'>${this.searchHint}</span>`;
      let rile1 = new RegExp(this.searchHint, "gi");
      return val.replace(rile1, rule);
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
:deep(.active) {
  color: #fd70a1;
}
</style>
