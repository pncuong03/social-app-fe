import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routesName from "src/routes/enum.routes";
import MenuCustomzie from "src/components/atoms/Menu";
import IconCustomize from "src/components/atoms/Icons";
import { Button } from "antd";
import DrawerCustomize from "src/components/atoms/Drawer";
import CreateGroup from "src/components/molecules/groups/CreateGroup";
import SearchChat from "src/components/molecules/messages/SearchChat";
import GroupsListCol from "src/components/molecules/groups/GroupsList";

const GroupsPage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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

        <SearchChat />

        <Button
          className="mx-4 flex h-10 w-11/12 items-center justify-center rounded-md bg-blue-200 text-lg font-medium "
          onClick={() => setOpen(true)}
        >
          {t("groups.creategroup")}
        </Button>

        <DrawerCustomize title={t("groups.creategroup")} open={open} onClose={handleClose}>
          <CreateGroup onSuccess={handleClose} />
        </DrawerCustomize>

        <MenuCustomzie items={items} defaultSelectedKey={routesName.GROUPS} />

        <GroupsListCol />
      </div>

      <div className="xl:4 pt-40 lg:pt-0 lg:pl-96">
        <Outlet />
      </div>
    </div>
  );
};

export default GroupsPage;
