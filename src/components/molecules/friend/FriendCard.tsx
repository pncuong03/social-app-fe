import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import { acceptFriend, deleteFriend, rejectFriend } from "src/slices/friend/friendSlice";

interface Props {
  id: string;
  fullName: string;
  imageUrl: string;
  isFriend?: boolean;
}
const FriendCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(props.id));
  };

  const handleRejectRequest = () => {
    dispatch(rejectFriend(props.id));
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriend(props.id));
  };

  return (
    <div className="flex w-40 flex-col  rounded-2xl border  border-neutral-300 md:w-44">
      <button onClick={() => navigate(`/${props.fullName}`, { state: { id: props.id } })}>
        <div>
          <img src={props.imageUrl} className="h-32 w-full rounded-2xl md:h-40" />
        </div>

        <div className="px-2 pt-2">
          <p className=" text-lg font-semibold">{props.fullName}</p>
        </div>
      </button>

      {props.isFriend ? (
        <div className="p-2">
          <PopconfirmCustomize
            title={t("friend.deletefriend")}
            icon={null}
            okText={t("friend.delete")}
            cancelText={t("friend.cancel")}
            onConfirm={handleDeleteFriend}
          >
            <button className="w-full rounded-lg bg-neutral-200 p-1 text-white">{t("friend.unfriend")}</button>
          </PopconfirmCustomize>
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-2">
          <button className="w-full rounded-lg bg-blue-600 p-1 text-white" onClick={handleAcceptRequest}>
            {t("friend.accept")}
          </button>

          <PopconfirmCustomize
            title={t("friend.deleterequest")}
            icon={null}
            okText={t("friend.delete")}
            cancelText={t("friend.cancel")}
            onConfirm={handleRejectRequest}
          >
            <button className="w-full rounded-lg bg-neutral-200 p-1 text-white">{t("friend.delete")}</button>
          </PopconfirmCustomize>
        </div>
      )}
    </div>
  );
};

export default FriendCard;
