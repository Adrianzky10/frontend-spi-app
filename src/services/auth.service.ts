import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  IChangePassword,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IUpdateProfile,
} from "@/Types/Auth";

const authServices = {
  register: (payload: IRegister) => {
    return instance.post(`${endpoint.AUTH}/register`, payload);
  },
  activation: (payload: IActivation) => {
    return instance.get(`${endpoint.AUTH}/activation`, {
      params: payload,
    });
  },
  login: (payload: ILogin) => {
    return instance.post(`${endpoint.AUTH}/login`, payload);
  },
  getProfileWithToken: (token: string) => {
    return instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProfile: (token: string, payload: IUpdateProfile) => {
    return instance.put(`${endpoint.AUTH}/me`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  changePassword: (token: string, payload: IChangePassword) => {
    return instance.patch(`${endpoint.AUTH}/change-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  forgotPassword: (payload: IForgotPassword) => {
    return instance.post(`${endpoint.AUTH}/forgot-password`, payload);
  },

  resetPassword: (payload: IResetPassword) => {
    return instance.post(`${endpoint.AUTH}/reset-password`, payload);
  },
};

export default authServices;
