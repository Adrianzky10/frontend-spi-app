import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateCategory, IUpdateCategory } from "@/Types/Category";

const categoryServices = {
  getCategories: () => {
    return instance.get(endpoint.CATEGORIES);
  },

  getCategoryById: (id: string) => {
    return instance.get(`${endpoint.CATEGORIES}/${id}`);
  },

  createCategory: (payload: ICreateCategory) => {
    return instance.post(endpoint.CATEGORIES, payload);
  },

  updateCategory: (id: string, payload: IUpdateCategory) => {
    return instance.put(`${endpoint.CATEGORIES}/${id}`, payload);
  },

  deleteCategory: (id: string) => {
    return instance.delete(`${endpoint.CATEGORIES}/${id}`);
  },
};

export default categoryServices;
