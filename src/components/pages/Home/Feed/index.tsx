import React from "react";
import { useAppSelector } from "src/app/appHooks";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";
import { selectPost } from "src/slices/posts/selector";

const Feed = () => {
  const postsPublic = useAppSelector(selectPost.getPostsPublic);

  return (
    <div className="mx-auto flex w-full flex-col gap-2 overflow-y-auto lg:w-[42rem] lg:gap-3">
      <InputBox />

      <Posts posts={postsPublic} />
    </div>
  );
};

export default Feed;
