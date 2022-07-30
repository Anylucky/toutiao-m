import axios1 from "../util/request";
export const geticle = (articleId) => {
  return axios1({
    url: "/v1_0/articles/" + articleId,
    method: "GET",
  });
};

// 关注
export const guanZhu1 = (target) => {
  return axios1({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
};

// 取消关注
export const guanZhu1Dele = (target) => {
  return axios1({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });
};

// 获取评论
export const commentAPI = (params) => {
  return axios1({
    url: "/v1_0/comments",
    method: "GET",
    params,
  });
};
