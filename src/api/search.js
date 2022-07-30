import axios1 from "../util/request";
export const searchHint = (data) =>
axios1({
    url: "/v1_0/suggestion",
    method: "GET",
    params: {
      q: data,
    },
  });
//  搜索结果
export const searchResultAPI = (params) => {
  return axios1({
    url: "/v1_0/search",
    method: "GET",
    params,
  });
};
