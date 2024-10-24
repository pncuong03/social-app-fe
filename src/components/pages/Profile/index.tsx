import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";
import Information from "src/components/molecules/Profile/Infomation";
import Introduce from "src/components/molecules/Profile/Introduce";
import { selectUserInfo } from "src/slices/login/selector";
import { fetchPostMe } from "src/slices/posts/postSlice";
import { selectPost } from "src/slices/posts/selector";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);
  const postsMe = useAppSelector(selectPost.getPostsMe);
  const friendList = useAppSelector(selectListFriend.getListFriend);

  useEffect(() => {
    dispatch(fetchPostMe());
    dispatch(fetchListFriend());
  }, [dispatch]);

  return (
    <div className="">
      <div className="h-full w-full bg-white shadow">
        <Information user={userInfo} friends={friendList} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce user={userInfo} friends={friendList} />
        </div>

        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <InputBox />

          <Posts posts={postsMe} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
