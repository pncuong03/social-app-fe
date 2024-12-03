import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { List } from "antd";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { useDebounce } from "src/utilities/hooks";
import { fetchSearchGroup } from "src/slices/groups/groupSlice";
import { selectSearchGroup } from "src/slices/groups/selector";
import InputCustomize from "src/components/atoms/Input";

const SearchGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchGroup, setSearchGroup] = useState("");
  const [searchResults, setSearchResults] = useState<[]>([]);
  const searchGroupDebounce = useDebounce(searchGroup, 500);

  const listSearchGroup = useAppSelector(selectSearchGroup.getSearchGroup);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGroup(e.target.value);
  };

  useEffect(() => {
    if (searchGroupDebounce) {
      dispatch(fetchSearchGroup(searchGroupDebounce));
      setSearchResults(listSearchGroup);
    } else {
      setSearchResults([]);
    }
  }, [searchGroupDebounce, dispatch]);

  const handleClick = (item: any) => {
    navigate(`/groups/${item.name}`, { state: { groupId: item.id } });
    setSearchGroup("");
    setSearchResults([]);
  };

  return (
    <div className="m-4 flex flex-col items-center">
      <InputCustomize
        placeholder={t("groups.searchgroup")}
        className="h-10 w-full rounded-2xl bg-gray-200 hover:bg-gray-300 "
        value={searchGroup}
        onChange={handleSearch}
      />

      {searchResults.length > 0 && (
        <List
          className="absolute z-10 mt-10 max-h-96 w-[180px] overflow-y-auto overflow-x-hidden rounded-xl bg-gray-200  shadow-lg md:w-[352px]"
          bordered
          dataSource={searchResults}
          renderItem={(item: any) => (
            <List.Item className="-mx-4 cursor-pointer rounded-xl hover:bg-gray-300" onClick={() => handleClick(item)}>
              <div className="flex items-center gap-2 md:ml-4 md:gap-3">
                <img src={item.img} className="h-6 w-6 rounded-full md:h-12 md:w-12" />

                <div className="">
                  <p className="text-sm md:text-lg">{item.name}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SearchGroup;
