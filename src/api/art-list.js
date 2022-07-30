import axios1 from "../util/request";

export const listData = (params) => {
  return axios1({
    url: "/v1_0/articles",
    method: "GET",
    params,
  });
};
