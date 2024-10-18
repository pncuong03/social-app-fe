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

const CustomDropdown: React.FC<Props> = (props) => {
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

  const menu = (
    <Menu className="h-auto w-80">
      {props.items.map((item) => (
        <Menu.Item
          style={{ fontSize: "25px" }}
          className="flex items-center"
          key={item.key}
          onClick={() => handleMenuClick(item)}
        >
          {item.image ? (
            <img src={item.image} className="mr-4 h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="mr-3">{item.icon}</span>
          )}

          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <PopoverCustomize content={menu} title="Menu" visible={visible} onVisibleChange={handleVisibleChange}>
      {props.children}
    </PopoverCustomize>
  );
};

export default CustomDropdown;
