<template>
  <div class="my-container">
    <!-- 头部区域 -->
    <!-- 已登录区域 -->
    <div class="header user-info" key="" v-if="userimg">
      <div class="base-info">
        <div class="left">
          <!--
		image: 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示 
		round: 设置图片变圆
		fit="cover" ： fit填充模式：	cover保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
		  -->
          <van-image class="avatar" :src="UserImg.photo" round fit="cover" />
          <span class="name">{{ UserImg.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ UserImg.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserImg.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserImg.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserImg.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录区域 -->
    <div class="header not-login" v-else>
      <div class="login-btn">
        <button class="text" @click="$router.push('/login')">注册/登录</button>
      </div>
    </div>
    <!-- 宫格导航 -->
    <!-- 宫格导航
	column-num: 2 ，列数为2列，代表一行两列
	clickable: 是否开启格子点击反馈(点击格子之后，会出现灰色效果)
  -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconmoon icon-14"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconmoon icon-9"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <!-- 已登录按钮 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="userimg"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="esc1"
    />
  </div>
</template>
<script>
// 导入user映射
import { mapState } from "vuex";
import { userInformationAPI } from "@/api/index.js";
export default {
  data() {
    return {
      UserImg: {},
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {},
  // 注册的模块
  components: {},
  // 计算属性
  computed: {
    
    //store映射
    ...mapState(["userimg"]),
  },
  // 监听
  watch: {},
  // 方法
  methods: {
    esc1() {
      this.$dialog
        .confirm({
          title: "确认退出登录么?",
        })
        .then(() => {
          this.$store.commit("setUser", null);
          // this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },

    // 用户信息读取
    async getUserImg() {
      try {
        let { data } = await userInformationAPI();
        this.UserImg = data.data;
      } catch (error) {
        // 信息读取失败
        this.$store.commit("setUser", null);
        this.$notify({
          type: "danger",
          message: "获取信息失败",
        });
      }
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  async created() {},
  // 钩子函数 挂载
  async mounted() {
    if (this.$store.state.userimg) {
      this.getUserImg();
    }
  },
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/cd52d4ac1d336c940cc4958120170f7928d9e606.png@2560w_400h_100q_1o.webp")
      no-repeat; // css中使用@需要添加~,@代表src
    background-size: 190% 100%; //
    background-position: center;
    background-color: #ff5ca1;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        background: #fb7299;
        // outline: none;
        border-radius: 20px;
        border: none;
        font-size: 28px;
        color: white;
        width: 150px;
        height: 70px;
        font-weight: 700;
      }
    }
  }
}

// 已登录
.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}

// 宫格导航
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}

// 已登录追加按钮
.logout-cell {
  text-align: center;
  color: #d86262;
}

.mb-9 {
  margin-bottom: 9px;
}

// .icon-14:before {
//   font-size: 20px;
// }
</style>
