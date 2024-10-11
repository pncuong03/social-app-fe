import React from "react";
import { Outlet } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import routesName from "src/routes/enum.routes";
import { useColorScheme } from "@mui/material";
import MenuCustomzie from "src/components/atoms/Menu";

const items = [
  {
    key: routesName.FRIEND,
    label: "Trang chủ",
  },
  {
    key: routesName.FRIENDLIST,
    label: "Tất cả bạn bè",
    icon: <FaUserFriends size={30} />,
  },
];

const FriendsPage: React.FC = () => {
  const { mode } = useColorScheme();

  return (
    <div className="flex flex-col">
      <div
        className={`fixed top-0 left-0 w-full pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96 ${
          mode === "light" ? "bg-white" : "bg-black-300"
        }`}
      >
        <MenuCustomzie items={items} defaultSelectedKey={routesName.FRIEND} />
      </div>

      <div className="pt-32 lg:pt-0 lg:pl-96 xl:mx-16">
        <Outlet />
      </div>
    </div>
  );
};

export default FriendsPage;
