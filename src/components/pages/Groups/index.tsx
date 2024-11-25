import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routesName from "src/routes/enum.routes";
import MenuCustomzie from "src/components/atoms/Menu";
import IconCustomize from "src/components/atoms/Icons";
import { Button } from "antd";
import DrawerCustomize from "src/components/atoms/Drawer";
import CreateGroup from "src/components/molecules/groups/CreateGroup";
import GroupsListCol from "src/components/molecules/groups/GroupsList";
import SearchGroup from "src/components/molecules/groups/SearchGroup";

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

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0  w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96">
        <h2 className="ml-4 text-3xl font-medium">{t("home.groups")}</h2>

        <SearchGroup />

        <Button
          className="mx-4 flex h-10 w-11/12 items-center justify-center rounded-2xl bg-blue-200 text-lg font-medium "
          onClick={() => setOpen(true)}
        >
          {t("groups.creategroup")}
        </Button>

        <DrawerCustomize title={t("groups.creategroup")} open={open} onClose={handleClose}>
          <CreateGroup onSuccess={handleClose} />
        </DrawerCustomize>

        <MenuCustomzie items={items} defaultSelectedKey={routesName.GROUPS} />

        <div className="hidden border-t-2 p-4 lg:block">
          <h2 className="mb-2 text-xl font-medium">Nhóm bạn tham gia</h2>

          <GroupsListCol />
        </div>
      </div>

      <div className="pt-64 lg:pt-2 lg:pl-96">
        <Outlet />
      </div>
    </div>
  );
};

export default GroupsPage;
