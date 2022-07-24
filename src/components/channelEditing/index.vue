<template>
  <div class="">
    <van-cell title="我的频道" center class="myP">
      <template #default>
        <van-button
          round
          type="info"
          size="mini"
          v-if="icon == null"
          color="#fb7299"
          @click="edit1"
          >编 辑</van-button
        >
        <van-button
          round
          type="info"
          v-else
          size="mini"
          color="#fb7299"
          @click="edit2"
          >完 成</van-button
        >
      </template>
    </van-cell>

    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="index"
        :icon="icon"
        class="grid-item mao3"
        @click="tiaozhuan(item, index)"
      >
        <span slot="text" :class="{ mao3: true, mao4: index == highlight }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 全部频道 -->
    <van-cell title="频道推荐" center class="myP" />

    <van-grid :gutter="10" border:false>
      <van-grid-item
        :text="item.name"
        v-for="item in allChannels"
        :key="item.id"
        @click="Allch(item.id)"
      />
    </van-grid>
  </div>
</template>
<script>
import { userAllTabAPI } from "@/api/index";
// 导入store
import { mapState } from "vuex";
// 导入本地存储方法
import { setItem } from "@/store/strong";
// 导入已登录存储
import { loggedInToAddAPI, deleteUserChannelAPI } from "@/api/index";
export default {
  data() {
    return {
      // 全部标签
      userTabArray: [],
      icon: null,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    channel: Array,
    highlight: {
      type: Number,
    },
  },
  // 注册的模块
  components: {},
  // 计算属性
  computed: {
    ...mapState(["userimg"]),
    allChannels() {
      let canneel = [];
      // console.log(this.channel);
      // console.log(this.userTabArray);
      this.userTabArray.forEach((item) => {
        const mao1 = this.channel.find((item1) => {
          return item1.id === item.id;
        });
        // console.log(mao1);
        if (!mao1) {
          canneel.push(item);
        }
      });
      return canneel;
    },
  },
  // 监听
  watch: {},
  // 方法
  methods: {
    async Allch(val) {
      if (this.icon !== null) {
        // console.log(val);
        let bo1 = this.userTabArray.find((item) => item.id == val);
        // console.log(bo1);
        this.channel.push(bo1);

        // 判断是否登录
        if (this.userimg) {
          // 已登录 添加
          console.log("进入已登录");
          try {
            await loggedInToAddAPI({ id: item.id, seq: this.channel.index });
          } catch (error) {
            console.log("登录请求错误");
          }
        } else {
          // 未登录 添加
          console.log("进入未登录");
          setItem("NouSerimg", this.channel);
        }
      }
      return;
    },

    // 编辑按钮
    edit1() {
      this.icon = "clear";
    },
    // 完成按钮
    edit2() {
      this.icon = null;
    },
    // 跳转
    async tiaozhuan(item, index) {
      if (this.icon !== null) {
        if (this.channel.length <= 6) {
          return this.$notify({
            type: "danger",
            message: `标签不得少于6个`,
            duration: 1000,
          });
        }
        // console.log(index);
        // console.log(this.highlight);

        this.channel.splice(index, 1);
        // 判断是否为红字前面的标签被删除  如果是 将页签减一 并传递
        if (index < this.highlight) {
          this.$emit("pushData", this.highlight - 1, true);
        }
        // 判断是否登录

        // 判断是否登录
        if (this.userimg) {
          // 已登录  删除
          console.log("进入已登录 删除");
          try {
            console.log(item.id);
            await deleteUserChannelAPI(item.id);
            console.log("添加删除成功");
          } catch (error) {
            console.log("登录请求错误");
          }
        } else {
          // 未登录  删除
          console.log("进入未登录");
          setItem("NouSerimg", this.channel);
        }
        return;
      }
      // console.log(item);
      // console.log(index);
      return this.$emit("pushData", index);
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  async created() {
    try {
      let { data } = await userAllTabAPI();
      // console.log(data);
      this.userTabArray = data.data.channels;
    } catch (error) {
      if (error.response.status == 507) {
        console.log("数据库错误");
      } else {
        console.log("获取全部频道失败");
      }
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
.myP {
  font-size: 30px;
}
:deep(.van-grid-item__content) {
  background: #f3f5f7;
  height: 70px;
  border-radius: 30px;
}
:deep([class*="van-hairline"]::after) {
  border: none;
}

// 徽标
// .badge-icon {
//   display: block;
//   font-size: 10px;
//   line-height: 16px;
// }

:deep(.my-grid) {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}

:deep(.van-grid-item__icon + .van-grid-item__text) {
  margin-top: 0px;
}

.mao3 {
  font-size: 16px;
}
.mao4 {
  color: #fb7299;
  // background-color: red;
}
</style>
