<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="onClickLeft"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="data1 == false">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="list.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ list.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="list.aut_photo"
          />
          <div slot="title" class="user-name">{{ list.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ list.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="list.is_followed == false"
            @click="guanZhu"
            >关注</van-button
          >
          <van-button v-else class="follow-btn" round size="small"
            >已关注</van-button
          > -->
          <!-- <userFollow :isFollowed="list.is_followed" :autId="list.aut_id" @floowed=""></userFollow> -->
          <userFollow
            v-model="list.is_followed"
            :autId="list.aut_id"
          ></userFollow>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="img"
          v-html="list.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment
          @replyClick1="replyClick2"
          :list="listCommtent"
          :artId="list.art_id"
          @num1="num3 = $event"
          ref="listData"
        ></comment>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="error1 == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 90%">
      <replyComment
        :comment="rePlyCom"
        @close="isReplyShow = false"
        v-if="isReplyShow"
      ></replyComment>
    </van-popup>
    <!-- /评论回复 -->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showPopup"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="num3" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <Collection
        v-model="list.is_collected"
        :collectID="list.art_id"
      ></Collection>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <like v-model="list.attitude" :likeId="list.art_id"></like>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="show" position="bottom">
      <comPost :artId="list.art_id" @faBuImg="faBuImg1"></comPost>
    </van-popup>
  </div>
</template>
<script>
import { geticle } from "@/api/article";

import { ImagePreview } from "vant";

// 导入关注模块
import userFollow from "@/components/userFollow/index.vue";
// 导入收藏模块
import Collection from "@/components/Collection/index.vue";
// 导入点赞模块
import like from "@/components/like/index.vue";
// 导入评论
import comment from "./components/comment1.vue";
// 导入评论弹出层
import comPost from "./components/commitPost.vue";
// 评论回复
import replyComment from "./components/reply-comment.vue";
export default {
  data() {
    return {
      list: {},
      data1: false,
      error1: 0,
      images: [],
      num3: 0,
      show: false,
      // 评论列表
      listCommtent: [],
      // 弹层
      isReplyShow: false,
      // 回复评论对象
      rePlyCom: {},
    };
  },
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  // 注册的模块
  components: {
    userFollow,
    Collection,
    like,
    comment,
    comPost,
    replyComment,
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    // num2(val) {
    //   console.log(val);
    //   this.num3 = val;
    // },
    onClickLeft() {
      this.$router.back();
    },
    // 获取文章数据
    async getartitemData(val) {
      try {
        let { data } = await geticle(val);

        // if (Math.random() > 0.5) {
        //   return JSON.parse("sdsdasdasdad");
        // }
        console.log("请求文章数据成功");
        this.data1 = true;
        this.list = data.data;

        // 图片处理
        setTimeout(() => {
          this.imgData();
        }, 0);
      } catch (error) {
        this.data1 = true;
        console.log("请求文章数据错误");
      }
    },
    imgData() {
      let data = this.$refs["img"];
      let data1 = data.querySelectorAll("img");
      let images = [];
      console.log(data1);
      data1.forEach((item, index) => {
        // console.log(item.currentSrc/src);
        images.push(item.src);
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    showPopup() {
      this.show = true;
    },
    // 接收发布信息
    faBuImg1(val) {
      this.show = false;
      console.log(val);
      // this.$refs.listData.list.unshift(val.new_obj);
      // this.list = [...val.new_obj, ...this.list];
      this.listCommtent.unshift(val.new_obj);
    },
    // 回复区域
    replyClick2(val) {
      console.log(val);
      this.isReplyShow = true;
      this.rePlyCom = val;
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {
    console.log(this.articleId);
    this.getartitemData(this.articleId);
  },
  // 钩子函数 挂载
  mounted() {},
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
