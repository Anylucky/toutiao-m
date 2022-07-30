import axios1 from "../util/request";
export const sendVerificationCode = (mobile) => {
  return axios1({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "GET",
  });
};
