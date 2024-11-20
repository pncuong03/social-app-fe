import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MessageList from "./MessageList";
import DrawerCustomize from "src/components/atoms/Drawer";
import { useTranslation } from "react-i18next";
import CreateGroupChat from "src/components/molecules/messages/CreateGroupChat";
import SearchChat from "src/components/molecules/messages/SearchChat";
import IconCustomize from "src/components/atoms/Icons";

const MessagePage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96 ">
        <div className="mx-4 flex items-center justify-between">
          <h2 className="text-3xl font-medium">{t("message.chatsection")}</h2>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-medium hover:bg-gray-300 "
            onClick={() => setOpen(true)}
          >
            <IconCustomize name="create" size={25} color="black" />
          </button>
        </div>

        <SearchChat />

        <DrawerCustomize title={t("message.creategroup")} open={open} onClose={handleClose}>
          <CreateGroupChat onSuccess={handleClose} />
        </DrawerCustomize>

        <MessageList />
      </div>

      <div className="pt-40 lg:pl-96 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MessagePage;
