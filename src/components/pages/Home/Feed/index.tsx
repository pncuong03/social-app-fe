import React from "react";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";

const Feed = () => {
  return (
    <div className="lg:gap- mx-auto flex w-full flex-col gap-2 lg:w-[40rem]">
      <InputBox />

      <Posts />
    </div>
  );
};

export default Feed;
