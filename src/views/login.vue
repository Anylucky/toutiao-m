<template>
  <div class="">
    <van-nav-bar :title="$route.meta.title" class="title">
      <template #left>
        <van-icon name="iconmon icon-7" size="12" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="from1">
      <van-cell-group>
        <van-field
          name="mobile"
          v-model="user.mobile"
          label="请输入手机号"
          placeholder="请输入手机号"
          label-align="right"
          left-icon="icomoon icon-15"
          :rules="formValidation.phone"
          clearable
          center
        >
          <!-- <i slot="left-icon" class="icomoon icon-15"></i> -->
        </van-field>
        <van-field
          name="code"
          v-model="user.code"
          clearable
          label="请输入验证码"
          left-icon="icomoon icon-3"
          placeholder="请输入验证码"
          center
          :rules="formValidation.code"
        >
          <template #button class="btn1">
            <van-count-down
              :time="time"
              v-if="timeShow == true"
              @finish="finish"
            >
              <template #default="timeData">
                <span class="countDown">{{ timeData.seconds + "s" }}</span>
              </template>
              <!-- <van-count-down
                ref="countDown"
                :time="time"
                :auto-start="true"
                @finish="finish"
                #default="timeData"
                >{{ timeData.seconds + "s" }}</van-count-down
              > -->
            </van-count-down>
            <van-button round size="small" type="default" @click="oncode" v-else
              >发送验证码</van-button
            >
          </template></van-field
        >
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-cell-group>
    </van-form>

    <p class="Privacy">隐私条款</p>
  </div>
</template>
<script>
import { registerAPI, sendVerificationCodeAPI } from "@/api/index.js";
export default {
  data() {
    return {
      timeShow: false,
      time: 1 * 1 * 10 * 1000,
      user: { mobile: "", code: "" },
      formValidation: {
        phone: [
          {
            require: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            require: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {},
  // 注册的模块
  components: {},
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 方法
  methods: {
    // async onOpened() {
    //   await this.$router.push({
    //     path: "/my",
    //   });
    // },
    // 登录接口
    register1(val) {
      return registerAPI(val);
    },

    // 表单提交
    async onSubmit(values) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      setTimeout(async () => {
        try {
          let mao1 = await this.register1(values);
          // console.log(mao1.data.data.token);
          this.$store.commit("setUser", mao1.data.data.token);
          console.log("123");
          this.$notify({
            type: "success",
            message: "登陆成功",
            duration: 1000,
          });
          this.$router.push("/my");

          this.user.code = "";
          this.user.mobile = "";
        } catch (err) {
          if (err.response.status === 400) {
            this.$notify({ type: "danger", message: "账号或密码错误" });
          } else {
            this.$notify({ type: "danger", message: "请稍后重试" });
          }
        }
      }, 2000);
    },

    // 倒计时结束
    finish() {
      this.timeShow = false;
    },

    // 验证码点击事件
    async oncode() {
      let bo2 = await this.$refs.from1.validate("mobile").catch((err) => err);
      console.log("校验结果", bo2);
      if (bo2) return;

      // 隐藏发送按钮
      this.timeShow = true;

      // 发送请求
      try {
        let messageS = await sendVerificationCodeAPI(this.user.mobile);
        this.$notify({ type: "success", message: "发送成功" });
      } catch (err) {
        console.log(err);
        if (err.response.status === 429) {
          this.timeShow = false;
          return this.$notify({
            type: "danger",
            message: "发送过于频繁,请稍后重试",
          });
        } else {
          this.timeShow = false;
          return this.$notify({
            type: "danger",
            message: "发送失败 请稍后重试",
          });
        }
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
<style scoped>
.title {
  background-color: #3196fa;
}
::v-deep .van-nav-bar__title {
  color: white;
}
::v-deep .van-field__button {
  border-left: 1px solid #ccc;
}
::v-deep .van-button--default {
  background-color: #eeeeee;
}
.Privacy {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #ccc;
}
.icon-15 {
  font-size: 30px;
  line-height: inherit;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.countDown {
  text-align: center;
}
::v-deep .van-count-down {
  text-align: center;
}
.icon-7 {
  color: white;
  font-size: 12px;
}
</style>
