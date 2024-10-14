import React from "react";
import { useColorScheme } from "@mui/material";
import IconCustomize from "src/components/atoms/Icons";
import SidebarRow from "src/components/molecules/SidebarRow";
import routesName from "src/routes/enum.routes";

const Sidebar = () => {
  const { mode } = useColorScheme();
  const MENU_ITEMS = [
    { name: "Friends", path: routesName.FRIEND, icon: <IconCustomize name="friend" size={45} color="#00FF7F" /> },
    { name: "Group", path: routesName.PROFILE, icon: <IconCustomize name="group" size={50} color="#1E90FF" /> },
  ];

  return (
    <div
      className={`hidden h-[calc(120vh-56px)] w-[25rem] flex-col rounded-xl  ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-3 shadow-sm hover:overflow-y-auto lg:flex `}
    >
      {MENU_ITEMS.map((item, index) => (
        <SidebarRow key={index} title={item.name} path={item.path} icon={item.icon} />
      ))}
    </div>
  );
};

export default Sidebar;
