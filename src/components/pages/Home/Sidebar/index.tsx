import { useColorScheme } from "@mui/material";
import React from "react";
import { GamingIcon } from "src/components/atoms/Icons/GamingIcon";
import { GroupIcon } from "src/components/atoms/Icons/GroupIcon";
import { UsersIcon } from "src/components/atoms/Icons/UsersIcon";
import SidebarRow from "src/components/molecules/SidebarRow";
import routesName from "src/routes/enum.routes";

const Sidebar = () => {
  const { mode } = useColorScheme();

  const MENU_ITEMS = [
    { name: "Friends", path: routesName.PROFILE, icon: UsersIcon },
    { name: "Group", path: routesName.GROUP, icon: GroupIcon },
    { name: "Gmaing", path: routesName.GAMING, icon: GamingIcon },
  ];

  return (
    <div
      className={`hidden h-[calc(120vh-56px)] w-[25rem] flex-col rounded-xl  ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-3 shadow-sm hover:overflow-y-auto lg:flex `}
    >
      {MENU_ITEMS.map((item, index) => (
        <SidebarRow key={index} title={item.name} path={item.path} icon={<item.icon />} />
      ))}
    </div>
  );
};

export default Sidebar;
