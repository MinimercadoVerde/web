import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import StoreProvider from "@/components/ReduxStoreProvider";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="h-screen w-screen overflow-hidden">
        <StoreProvider>{children}</StoreProvider>
      </main>
      <Navbar />
    </div>
  );
};

export default AdminLayout;
