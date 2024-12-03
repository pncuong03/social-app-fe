import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { fetchListRequest } from "src/slices/friend/friendSlice";
import { selectListRequest } from "src/slices/friend/selector";
import FriendCard from "src/components/molecules/friend/FriendCard";

const FriendsRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const friendsRequest = useAppSelector(selectListRequest.getListRequest);

  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]);

  return (
    <div className="">
      <h2 className="p-6 text-2xl font-medium  lg:px-10 xl:px-2">{t("friend.friendrequest")}</h2>

      <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
        {friendsRequest?.map((friend: any) => {
          return (
            <FriendCard
              key={friend.id}
              id={friend.id}
              fullName={friend.fullName}
              imageUrl={friend.imageUrl}
              isFriend={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendsRequest;
