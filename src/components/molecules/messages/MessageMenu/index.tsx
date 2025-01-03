  import React from "react";
  import { useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import IconCustomize from "src/components/atoms/Icons";
  import MemberChat from "./MemberChat";
  import Privacy from "./Privacy";
  import MenuCard from "./MenuCard";

  interface Props {
    img: string;
    fullname: string;
    groupId: string;
  }

  const MessageMenu = (props: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const items = [
      {
        label: "Thông tin về đoạn chat",
        children: <p>Helo</p>,
      },
      {
        label: "Tùy chỉnh đoạn chat",
        children: <p>Helo</p>,
      },
      {
        label: t("message.meminchat"),
        children: <MemberChat groupId={props.groupId} nameGroup={props.fullname} />,
      },
      {
        label: t("message.privacy"),
        children: <Privacy groupId={props.groupId} />,
      },
    ];

    return (
      <div className="mt-24">
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

        <MenuCard items={items} />
      </div>
    );
  };

  export default MessageMenu;
