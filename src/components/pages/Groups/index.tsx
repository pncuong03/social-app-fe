import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routesName from "src/routes/enum.routes";
import MenuCustomzie from "src/components/atoms/Menu";
import IconCustomize from "src/components/atoms/Icons";
import { Input } from "antd";
import GroupsList from "src/components/molecules/Groups/GroupsList";

const GroupsPage = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: routesName.GROUPS,
      label: t("groups.myfeed"),
      icon: <IconCustomize name="feed" size={40} />,
    },
    {
      key: routesName.GROUPSJOINS,
      label: t("groups.mygroup"),
      icon: <IconCustomize name="group" size={40} />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96">
        <h2 className="ml-4 text-3xl font-medium">{t("home.groups")}</h2>

        <Input placeholder="Search" className="mx-4 my-4 w-11/12" />

        <MenuCustomzie items={items} defaultSelectedKey={routesName.GROUPS} />

        <GroupsList />
      </div>

      <div className="pt-40 lg:pt-0 lg:pl-96 xl:mx-16">
        <Outlet />
      </div>
    </div>
  );
};

export default GroupsPage;
