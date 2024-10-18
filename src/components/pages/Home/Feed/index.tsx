import React from "react";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";

const Feed = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-2 overflow-y-auto lg:w-[42rem] lg:gap-3">
      <InputBox />

      <Posts />
    </div>
  );
};

export default Feed;
