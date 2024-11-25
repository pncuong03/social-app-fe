import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routesName from "src/routes/enum.routes";
import MenuCustomzie from "src/components/atoms/Menu";
import IconCustomize from "src/components/atoms/Icons";

const FriendsPage = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: routesName.FRIENDS,
      label: t("friend.home"),
    },
    {
      key: routesName.FRIENDLIST,
      label: t("friend.allfriends"),
      icon: <IconCustomize name="friend" size={30} color="#00FF7F" />,
    },
  ];

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96">
        <h2 className="ml-4 text-3xl font-medium">{t("home.friends")}</h2>

        <MenuCustomzie items={items} defaultSelectedKey={routesName.FRIENDS} />
      </div>

      <div className="overflow-y-auto pt-40 lg:pt-0 lg:pl-96 xl:mx-16">
        <Outlet />
      </div>
    </div>
  );
};

export default FriendsPage;
