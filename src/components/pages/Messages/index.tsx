import React from "react";
import { useColorScheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import MessageList from "./MessageList";

const MessagePage: React.FC = () => {
  const { mode } = useColorScheme();

  return (
    <div className="flex flex-col">
      <div
        className={`fixed top-0 left-0 w-full pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96 ${
          mode === "light" ? "bg-white" : "bg-black-300"
        }`}
      >
        <h2 className="ml-4 text-3xl font-medium">Đoạn chat</h2>

        <MessageList />
      </div>

      <div className="pt-40 lg:pl-96 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MessagePage;
