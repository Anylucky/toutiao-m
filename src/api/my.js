import axios1 from "../util/request";
import store from "../store/index";
export const userInformation = () => {
  return axios1({
    url: "/v1_0/user",
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${store.state.userimg}`,
    // },
  });
};
