import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/app/appHooks";
import { leaveChat } from "src/slices/messages/messageSlice";
import IconCustomize from "src/components/atoms/Icons";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";

interface Props {
  groupId: string;
}

const Privacy = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLeaveChat = () => {
    dispatch(leaveChat(props.groupId));
    navigate("/messages");
  };

  return (
    <PopconfirmCustomize
      title={t("message.leavegroup")}
      icon={null}
      okText={t("friend.accept")}
      cancelText={t("friend.cancel")}
      onConfirm={handleLeaveChat}
    >
      <button className="flex items-center gap-2 px-2">
        <IconCustomize name="logout" size={25} />

        <p className="text-lg font-normal ">{t("message.leave")}</p>
      </button>
    </PopconfirmCustomize>
  );
};

export default Privacy;
