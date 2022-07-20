import axios from "../util/request";
import store from "../store/index";
export const userInformation = () => {
  return axios({
    url: "/v1_0/user",
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${store.state.userimg}`,
    // },
  });
};
