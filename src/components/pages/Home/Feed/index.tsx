import React from "react";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";

const Feed = () => {
  return (
    <div className="mx-auto flex w-[45rem] flex-col gap-2 lg:mx-6">
      <InputBox />

      <Posts />
    </div>
  );
};

export default Feed;
