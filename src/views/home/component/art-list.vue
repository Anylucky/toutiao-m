<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      head-height="80"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="@/assets/src=http___p5.itc.cn_images01_20201019_1f44176fdc574696bb32e8bdd9f39d9f.jpeg&refer=http___p5.itc.webp"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img
          class="doge"
          src="@/assets/src=http___p5.itc.cn_images01_20201019_1f44176fdc574696bb32e8bdd9f39d9f.jpeg&refer=http___p5.itc.webp"
        />
      </template>
      <template #loading>
        <img
          class="doge"
          src="@/assets/src=http___p5.itc.cn_images01_20201019_1f44176fdc574696bb32e8bdd9f39d9f.jpeg&refer=http___p5.itc.webp"
        />
      </template>

      <!-- 加载提示 -->
      <template #success>
        <img
          class="doge"
          src="@/assets/d57b0083882b4af198f0fc587a618bbf.webp"
        />
      </template>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <art_item
          v-for="(item, index) in list"
          :key="index"
          :item="item"
        ></art_item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { listDataAPI } from "@/api/index";

// 导入组件
import art_item from "@/components/art-item/index.vue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,

      //   时间戳记录
      timestamp: null,
      //   下拉刷新
      refreshing: false,
      // refreshSuccessText: "",
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    listData: {
      //   type: Array,
      require,
    },
  },
  // 注册的模块
  components: {
    // 注册组件
    art_item,
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
      try {
        // 发送请求
        let { data } = await listDataAPI({
          channel_id: this.listData.id,
          timestamp: this.timestamp || new Date(),
          with_top: 1,
        });
        // console.log(data);
        //   把数据加入数组
        let data2 = data?.data?.results;
        // 在数组后末尾添加
        this.list = [...this.list, ...data2];
        // 让loading 完成加载  以便下次触发
        this.loading = false;
        // console.log(data?.data?.results.length);

        // 判断是否还有数据
        if (data?.data?.results.length) {
          // 有数据  保存返回的下次时间戳
          this.timestamp = data?.data?.pre_timestamp;
        } else {
          // 无数据  显示完成加载  没有更多数据
          this.finished = true;
        }
        console.log("请求成功");
      } catch (error) {
        if (error.response.status === 507) {
          return console.log("请求列表错误--数据库");
        } else if (error.response.status === 400) {
          return console.log("请求列表错误--请求参数");
        } else {
          return console.log("请求列表错误");
        }
        // 最后必定执行 finally
      } finally {
        // 让 加载可以持续
        this.loading = false;
      }
    },

    // 下拉刷新
    async onRefresh() {
      try {
        // 发送请求
        let { data } = await listDataAPI({
          channel_id: this.listData.id,
          timestamp: this.timestamp || new Date(),
          with_top: 1,
        });
        // console.log(data);
        //   把数据加入数组
        let data2 = data?.data?.results;
        // 数据结构  把数据添加到 数组最前面
        this.list = [...data2, ...this.list];

        // 判断是否还有数据
        if (data?.data?.results.length) {
          this.timestamp = data?.data?.pre_timestamp;
        } else {
          this.refreshing = false;
        }
        // 这里也可以设置为 this.refreshSuccessText 自带方法
        // this.$notify({
        //   type: "success",
        //   message: `刷新成功,共刷新了${data?.data?.results.length}条数据`,
        //   duration: 1000,
        // });
        this.refreshing = false;
      } catch (error) {
        // this.refreshSuccessText = "刷新失败";
        this.$notify({
          type: "danger",
          message: `刷新失败`,
          duration: 1000,
        });
        this.refreshing = false; // 关闭下拉刷新的 loading 状态
      } finally {
        this.refreshing = false;
      }
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  async created() {},
  // 钩子函数 挂载
  mounted() {},
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style scoped>
.doge {
  width: 300px;
  height: 110px;
  margin-top: 8px;
  border-radius: 4px;
}

/* 为每个列表制作单独的滚动 */
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
