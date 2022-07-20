import axios from "../util/request";

export const register = (data) => {
  return axios({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
