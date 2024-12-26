import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/appHooks";
import { selectInfoGroup } from "src/slices/groups/selector";

const IntroGroup = () => {
  const { t } = useTranslation();

  const infogroup = useAppSelector(selectInfoGroup.getInfoGroup);

  return (
    <div className=" mb-4 grid h-fit gap-4  rounded-lg  bg-white p-3 shadow-md">
      <h2>{t("profile.intro")}</h2>

      <p>{infogroup.description}</p>
    </div>
  );
};

export default IntroGroup;
