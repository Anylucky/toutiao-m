import axios from "../util/request";

export const userChannel = () => {
  return axios({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};
