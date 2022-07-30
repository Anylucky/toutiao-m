<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="imgChange" />
    <van-cell
      title="头像"
      is-link
      class="photo-cell"
      center
      @click="$refs.file.click()"
    >
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- /导航栏 -->

    <!-- 修改名称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="nicknamePopup = true"
    />

    <!-- 修改性别 -->
    <van-cell
      title="性别"
      :value="user.gender !== 1 ? '男' : '女'"
      is-link
      @click="sexPopup = true"
    />

    <!-- 修改生日 -->
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="birthdayPopup = true"
    />

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="nicknamePopup"
      position="bottom"
      :style="{ height: '100%' }"
      round
    >
      <userName
        @close="nicknamePopup = false"
        v-if="nicknamePopup"
        v-model="user.name"
      ></userName>
    </van-popup>
    <!-- 昵称弹出层 -->

    <!-- 修改性别弹出层 -->
    <van-popup
      v-model="sexPopup"
      position="bottom"
      :style="{ height: '40%' }"
      round
    >
      <userSex
        v-model="user.gender"
        @close="sexPopup = false"
        v-if="sexPopup"
      ></userSex>
    </van-popup>
    <!-- 修改性别弹出层 -->

    <!-- 修改生日弹出层 -->
    <van-popup
      v-model="birthdayPopup"
      position="bottom"
      :style="{ height: '40%' }"
      round
    >
      <userBirthday
        v-model="user.birthday"
        v-if="birthdayPopup"
        @close="birthdayPopup = false"
      ></userBirthday>
    </van-popup>
    <!-- 修改生日弹出层 -->

    <!-- 头像弹层 -->
    <van-popup
      v-model="ImgPopup"
      position="bottom"
      :style="{ height: '100%' }"
      round
    >
      <userImg
        :img="imgUrl1"
        @close="ImgPopup = false"
        @input1="user.photo = $event"
        v-if="ImgPopup"
      ></userImg>
    </van-popup>
    <!-- 头像弹层 -->
  </div>
</template>
<script>
import { modifyUser } from "@/api/modifyUser";

// 导入昵称模块
import userName from "./components/userName.vue";
// 导入性别模块
import userSex from "./components/userSix.vue";
// 导入生日模块
import userBirthday from "./components/userBri.vue";
// 导入头像弹层模块
import userImg from "./components/userImg.vue";
export default {
  data() {
    return {
      user: {},
      nicknamePopup: false,
      sexPopup: false,
      birthdayPopup: false,
      ImgPopup: false,
      imgUrl1: null,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {},
  // 注册的模块
  components: {
    userName,
    userSex,
    userBirthday,
    userImg,
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    async modifyUser() {
      try {
        let { data } = await modifyUser();
        console.log(data);
        this.user = data.data;
        console.log("获取用户数据成功");
      } catch (error) {
        console.log("读取用户数据失败", error);
      }
    },
    imgChange() {
      let imgUrl = this.$refs.file.files[0];
      this.imgUrl1 = window.URL.createObjectURL(imgUrl);

      //   打开图片弹层
      this.ImgPopup = true;

      //   为防止出现打开同一图片  第二次不弹出问题 清空文件的value
      this.$refs.file.value = "";
    },
  },
  // 局部指令
  directives: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {
    this.modifyUser();
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
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }

  .photo-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
