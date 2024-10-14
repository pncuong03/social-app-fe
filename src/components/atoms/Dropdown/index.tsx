import React, { useState } from "react";
import { Dropdown, Menu, Spin } from "antd";
import { useNavigate } from "react-router-dom";

interface DropdownItem {
  key: string;
  label: string;
  onClick?: () => void;
  path?: string;
  icon?: React.ReactNode;
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
    setVisible(false);

    if (item.path) {
      navigate(item.path);
    }

    if (item.onClick) {
      item.onClick();
    }
  };

  const menu = (
    <Menu className="h-auto w-80">
      {props.items.map((item) => (
        <Menu.Item
          style={{ fontSize: "30px" }}
          className="flex items-center text-lg"
          key={item.key}
          onClick={() => handleMenuClick(item)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}

          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} visible={visible} onVisibleChange={(flag) => setVisible(flag)} trigger={["click"]}>
        {props.children}
      </Dropdown>

      {props.loading && (
        <div className="loading-overlay">
          <Spin />
        </div>
      )}
    </>
  );
};

export default CustomDropdown;
