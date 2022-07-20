import { register } from "./login";
import { sendVerificationCode } from "./user";
import { userInformation } from "./my";
import { userChannel } from "./home";
export const registerAPI = register;
export const sendVerificationCodeAPI = sendVerificationCode;
export const userInformationAPI = userInformation;
export const userChannelAPI = userChannel;
