module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ["Android >= 4.0", "iOS >= 8"],
    // },
    "postcss-pxtorem": {
      //   rootValue: 37.5,
      rootValue: ({ file }) => {
        return file.indexOf("vant") !== -1 ? 37.5 : 70;
      },

      propList: ["*"],

      // 不做单位转换
      exclude: 'github-markdown'
    },
  },
};
