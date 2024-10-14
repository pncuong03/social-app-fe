import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material";
import routesName from "src/routes/enum.routes";
import MenuCustomzie from "src/components/atoms/Menu";
import IconCustomize from "src/components/atoms/Icons";



const FriendsPage: React.FC = () => {
  const { mode } = useColorScheme();
  const {t} = useTranslation();

  const items = [
    {
      key: routesName.FRIEND,
      label: t('friend.home'),
    },
    {
      key: routesName.FRIENDLIST,
      label: t('friend.allfriends'),
      icon: <IconCustomize name="friend" size={30} color="#00FF7F" />,
    },
  ];
  
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
