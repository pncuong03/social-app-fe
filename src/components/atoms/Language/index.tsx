import React, { useEffect } from "react";
import { Dropdown, Button, MenuProps } from "antd";
import { useTranslation } from "react-i18next";

const CustomLanguage: React.FC = () => {
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

  useEffect(() => {
    const storedLanguage = localStorage.getItem("i18nextLng");

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const items: MenuProps["items"] = [
    {
      label: "Vietnamese",
      key: "0",
      onClick: () => changeLanguage("vi"),
    },
    {
      label: "English",
      key: "1",
      onClick: () => changeLanguage("en"),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
      <Button className="border-none shadow-none " icon={getLanguageIcon()} />
    </Dropdown>
  );
};

export default CustomLanguage;
