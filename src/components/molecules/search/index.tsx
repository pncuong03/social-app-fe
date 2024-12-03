import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { List } from "antd";
import { useDebounce } from "src/utilities/hooks";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { sendRequestFriend } from "src/slices/friend/friendSlice";
import { clearSearchUser, fetchUser } from "src/slices/user/userSlice";
import { selectUser } from "src/slices/user/seletor";
import InputCustomize from "src/components/atoms/Input";
import IconCustomize from "src/components/atoms/Icons";
// import { useNavigate } from "react-router-dom";
// import { sendRequestFriend } from "src/slices/friend/friendSlice";

const SearchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const searchUserDebounce = useDebounce(searchUser, 500);

  const listUser = useAppSelector(selectUser.getUser);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  useEffect(() => {
    if (searchUserDebounce) {
      dispatch(fetchUser(searchUserDebounce));
    } else {
      dispatch(clearSearchUser());
    }
  }, [searchUserDebounce, dispatch]);

  const toggleSearch = () => {
    setIsSearchVisible(true);
  };

  const handleSendFriendRequest = (id: string) => {
    dispatch(sendRequestFriend(id));
  };

  // const handleClickSearch = (item: any) => {
  //   navigate(`/${item.fullName}`, { state: { id: item.id } });
  //   setSearchUser("");
  // };

  return (
    <div className="relative flex flex-col items-center">
      {!isSearchVisible && (
        <button className="block md:hidden" onClick={toggleSearch}>
          <IconCustomize name="search" size={35} color="gray" />
        </button>
      )}

      <div className={`${isSearchVisible ? "flex" : "hidden"} z-10 items-center md:flex`}>
        <InputCustomize
          placeholder={t("home.searchuser")}
          className="relative h-11 w-full rounded-full bg-gray-200 hover:bg-gray-300 md:w-64"
          value={searchUser}
          onChange={handleSearch}
        />
      </div>

      {listUser.length > 0 && (
        <List
          className="absolute z-0 -mt-4 -ml-14 max-h-[500px] w-[180px] overflow-y-auto rounded-xl bg-white pt-16 shadow-lg md:w-96"
          bordered
          dataSource={listUser}
          renderItem={(item: any) => (
            <List.Item className="cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2 md:ml-4 md:gap-3">
                <img src={item.imageUrl} className="h-7 w-7 rounded-full md:h-12 md:w-12" />

                <div className="">
                  <p className="text-sm font-medium md:text-lg">{item.fullName}</p>

                  <button
                    className="text-xs font-semibold text-gray-400"
                    onClick={() => handleSendFriendRequest(item.id)}
                  >
                    {item.isFriend ? "Bạn bè" : "Kết bạn"}
                  </button>
                </div>
              </div>

              <div>
                {item.hadSendFriendRequest && (
                  <button className="text-xs font-semibold text-gray-400">Đã gửi lời mời</button>
                )}

                {item.hadReceiverFriendRequest && (
                  <button className="text-xs font-semibold text-gray-400">Đã nhận lời mời</button>
                )}
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SearchUser;
