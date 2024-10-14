import React from "react";
import { Outlet } from "react-router-dom";
import { useColorScheme } from "@mui/material";
import Header from "../Header";

const MainLayout: React.FC = () => {
  const { mode } = useColorScheme();

  return (
    <div className={`min-h-screen ${mode === "dark" ? "bg-dark" : "bg-light"}`}>
      <Header />

      <main className="w-full pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
