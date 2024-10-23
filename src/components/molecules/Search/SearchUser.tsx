import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { List } from "antd";
import IconCustomize from "src/components/atoms/Icons";
import InputCustomize from "src/components/atoms/Input";
import { useDebounce } from "src/utilities/hooks";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { selectUser } from "src/slices/user/seletor";
import { fetchUser } from "src/slices/user/userSlice";

const SearchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState<[]>([]);
  const searchUserDebounce = useDebounce(searchUser, 500);

  const listUser = useAppSelector(selectUser.getUser);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  useEffect(() => {
    if (searchUserDebounce) {
      dispatch(fetchUser(searchUserDebounce));
      setSearchResults(listUser);
    } else {
      setSearchResults([]);
    }
  }, [searchUserDebounce, dispatch]);

  const toggleSearch = () => {
    setIsSearchVisible(true);
  };

  return (
    <div className="relative flex flex-col items-center">
      {!isSearchVisible && (
        <button className="block md:hidden" onClick={toggleSearch}>
          <IconCustomize name="search" size={35} color="gray" />
        </button>
      )}

      <div className={`${isSearchVisible ? "flex" : "hidden"} z-10 items-center md:flex`}>
        <InputCustomize
          placeholder="Tìm kiếm người dùng"
          className="relative h-11 w-full rounded-full bg-gray-200 hover:bg-gray-200 md:w-64"
          value={searchUser}
          ocChange={handleSearch}
        />
      </div>

      {searchResults && (
        <List
          className="absolute z-0 -mt-4 -ml-14 w-[180px] rounded-xl bg-white pt-16 shadow-lg md:w-96"
          bordered
          dataSource={searchResults}
          renderItem={(item: any) => (
            <List.Item className="cursor-pointer hover:bg-gray-100">
              <div className="flex items-center gap-2 md:ml-4 md:gap-3">
                <img src={item.imageUrl} className="h-7 w-7 rounded-full md:h-12 md:w-12" />

                <div className="">
                  <p className="text-sm md:text-lg">{item.fullName}</p>

                  <button className="text-xs font-medium text-gray-400">{item.isFriend ? "Bạn bè" : "Kết bạn"}</button>
                </div>
              </div>

              <div>
                {item.hadSendFriendRequest && (
                  <button className="text-xs font-medium text-gray-400">Đã gửi lời mời</button>
                )}

                {item.hadReceiverFriendRequest && (
                  <button className="text-xs font-medium text-gray-400">Đã nhận lời mời</button>
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
