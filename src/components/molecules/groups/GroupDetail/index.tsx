import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { selectUserInfo } from "src/slices/login/selector";
import { fetchPostMe } from "src/slices/posts/postSlice";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";
import InfoGroup from "./InfoGroup";
import IntroGroup from "./IntroGroup";
import { selectPost } from "src/slices/posts/selector";
import Posts from "../../posts";
import InputBoxGroup from "./FeedGroup/InputBoxGroup";

const GroupDetail = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);
  const friendList = useAppSelector(selectListFriend.getListFriend);
  const postsMe = useAppSelector(selectPost.getPostsMe);

  useEffect(() => {
    dispatch(fetchPostMe(0));
    dispatch(fetchListFriend());
  }, [dispatch]);

  return (
    <div className="">
      <div className="h-full bg-white shadow">
        <InfoGroup user={userInfo} friends={friendList} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-44">
        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <InputBoxGroup />

          <Posts posts={postsMe} />
        </div>

        <div className="col-span-1 ">
          <IntroGroup />
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
