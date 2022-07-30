import axios1 from "@/util/request";

export const addLike = (target) => {
  return axios1({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target: target,
    },
  });
};

/**
 * 取消点赞
 */
export const deleteLike = (target) => {
  return axios1({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`,
  });
};
