import axios from "../util/request";

export const listData = (params) => {
  return axios({
    url: "/v1_0/articles",
    method: "GET",
    params,
  });
};
