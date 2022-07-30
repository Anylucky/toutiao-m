<template>
  <div class="comment-post">
    <van-field
      v-model.trim="message"
      rows="2"
      class="post-field"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />

    <van-button class="post-btn" @click="commentBtn" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>
<script>
// 导入评论api
import { addComment } from "@/api/comment";
export default {
  data() {
    return {
      message: "",
    };
  },
  // 组件名
  name: "CommentPost",
  // 接收父传递的内容
  props: {
    artId: {
      type: [String, Number],
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async commentBtn() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 1000, // 持续时间，默认 2000，0 表示持续展示不关闭
      });
      try {
        let { data } = await addComment({
          target: this.artId,
          content: this.message,
          art_id: this.articleId ? this.articleId : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        this.message = "";
        this.$emit("faBuImg", data.data);
        this.$toast.success("发布成功");
      } catch (error) {
        this.$toast.fail("发布失败");

        console.log("发布评论失败", error);
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
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
