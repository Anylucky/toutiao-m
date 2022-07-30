<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
看下边的图即可明白
      加form  会让ios 手机 的小键盘有搜索按钮 -->
    <form action="/" class="fixed">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#fd70a1"
        @search="onSearch"
        @cancel="onCancel"
        shape="round"
        @focus="information = false"
      />
    </form>
    <searchResult
      v-if="information"
      @search="onSearch"
      :searchText="searchText"
    ></searchResult>

    <searchHint
      v-else-if="searchText"
      @search="onSearch"
      :searchHint="searchText"
    ></searchHint>
    <searchHistory
      v-else
      @search="onSearch"
      @delete="delete1"
      :history="history"
    ></searchHistory>
  </div>
</template>

<script>
// 导入模板
// 搜索提示
import searchHint from "./components/searchHint.vue";
// 搜索历史
import searchHistory from "./components/searchHistory.vue";
// 搜索结果
import searchResult from "./components/searchResult.vue";
// 发起请求

import { getItem, setItem } from "@/store/strong";

export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      information: false,
      // 页码

      // 结果数组

      // 历史
      history: getItem("TOUTIAO_SEARCH_HISTORIES") || [],
    };
  },
  components: {
    searchHint,
    searchHistory,
    searchResult,
  },

  created() {},

  methods: {
    async onSearch(val) {
      this.information = true;
      //val：输入的关键字
      console.log(val);
      // 请求发送
      this.searchText = val;

      // 历史信息
      let index = this.history.indexOf(val);
      if (index !== -1) {
        this.history.splice(index, 1);
      }
      this.history.unshift(val);
    },
    onCancel() {
      this.$router.back(); //返回上一页（首页）
    },
    delete1() {
      this.history = [];
    },
  },
  watch: {
    history(val) {
      setItem("TOUTIAO_SEARCH_HISTORIES", val);
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
:deep(.fixed) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
