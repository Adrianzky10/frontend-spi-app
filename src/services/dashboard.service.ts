import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const dashboardServices = {
  getDashboard: () => {
    return instance.get(endpoint.DASHBOARD);
  },
};

export default dashboardServices;
