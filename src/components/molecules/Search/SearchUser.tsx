import React, { useState, useEffect } from "react";
import { List } from "antd"; // Import List from Ant Design
import IconCustomize from "src/components/atoms/Icons";
import InputCustomize from "src/components/atoms/Input";
import { useDebounce } from "src/utilities/hooks";

const SearchUser = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]); // Mocked search results

  const searchUserDebounce = useDebounce(searchUser, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  useEffect(() => {
    if (searchUserDebounce) {
      const results = mockSearchUsers(searchUserDebounce);

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchUserDebounce]);

  const toggleSearch = () => {
    setIsSearchVisible(true);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
    setSearchUser("");
    setSearchResults([]);
  };

  const mockSearchUsers = (query: string) => {
    const mockData = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

    return mockData.filter((user) => user.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div className="relative flex flex-col items-center">
      {!isSearchVisible && (
        <button className="block md:hidden" onClick={toggleSearch}>
          <IconCustomize name="search" size={35} color="gray" />
        </button>
      )}

      <div className={`${isSearchVisible ? "flex" : "hidden"} items-center space-x-2 md:flex`}>
        <InputCustomize
          placeholder="Tìm kiếm người dùng"
          className="relative h-11 w-full rounded-full bg-gray-200 hover:bg-gray-200 md:w-56"
          value={searchUser}
          ocChange={handleSearch}
        />

        {isSearchVisible && (
          <button className="md:hidden" onClick={closeSearch}>
            <IconCustomize name="close" size={35} color="gray" />
          </button>
        )}
      </div>

      {searchResults.length > 0 && (
        <List
          className="absolute mt-12 ml-16 w-full rounded-xl rounded-t-md bg-white shadow-lg md:w-72"
          bordered
          dataSource={searchResults}
          renderItem={(item) => <List.Item className="cursor-pointer hover:bg-gray-100">{item}</List.Item>}
        />
      )}
    </div>
  );
};

export default SearchUser;
