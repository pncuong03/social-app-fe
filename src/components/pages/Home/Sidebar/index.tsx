import React from "react";
import { useTranslation } from "react-i18next";
import IconCustomize from "src/components/atoms/Icons";
import SidebarRow from "src/components/molecules/sidebarrow";
import routesName from "src/routes/enum.routes";
import { useAppSelector } from "src/app/appHooks";
import { selectUserInfo } from "src/slices/login/selector";

const Sidebar = () => {
  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);

  const MENU_ITEMS = [
    {
      name: userInfo?.fullName,
      path: routesName.PROFILE,
      image: userInfo?.imageUrl,
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
    <div className="hidden h-[calc(120vh-56px)] w-[25rem] flex-col overflow-y-auto rounded-xl bg-white p-3 shadow-sm hover:overflow-y-auto lg:flex">
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
