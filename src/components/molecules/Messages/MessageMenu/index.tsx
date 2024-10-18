import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IconCustomize from "src/components/atoms/Icons";
import MenuCard from "./MenuCard";

interface Props {
  img: string;
  fullname: string;
}

const MessageMenu = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center gap-2">
        <img src={props.img} className="h-24 w-24 rounded-full" alt="User" />

        <h2 className="text-2xl font-normal">{props.fullname}</h2>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2" onClick={() => navigate("/profile")}>
          <IconCustomize name="info" size={25} />

          <p className="text-md font-light">{t("home.personal")}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 pt-6">
          <IconCustomize name="notification" size={25} />

          <p
            className="text-md w-24 
           break-words text-center font-light"
          >
            {t("home.offinfo")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <IconCustomize name="search2" size={25} />

          <p className="text-md font-light">{t("home.search")}</p>
        </div>
      </div>

      <MenuCard />
    </div>
  );
};

export default MessageMenu;
