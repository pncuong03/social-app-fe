import React from "react";
import { useTranslation } from "react-i18next";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";

interface Props {
  fullName: string;
  imageUrl: string;
  isFriend?: boolean;
}
const FriendCard = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-40 flex-col  rounded-2xl border  border-neutral-300 md:w-44">
      <div>
        <img src={props.imageUrl} className="h-32 w-full rounded-2xl md:h-[135px]" />
      </div>

      <div className="pl-3 pt-2">
        <p className=" text-lg font-semibold">{props.fullName}</p>
      </div>

      {props.isFriend ? (
        <div className="p-2">
          <PopconfirmCustomize
            title={t("friend.deletefriend")}
            icon={null}
            okText={t("friend.delete")}
            cancelText={t("friend.cancel")}
          >
            <button className="w-full rounded-lg bg-neutral-200 p-1 text-white">{t("friend.unfriend")}</button>
          </PopconfirmCustomize>
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-2">
          <button className="w-full rounded-lg bg-blue-600 p-1 text-white">{t("friend.accept")}</button>

          <button className="w-full rounded-lg bg-neutral-200 p-1 text-white">{t("friend.delete")}</button>
        </div>
      )}
    </div>
  );
};

export default FriendCard;
