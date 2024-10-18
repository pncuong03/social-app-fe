import React from "react";
import { useColorScheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import IconCustomize from "src/components/atoms/Icons";
import SidebarRow from "src/components/molecules/SidebarRow";
import routesName from "src/routes/enum.routes";

const Sidebar = () => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();

  const MENU_ITEMS = [
    {
      name: "Pham Ngoc Cuong",
      path: routesName.PROFILE,
      image: "./img/avatar.png",
    },
    {
      name: t("home.friends"),
      path: routesName.FRIENDS,
      icon: <IconCustomize name="friend" size={45} color="#00FF7F" />,
    },
    {
      name: t("home.groups"),
      path: routesName.GROUPS,
      icon: <IconCustomize name="group" size={50} color="#1E90FF" />,
    },
  ];

  const name = "example";

  const MENU_GROUP = [
    {
      name: "Nhóm 1",
      path: `/groups/${name}`,
      image: "./img/avatar.png",
    },
    {
      name: "Nhóm 2",
      path: `/groups/${name}`,
      image: "./img/avatar.png",
    },
    {
      name: "Nhóm 3",
      path: `/groups/${name}`,
      image: "./img/avatar.png",
    },
    {
      name: "Nhóm 4",
      path: `/groups/${name}`,
      image: "./img/avatar.png",
    },
  ];

  return (
    <div
      className={` hidden h-[calc(120vh-56px)] w-[25rem] flex-col overflow-y-auto rounded-xl  ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-3 shadow-sm hover:overflow-y-auto lg:flex `}
    >
      {MENU_ITEMS.map((item, index) => (
        <SidebarRow key={index} image={item.image} title={item.name} path={item.path} icon={item.icon} />
      ))}

      <p className="mt-4 border-t-2 pt-4 text-3xl font-medium text-neutral-300">{t("home.shortcut")}</p>

      {MENU_GROUP.map((item, index) => (
        <SidebarRow key={index} image={item.image} title={item.name} path={item.path} />
      ))}
    </div>
  );
};

export default Sidebar;
