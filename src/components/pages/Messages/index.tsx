import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IconCustomize from "src/components/atoms/Icons";
import DrawerCustomize from "src/components/atoms/Drawer";
import CreateGroupChat from "src/components/molecules/messages/CreateGroupChat";
import SearchChat from "src/components/molecules/messages/SearchChat";
import MessageList from "./MessageList";
import React, { useState } from "react";


  const MessagePage = () => {
    const handleClose = () => {
      setOpenn(false);
    };

    const { t } = useTranslation();
    const [open, setOpenn] = useState(false);

    return (
      <div className="flex flex-col">
        <div className="fixed top-0 left-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96 ">
          <div className="mx-4 flex items-center justify-between">
            <h2 className="text-3xl font-medium">{t("message.chatsection")}</h2>
            <SearchChat />

            <DrawerCustomize title={t("message.creategroup")} open={open} onClose={handleClose}>
              <CreateGroupChat onSuccess={handleClose} />
            </DrawerCustomize>

            <MessageList />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-medium hover:bg-gray-300 "
              onClick={() => setOpenn(true)}
            >
              <IconCustomize name="create" size={25} color="black" />
            </button>
          </div>
        </div>

        <div className="pt-40 lg:pl-96 lg:pt-2">
          <Outlet />
        </div>
      </div>
    );
  };
  export default MessagePage;
