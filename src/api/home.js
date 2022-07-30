import axios1 from "../util/request";

export const userChannel = () => {
  return axios1({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};
