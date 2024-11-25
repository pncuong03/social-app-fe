import React, { useState } from "react";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import routesName from "src/routes/enum.routes";

type MenuItem = GetProp<MenuProps, "items">[number];

interface Props {
  items: MenuItem[];
  defaultSelectedKey: string;
}

const MenuCustomzie = (props: Props) => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>(props.defaultSelectedKey);

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);

    if (e.key.startsWith(routesName.HOME)) {
      navigate(e.key);
    }
  };

  const menuItems = props.items.map((item: any) => ({
    key: item.key,
    label: (
      <div className="flex h-10 items-center text-2xl font-normal">
        {item.icon && (
          <span className={`mr-2 ${selectedKey === item.key ? "text-blue-500" : "text-neutral-500"}`}>{item.icon}</span>
        )}

        <span>{item.label}</span>
      </div>
    ),
  }));

  return (
    <Menu
      className="flex w-full  flex-col gap-1 bg-white shadow-md"
      items={menuItems}
      onClick={handleMenuClick}
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
    />
  );
};

export default MenuCustomzie;
