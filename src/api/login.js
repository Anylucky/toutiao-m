import axios1 from "../util/request";

export const register = (data) => {
  return axios1({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
