import axios1 from "@/util/request";

// 收藏
export const collectionAPI = (target) => {
  return axios1({
    url: "/v1_0/article/collections",
    data: {
      target,
    },
  });
};

// 取消收藏

export const DEcollectionAPI = (target) => {
  return axios1({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });
};
