import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/appHooks";
import { selecPostGroup } from "src/slices/groups/selector";
import Posts from "src/components/molecules/home/Posts";

const GroupsFeed = () => {
  const { t } = useTranslation();
  const postsGroup = useAppSelector(selecPostGroup.getListPostGroup);

  return (
    <div className="mx-2 mt-4 md:mx-10 lg:mx-32 2xl:mx-80">
      <h2 className="text-2xl font-medium text-gray-400 lg:px-10 xl:px-2">{t("groups.recentactivity")}</h2>

      <Posts posts={postsGroup} />
    </div>
  );
};

export default GroupsFeed;
