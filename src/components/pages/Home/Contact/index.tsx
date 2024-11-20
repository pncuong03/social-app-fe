import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";

const Contact = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListFriend());
  }, []);

  const getListFriend = useAppSelector(selectListFriend.getListFriend);

  return (
    <div className="hidden h-[calc(120vh-56px)] w-[25rem] flex-col rounded-xl bg-white p-3 shadow-sm hover:overflow-y-auto xl:flex">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-2xl font-normal">{t("home.contact")}</p>
      </div>

      <div className="flex flex-col">
        {getListFriend && getListFriend.length > 0 ? (
          getListFriend.map((friend: any) => (
            <Link
              to={`/${friend.id}`}
              key={friend.id}
              className="flex h-16 cursor-pointer items-center gap-3 space-x-2 rounded-md p-2 hover:bg-gray-100"
            >
              <img className="h-12 w-12 rounded-full" src={friend.imageUrl} alt="user" />

              <p className="text-lg font-normal">{friend.fullName}</p>
            </Link>
          ))
        ) : (
          <Empty description={t("friend.nofriend")} />
        )}
      </div>
    </div>
  );
};

export default Contact;
