import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import PopoverCustomize from "../Popover";

interface DropdownItem {
  key: string;
  label: string;
  onClick?: () => void;
  path?: string;
  icon?: React.ReactNode;
  image?: string;
}

interface Props {
  items: DropdownItem[];
  loading?: boolean;
  buttonLabel?: string;
  children?: React.ReactNode;
}

const CustomDropdown = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (item: DropdownItem) => {
    if (item.path) {
      navigate(item.path);
    }

    if (item.onClick) {
      item.onClick();
    }

    setVisible(false);
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const menuItems = props.items.map((item) => ({
    key: item.key,
    label: (
      <div className="flex items-center" style={{ fontSize: "25px" }} onClick={() => handleMenuClick(item)}>
        {item.image ? (
          <img src={item.image} className="mr-4 h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="mr-3">{item.icon}</span>
        )}

        {item.label}
      </div>
    ),
  }));

  const menu = <Menu className="h-auto w-80" items={menuItems} />;

  return (
    <PopoverCustomize content={menu} title="Menu" open={visible} onOpenChange={handleVisibleChange}>
      {props.children}
    </PopoverCustomize>
  );
};

export default CustomDropdown;
