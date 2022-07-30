<template>
  <div class="home-container">
    <!-- 导航栏 原本只能通过title属性设置一个导航栏的标题，现在添加一个搜索按钮，需要插槽-->
    <!-- 这样的效果就是将原本标题的位置，换成一个按钮进行显示 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!--增加一个名字为title的插槽 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <van-tabs
      class="channel-tabs"
      animated
      v-model="active"
      color="#fb7299"
      title-active-color="#fc8bab"
      offset-top="1.22667rem"
      sticky
    >
      <van-tab
        v-for="item in channelList"
        :key="item.id"
        :title="item.name"
        line-width="40px"
      >
        <list_data :listData="item" class="mao2"></list_data>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="hamburger">
        <i class="iconmoon icon-6" style="color: #fc8bab"></i>
      </div>
    </van-tabs>

    <!-- 编辑导航部分 -->
    <van-popup
      v-model="popup"
      round
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 标题 -->
      <van-nav-bar title="编辑频道" />
      <!-- 主体 -->
      <channelEditing
        :channel="channelList"
        :highlight="active"
        @pushData="tiaozhuan"
      ></channelEditing>
    </van-popup>
  </div>
</template>
<script>
import { userChannelAPI } from "@/api/index";

// 导入模块
import list_data from "./component/art-list";

// 导入频道编辑主体模块
import channelEditing from "@/components/channelEditing/index.vue";

// 导入 vuex
import { mapState } from "vuex";
import { getItem } from "@/store/strong";
export default {
  data() {
    return {
      value: "",
      active: 0,
      channelList: [],
      listData: "文件列表组件",
      popup: false,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {},
  // 注册的模块
  components: {
    list_data,
    channelEditing,
  },
  // 计算属性
  computed: {
    // 挂载映射
    ...mapState(["userimg"]),
  },
  // 监听
  watch: {},
  // 方法
  methods: {
    hamburger() {
      // console.log("1111");
      this.popup = true;
    },
    // 设置先拉框选项 默认为关闭
    tiaozhuan(item, mao = false) {
      // console.log("父已被触发");
      // console.log(this.channelList);
      // console.log(item);
      // let data1 = this.channelList.findIndex((item1) => {
      //   return item1.id == item.id;
      // });
      this.active = item;
      this.popup = mao;
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  async created() {
    let bo1 = getItem("NouSerimg");
    console.log(bo1);
    // 判断是否登录
    if (this.userimg || !bo1) {
      try {
        let { data } = await userChannelAPI();
        this.channelList = data?.data?.channels;
      } catch (error) {
        if (error.response.status === 507) {
          console.log("数据库错误", error);
        } else {
          console.log("获取数据错误");
        }
      }
    } else {
      // 未登录
      this.channelList = bo1;
    }
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
.home-container {
  /* #这里需要添加deep，这个标签样式并不是我们自己添加的标签所带的样式，所以需要添加/deep/或者全局控制，只有是自己添加的标签才可以直接在scoped中控制样式 */
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #fc8bab;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
::v-deep .van-nav-bar__content {
  background-color: #fb7299;
}

//滑动导航栏区域
//样式只能作用于根组件，我们想给子组件设置样式，就需要使用深度操作符：/deep/，或者添加全局样式

//什么情况下要添加/deep/，就去看渲染的时候，这个标签有没有data-v-5954443c这个标记，没有就需要添加/deep/
::v-deep .channel-tabs {
  .van-tabs__wrap {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    height: 82px;
  }

  .van-tab {
    //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    color: #333333;
  }

  .van-tabs__nav {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    padding-bottom: 0;
  }

  .van-tabs__line {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    bottom: 8px;
    width: 50px !important;
    height: 6px;
    background-color: #3296fa;
  }
}

// 汉堡
.placeholder {
  //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0; //此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.icon-6 {
    font-size: 33px;
  }
  &:before {
    //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: "";
    position: absolute;
    left: 0;
    width: 1px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
.mao2 {
  padding-top: 90px;
}
::v-deep .van-nav-bar__title {
  color: white;
}
:deep(element.style) {
  top: none;
}
</style>
