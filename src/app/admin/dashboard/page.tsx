import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
import React from "react";

const page = () => {
  return (
    <DashboardLayout title="Dashboard" type="admin">
      <Dashboard />
    </DashboardLayout>
  );
};

export default page;
