import React from "react";
import { useAppSelector } from "src/app/appHooks";
import Posts from "src/components/molecules/posts";
import { selecPostGroup } from "src/slices/groups/selector";

const GroupsFeed = () => {
  const postsGroup = useAppSelector(selecPostGroup.getListPostGroup);

  return (
    <div className="mx-2 mt-4 md:mx-10 lg:mx-32 2xl:mx-80">
      <h2 className="mb-4 font-medium text-gray-400">Hoat dong gan day</h2>

      <Posts posts={postsGroup} />
    </div>
  );
};

export default GroupsFeed;
