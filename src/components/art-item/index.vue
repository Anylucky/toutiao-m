<template>
  <van-cell
    size="large"
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: item.art_id,
      },
    }"
  >
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ item.title }}
    </div>
    <!-- 描述信息 -->
    <div slot="label">
      <div v-if="item.cover.type === 3" class="cover-wrap">
        <div
          v-for="(item1, index) in item.cover.images"
          :key="index"
          class="cover-item"
        >
          <van-image
            width="100"
            fit="cover"
            height="80"
            class="cover-item-img"
            :src="item1"
          />
        </div>
      </div>
      <!-- 评论 -->
      <div class="label-info-wrap">
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧图片 -->
    <div slot="default" v-if="item.cover.type === 1">
      <div class="right-cover">
        <van-image
          width="100"
          height="100"
          fit="contain"
          :src="item.cover.images[0]"
        />
      </div>
    </div>
  </van-cell>
</template>
<script>
export default {
  data() {
    return {};
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    item: Object,
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {
   
  },
  // 钩子函数 挂载
  mounted() {},
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    //.cover-item:last-child : 选择最后一个子元素
    //.cover-item:not(:last-child) : 选择非最后一个子元素
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        //嵌套语法里&代表父元素.cover-item
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
::v-deep .van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
