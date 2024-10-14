import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { useColorScheme } from "@mui/material";
import CreateBox from "./CreateBox/CreateBox";
import IconCustomize from "src/components/atoms/Icons";

const InputBox = () => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();
  const [isVisiable, setIsVisiable] = useState(false);

  const user = {
    fullName: "Cường",
    imageUrl: "./img/avatar.png",
  };

  return (
    <div
      className={`flex h-max w-full flex-col rounded-lg ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-4 shadow-md`}
    >
      <div className={`mb-2 flex items-center space-x-2 border-b pb-3 ${"border-gray-200"}`}>
        <div className="h-12 w-12">
          <img src="./img/avatar.png" className="h-full w-full rounded-full" alt="dp" />
        </div>

        <button
          className={`h-12 flex-grow rounded-full ${
            mode === "light" ? "bg-gray-100" : "bg-neutral-700"
          } pl-5 text-left font-normal text-gray-400 `}
          onClick={() => setIsVisiable(true)}
        >
          Cường, {t("home.whatmind")}
        </button>
      </div>

      <div className="mb-1 flex justify-between text-sm">
        <Button className="gap-2 rounded-md border-none shadow-none">
          <IconCustomize name="youtube" size={25} color="#DC143C" />

          <p className="font-semibold">Youtube</p>
        </Button>

        <Button className="gap-2 rounded-md border-none shadow-none">
          <IconCustomize name="image" size={25} color="#90EE90" />

          <p className="font-semibold">{t('home.images')}</p>
        </Button>

        <Button className="hidden gap-2 rounded-md border-none shadow-none md:flex">
          <IconCustomize name="happy" size={25} color="#FFDEAD" />

          <p className="font-semibold">{t('home.feelings')}</p>
        </Button>
      </div>

      <CreateBox
        open={isVisiable}
        onCancel={() => setIsVisiable(false)}
        fullName={user.fullName}
        imageUrl={user.imageUrl}
      />
    </div>
  );
};

export default InputBox;
