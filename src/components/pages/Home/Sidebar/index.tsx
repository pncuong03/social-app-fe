import React from "react";
import { useTranslation } from "react-i18next";
import IconCustomize from "src/components/atoms/Icons";
import SidebarRow from "src/components/molecules/sidebarrow";
import routesName from "src/routes/enum.routes";
import { useAppSelector } from "src/app/appHooks";
import { selectUserInfo } from "src/slices/login/selector";
import GroupsListCol from "src/components/molecules/groups/GroupsList";

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

  return (
    <div className="sticky top-0 hidden h-[calc(100vh-96px)]  w-[23rem] flex-col self-start rounded-2xl bg-white p-3 shadow-lg lg:block">
      {MENU_ITEMS.map((item, index) => (
        <SidebarRow key={index} image={item.image} title={item.name} path={item.path} icon={item.icon} />
      ))}

      <p className="mt-4 border-t-2 pt-4 text-3xl font-medium text-neutral-300">{t("home.shortcut")}</p>

      <GroupsListCol />
    </div>
  );
};

export default Sidebar;
