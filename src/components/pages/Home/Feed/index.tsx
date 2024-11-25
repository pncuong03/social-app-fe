import React from "react";
import { Skeleton } from "antd";
import InputBox from "src/components/molecules/inputbox";
import Posts from "src/components/molecules/posts";

interface Props {
  loading: boolean;
  postsPublic: any;
}

const Feed = (props: Props) => {
  return (
    <div className="mx-auto flex  w-full  flex-col gap-2  lg:w-[44rem] lg:gap-3">
      <InputBox />

      <Posts posts={props.postsPublic} />

      {props.loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
    </div>
  );
};

export default Feed;
