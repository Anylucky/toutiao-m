<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        @click="btnLike"
        :loading="state1"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        >{{ comment.like_count ? comment.like_count : "" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content" v-html="comment.content"></p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('replyClick', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>
<script>
// 点赞API
import { addLike, DeleLike } from "@/api/comment";
export default {
  data() {
    return {
      state1: false,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    comment: { type: [String, Array, Object] },
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async btnLike() {
      // 发起请求
      try {
        if (this.comment.is_liking) {
          // 已点赞取消
          await DeleLike(this.comment.com_id);
          this.state1 = true;
        } else {
          //未点赞 点赞
          await addLike(this.comment.com_id);
          this.state1 = true;
        }
      } catch (error) {
        this.state1 = true;
        this.$notify({
          type: "success",
          message: "操作失败",
          duration: 1000,
        });
        console.log("评论点赞错误", error);
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
<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
