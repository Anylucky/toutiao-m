<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
看下边的图即可明白
      加form  会让ios 手机 的小键盘有搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#fd70a1"
        @search="onSearch"
        @cancel="onCancel"
        shape="round"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
    };
  },

  created() {},

  methods: {
    onSearch(val) {
      //val：输入的关键字
      console.log(val);
    },
    onCancel() {
      this.$router.back(); //返回上一页（首页）
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
</style>
