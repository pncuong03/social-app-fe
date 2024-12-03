import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { useDebounce } from "src/utilities/hooks";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";

interface Props {
  onSelect?: (value: string) => void;
  name?: string;
  isDefaultGetAll?: boolean;
  value?: string;
}
const SelectFriend = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const firstRender = useRef(true);
  const searchClass = useDebounce(search);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  const getListFriend = useAppSelector(selectListFriend.getListFriend);

  const getOptions: Array<DefaultOptionType> = getListFriend?.map((item: any) => {
    return {
      label: item.fullName,
      value: item.id,
    };
  });

  useEffect(() => {
    if (!firstRender.current || props.isDefaultGetAll) {
      if (searchClass || props.isDefaultGetAll) {
        dispatch(fetchListFriend());
      }
    } else {
      firstRender.current = false;
    }
  }, [searchClass, props.isDefaultGetAll]);

  useEffect(() => {
    if (getListFriend) {
      setOptions(getOptions);
    }
  }, [getListFriend]);

  return (
    <Select
      mode="multiple"
      onChange={(value) => {
        props.onSelect?.(value);
      }}
      value={props.value}
      placeholder={t("message.selectfriend")}
      size="large"
      showSearch
      filterOption={false}
      onSearch={(value) => {
        setSearch(value);
      }}
      options={options}
    />
  );
};

export default SelectFriend;
