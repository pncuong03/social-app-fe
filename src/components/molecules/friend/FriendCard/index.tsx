import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/app/store";
import { acceptFriend, deleteFriend, rejectFriend } from "src/slices/friend/friendSlice";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";

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
    <div className="flex w-48 transform flex-col rounded-3xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl">
      <button
        onClick={() => navigate(`/${props.fullName}`, { state: { id: props.id } })}
        className="focus:outline-none"
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={props.imageUrl}
            className="h-44 w-full object-cover transition-all duration-300 hover:opacity-90"
            alt={props.fullName}
          />
        </div>

        <div className="px-4 pt-4 text-center">
          <p className="text-lg font-bold text-gray-800">{props.fullName}</p>
        </div>
      </button>

      <div className="p-4">
        {props.isFriend ? (
          <PopconfirmCustomize
            title={t("friend.deletefriend")}
            icon={null}
            okText={t("friend.yes")}
            cancelText={t("friend.no")}
            onConfirm={handleDeleteFriend}
          >
            <button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-red-500 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:from-pink-600 hover:to-red-600 focus:outline-none">
              {t("friend.unfriend")}
            </button>
          </PopconfirmCustomize>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:from-blue-600 hover:to-purple-700 focus:outline-none"
              onClick={handleAcceptRequest}
            >
              {t("friend.accept")}
            </button>

            <PopconfirmCustomize
              title={t("friend.deleterequest")}
              icon={null}
              okText={t("friend.yes")}
              cancelText={t("friend.no")}
              onConfirm={handleRejectRequest}
            >
              <button className="w-full rounded-full bg-gray-300 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-400 focus:outline-none">
                {t("friend.delete")}
              </button>
            </PopconfirmCustomize>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
