import React from "react";
import { Skeleton } from "antd";
import Posts from "src/components/molecules/home/Posts";
import InputBox from "src/components/molecules/home/InputBox";

interface Props {
  loading: boolean;
  postsPublic: any;
}

const Feed = (props: Props) => {
  return (
    <div className="mx-2 flex w-full  flex-col  gap-2 lg:mx-auto  lg:w-[44rem] lg:gap-3">
      <InputBox />

      <Posts posts={props.postsPublic} />

      {props.loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
    </div>
  );
};

export default Feed;
