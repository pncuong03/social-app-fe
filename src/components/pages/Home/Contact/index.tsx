import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";

const Contact = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListFriend());
  }, []);

  const getListFriend = useAppSelector(selectListFriend.getListFriend);

  const handleNavigate = (fullName: string, userId: number) => {
    navigate(`/${fullName}`, { state: { id: userId } });
  };

  return (
    <div className="sticky top-0 hidden h-[calc(100vh-96px)] w-[20rem] flex-col self-start rounded-2xl bg-white p-3 shadow-lg hover:overflow-y-auto xl:flex">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-2xl font-normal">{t("home.contact")}</p>
      </div>

      <div className="flex flex-col">
        {getListFriend && getListFriend.length > 0 ? (
          getListFriend.map((friend: any) => (
            <button
              key={friend.id}
              className="flex h-16 cursor-pointer items-center gap-3 space-x-2 rounded-md p-2 hover:bg-gray-100"
              onClick={() => handleNavigate(friend.fullName, friend.id)}
            >
              <img className="h-12 w-12 rounded-full" src={friend.imageUrl} alt="user" />

              <p className="text-lg font-normal">{friend.fullName}</p>
            </button>
          ))
        ) : (
          <Empty description={t("friend.nofriend")} />
        )}
      </div>
    </div>
  );
};

export default Contact;
