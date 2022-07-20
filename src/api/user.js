import axios from "../util/request";
export const sendVerificationCode = (mobile) => {
  return axios({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "GET",
  });
};
