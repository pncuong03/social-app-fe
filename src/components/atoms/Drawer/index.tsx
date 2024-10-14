import React, { ReactNode } from "react";
import { Menu, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";

interface CustomDrawerProps {
  menuItems: Array<{ text: string; onClick: () => void }>;
  children?: ReactNode;
}

const DrawerLanguage: React.FC<CustomDrawerProps> = ({ menuItems, children }) => {
  const { i18n } = useTranslation();
  const getLanguageIcon = () => {
    switch (i18n.language) {
      case "en":
        return <img src="./svg/america.svg" alt="English Logo" />;
      case "vi":
        return <img src="./svg/vietnamese.svg" alt="Vietnamese Logo" />;
      default:
        return null;
    }
  };

  const menu = (
    <Menu>
      {menuItems.map((item, index) => (
        <Menu.Item key={index} onClick={item.onClick}>
          {item.text}
        </Menu.Item>
      ))}

      {children && <Menu.Divider />}

      {children && <Menu.Item>{children}</Menu.Item>}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter" arrow>
      <Button className="border-none shadow-none " icon={getLanguageIcon()} />
    </Dropdown>
  );
};

export default DrawerLanguage;
