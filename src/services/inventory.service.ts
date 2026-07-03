import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const inventoryServices = {
  getInventories: () => {
    return instance.get(endpoint.INVENTORIES);
  },

  getInventoryById: (id: string) => {
    return instance.get(`${endpoint.INVENTORIES}/${id}`);
  },

  createInventory: (payload: FormData) => {
    return instance.post(endpoint.INVENTORIES, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateInventory: (id: string, payload: FormData) => {
    return instance.put(`${endpoint.INVENTORIES}/${id}`, payload);
  },

  deleteInventory: (id: string) => {
    return instance.delete(`${endpoint.INVENTORIES}/${id}`);
  },
};

export default inventoryServices;
