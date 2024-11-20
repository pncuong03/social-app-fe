import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import InputBox from "src/components/molecules/inputbox";
import Posts from "src/components/molecules/posts";
import Information from "src/components/molecules/profile/Infomation";
import Introduce from "src/components/molecules/profile/Introduce";
import { selectUserInfo } from "src/slices/login/selector";
import { fetchPostMe } from "src/slices/posts/postSlice";
import { selectPost } from "src/slices/posts/selector";
import { selectListFriend } from "src/slices/friend/selector";
import { fetchListFriend } from "src/slices/friend/friendSlice";
import { Skeleton } from "antd";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);
  const postsMe = useAppSelector(selectPost.getPostsMe);
  const friendList = useAppSelector(selectListFriend.getListFriend);

  const loadMessages = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostMe(page))
        .then((response) => {
          if (response.payload.length < 5) {
            setHasMore(false);
          } else {
            setHasMore(true);
            setPage((prevPage) => prevPage + 1);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  useEffect(() => {
    loadMessages();
    dispatch(fetchListFriend());
  }, []);

  return (
    <div className="">
      <div className="h-full w-full bg-white shadow">
        <Information user={userInfo} friends={friendList} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce user={userInfo} friends={friendList} />
        </div>

        <div
          className="no-scrollbar col-span-2 flex h-[100vh] w-full flex-col gap-4 overflow-y-auto"
          onScroll={(e: any) => {
            const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

            if (bottom && !loading && hasMore) {
              loadMessages();
            }
          }}
        >
          <InputBox />

          <Posts posts={postsMe} />

          {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
