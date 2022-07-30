import axios1 from "@/util/request";
// 获取用户数据
export const modifyUser = () => {
  return axios1({
    url: "/v1_0/user/profile",
  });
};

// 修改用户名/性别
export const modifyNickname = (data) => {
  return axios1({
    url: "/v1_0/user/profile",
    method: "PATCH",
    data,
  });
};
// 图片修改
export const updateUserPhoto = (data) => {
  return axios1({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
