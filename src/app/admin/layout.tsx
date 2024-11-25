import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <main className="w-screen h-screen overflow-x-hidden">
    {children}</main>;
};

export default AdminLayout;
