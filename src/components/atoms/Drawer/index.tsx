import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";

const DrawerLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  const getLanguageIcon = () => {
    switch (i18n.language) {
      case "en":
        return <img src="./svg/america.svg" />;
      case "vi":
        return <img src="./svg/vietnamese.svg" />;
      default:
        return null;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="vi" onClick={() => changeLanguage("vi")}>
        Vietnamese
      </Menu.Item>

      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter" arrow>
      <Button className="border-none shadow-none " icon={getLanguageIcon()} />
    </Dropdown>
  );
};

export default DrawerLanguage;
