import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-light">
      <Header />

      <main className="w-full pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
