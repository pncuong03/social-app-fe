import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "src/components/layouts/Header";
import { useSocket } from "src/utilities/hooks/useSocket";

const MainLayout: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useSocket();

  return (
    <div className="min-h-screen bg-light ">
      <Header />

      <main className="mt-[70px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
