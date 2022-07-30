import axios1 from "../util/request";

export const userAllTab = () => {
  return axios1({
    url: "/v1_0/channels",
  });
};

// 已登录添加
export const loggedInToAdd = (channel) => {
  return axios1({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [channel],
    },
  });
};
// 删除频道
export const deleteUserChannel = (channelId) => {
  return axios1({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};
