import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen w-screen overflow-x-hidden">{children}</main>
  );
};

export default AdminLayout;
