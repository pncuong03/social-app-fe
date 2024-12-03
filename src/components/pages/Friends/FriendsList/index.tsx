import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { fetchListFriend } from "src/slices/friend/friendSlice";
import { selectListFriend } from "src/slices/friend/selector";
import FriendCard from "src/components/molecules/friend/FriendCard";

const FriendsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const friendsList = useAppSelector(selectListFriend.getListFriend);

  useEffect(() => {
    dispatch(fetchListFriend());
  }, [dispatch]);

  return (
    <div className="">
      <h2 className="p-6 text-2xl font-medium lg:px-10 xl:px-2">{t("friend.listfriend")}</h2>

      <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
        {friendsList?.map((friend: any) => {
          return (
            <FriendCard
              key={friend.id}
              id={friend.id}
              fullName={friend.fullName}
              imageUrl={friend.imageUrl}
              isFriend={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
