import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRejectBorrowing } from "@/Types/Borrowings";

const borrowingServices = {
  getBorrowings: () => {
    return instance.get(endpoint.BORROWINGS);
  },

  getBorrowingById: (id: string) => {
    return instance.get(`${endpoint.BORROWINGS}/${id}`);
  },

  createBorrowing: (payload: FormData) => {
    return instance.post(endpoint.BORROWINGS, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getMyBorrowings: () => {
    return instance.get(`${endpoint.BORROWINGS}/my`);
  },

  approveBorrowing: (id: string) => {
    return instance.patch(`${endpoint.BORROWINGS}/${id}/approve`);
  },

  rejectBorrowing: (id: string, payload: IRejectBorrowing) => {
    return instance.patch(`${endpoint.BORROWINGS}/${id}/reject`, payload);
  },

  returnBorrowing: (id: string) => {
    return instance.patch(`${endpoint.BORROWINGS}/${id}/return`);
  },

  borrowBorrowing: (id: string) => {
    return instance.patch(`${endpoint.BORROWINGS}/${id}/borrow`);
  },
};

export default borrowingServices;
