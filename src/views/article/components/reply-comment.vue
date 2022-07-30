<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="全部回复" />

      <!-- 回复 -->
      <commentList
        :list="commentCall"
        :artId="comment.com_id"
        type="c"
      ></commentList>
    </div>
    <!-- 发评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <postComments
        :artId="comment.com_id"
        :articleId="articleId"
        @faBuImg="onFaBuImg"
      ></postComments>
    </van-popup>
  </div>
</template>
<script>
import CommentItem from "./comment-item";
// 导入回复列表组件   复用
import commentList from "./comment1.vue";
// 导入发布评论组件
import postComments from "./commitPost.vue";
export default {
  data() {
    return {
      isPostShow: false,
      commentCall: [],
    };
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    comment: { type: [Array, Object] },
  },
  // 注册的模块
  components: {
    CommentItem,
    commentList,
    postComments,
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    onFaBuImg(val) {
      this.isPostShow = false;
      this.comment.reply_count++;
      this.commentCall.unshift(val.new_obj);
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
<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.scroll-wrap {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
  //   #可以滚动;
}
</style>
