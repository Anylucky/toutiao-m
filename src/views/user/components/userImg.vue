<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onUserImg">完成</div>
    </div>
  </div>
</template>
<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/modifyUser";
export default {
  data() {
    return {
      cropper: null,
    };
  },
  // 组件名
  name: "",
  // 接收父传递的内容
  props: {
    img: {
      type: [String, Number],
    },
  },
  // 注册的模块
  components: {},
  // 方法
  methods: {
    async onUserImg() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0, // 持续展示
        });
        try {
          const formData = new FormData();
          formData.append("photo", blob);
          console.log(blob);
          console.log(formData);
          let { data } = await updateUserPhoto(formData);
          console.log("123");
          this.$emit("input1", data.data.photo);
          this.$emit("close");
          this.$toast.success({
            message: "保存成功",
          });
        } catch (error) {
          console.log("更新失败");
        }
      });
    },

    // async updateUserPhoto(blob) {},
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 局部指令
  directives: {},
  // 依赖注入
  provide: function () {
    return {};
  },
  // 依赖导入
  inject: {},
  // 以下为钩子函数
  // 钩子函数 创建
  created() {},
  // 钩子函数 挂载
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      //   aspectRatio: 16 / 9,
      //   crop(event) {
      //     console.log(event.detail.x);
      //     console.log(event.detail.y);
      //     console.log(event.detail.width);
      //     console.log(event.detail.height);
      //     console.log(event.detail.rotate);
      //     console.log(event.detail.scaleX);
      //     console.log(event.detail.scaleY);
      //   },
    });
  },
  // 钩子函数 更新
  updated() {},
  // 钩子函数 摧毁
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
