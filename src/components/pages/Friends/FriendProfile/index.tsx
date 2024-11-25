import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import Information from "src/components/molecules/profile/Infomation";
import { selectInfoFriend, selectListFriend } from "src/slices/friend/selector";
import { useLocation } from "react-router-dom";
import { fetchInfoFriend } from "src/slices/friend/friendSlice";
import { selectPost } from "src/slices/posts/selector";
import Introduce from "src/components/molecules/profile/Introduce";
import Posts from "src/components/molecules/posts";

const FriendProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id } = location.state || {};

  const friendInfo = useAppSelector(selectInfoFriend.getInfoFriend);
  const postsMe = useAppSelector(selectPost.getPostsMe);
  const friendList = useAppSelector(selectListFriend.getListFriend);

  useEffect(() => {
    dispatch(fetchInfoFriend(id));
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="h-[calc(100vh-60px)] overflow-y-auto">
      <div className=" w-full bg-white shadow">
        <Information user={friendInfo} friends={friendList} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce user={friendInfo} friends={friendList} />
        </div>

        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <Posts posts={postsMe} />
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
