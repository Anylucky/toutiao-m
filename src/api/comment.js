import axios1 from "@/util/request";
export const addLike = (target) => {
  return axios1({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
      target,
    },
  });
};
// 删除赞
export const DeleLike = (target) => {
  return axios1({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",
  });
};

// 添加评论
export const addComment = (data) => {
  return axios1({
    url: "/v1_0/comments",
    method: "POST",
    data,
  });
};
