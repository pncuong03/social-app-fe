import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import CreateBox from "./CreateBox/CreateBox";
import IconCustomize from "src/components/atoms/Icons";
import { getName } from "src/const";
import { useAppSelector } from "src/app/appHooks";
import { selectUserInfo } from "src/slices/login/selector";

const InputBox = () => {
  const { t } = useTranslation();
  const [isVisiable, setIsVisiable] = useState(false);

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);

  return (
    <div className="flex h-max w-full flex-col rounded-lg bg-white p-4 shadow-md">
      <div className={`mb-2 flex items-center space-x-2 border-b pb-3 ${"border-gray-200"}`}>
        <div className="h-12 w-12">
          <img src={userInfo?.imageUrl} className="h-full w-full rounded-full" alt="dp" />
        </div>

        <button
          className="h-12 flex-grow rounded-full bg-gray-100 pl-5 text-left font-normal text-gray-400"
          onClick={() => setIsVisiable(true)}
        >
          <p>{getName(userInfo?.fullName) + t("home.whatmind")}</p>
        </button>
      </div>

      <div className="mb-1 flex justify-between text-sm">
        <Button className="gap-2 rounded-md border-none shadow-none" onClick={() => setIsVisiable(true)}>
          <IconCustomize name="youtube" size={25} color="#DC143C" />

          <p className="font-semibold text-gray-400">Youtube</p>
        </Button>

        <Button className="gap-2 rounded-md border-none shadow-none" onClick={() => setIsVisiable(true)}>
          <IconCustomize name="image" size={25} color="#90EE90" />

          <p className="font-semibold text-gray-400">{t("home.images")}</p>
        </Button>

        <Button className="hidden gap-2 rounded-md border-none shadow-none md:flex" onClick={() => setIsVisiable(true)}>
          <IconCustomize name="happy" size={25} color="#FFDEAD" />

          <p className="font-semibold text-gray-400">{t("home.feelings")}</p>
        </Button>
      </div>

      <CreateBox
        open={isVisiable}
        onCancel={() => setIsVisiable(false)}
        fullName={userInfo.fullName}
        imageUrl={userInfo.imageUrl}
      />
    </div>
  );
};

export default InputBox;
