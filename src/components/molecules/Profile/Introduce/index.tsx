import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material";
import IconCustomize from "src/components/atoms/Icons";

const Introduce = () => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();

  return (
    <div className="col-span-1 mb-4 grid h-fit gap-4 ">
      <div
        className={`flex flex-col gap-4 rounded-lg  p-3 shadow-md ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <p className="text-xl font-medium">{t("profile.intro")}</p>

        <div className="flex justify-center">
          <p className="text-lg font-light">Dang cap</p>
        </div>

        <div className="text-md flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <IconCustomize name="work" size={25} />

            <p className="text-lg font-light">Software Engineer</p>
          </div>

          <div className="flex items-center space-x-2">
            <IconCustomize name="male" size={25} />

            <p className="text-lg font-light">Nam</p>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 rounded-lg p-3 shadow-md  ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">{t("home.images")}</p>
        </div>

        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/119" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/118" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/117" />
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 rounded-lg p-3 shadow-md ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-medium">{t("home.friends")}</p>

            <p className="text-sm text-gray-400">100 {t("home.friends")}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/119" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/118" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/117" />
        </div>
      </div>
    </div>
  );
};

export default Introduce;
