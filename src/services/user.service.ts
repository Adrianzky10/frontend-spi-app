import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateUser, IUpdateUser } from "@/Types/User";

const userServices = {
  getUsers: () => {
    return instance.get(endpoint.USERS);
  },

  getUserById: (id: string) => {
    return instance.get(`${endpoint.USERS}/${id}`);
  },

  createUser: (payload: ICreateUser) => {
    return instance.post(endpoint.USERS, payload);
  },

  updateUser: (id: string, payload: IUpdateUser) => {
    return instance.put(`${endpoint.USERS}/${id}`, payload);
  },

  deleteUser: (id: string) => {
    return instance.delete(`${endpoint.USERS}/${id}`);
  },
};

export default userServices;
