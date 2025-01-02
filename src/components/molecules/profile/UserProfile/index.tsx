import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { fetchPostUser } from "src/slices/posts/postSlice";
import Information from "src/components/molecules/profile/Infomation";
import Introduce from "src/components/molecules/profile/Introduce";
import Posts from "src/components/molecules/home/Posts";
import { selectInfoUser } from "src/slices/friend/selector";
import { fetchListImage, fetchUserInfo } from "src/slices/friend/friendSlice";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<any>([]);
  const infoUser = useAppSelector(selectInfoUser.getUserInfo);

  const loadPostUser = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostUser({ userId: id, page }))
        .then((body) => {
          const newPosts = body.payload;

          setData((prev: any) => [...prev, ...newPosts]);

          if (newPosts.length < 5) {
            setHasMore(false);
          } else {
            setPage((prevPage) => prevPage + 1);
          }
        })
        .finally(() => setLoading(false));
    }, 1000);
  };

  useEffect(() => {
    loadPostUser();
  }, []);

  useEffect(() => {
    dispatch(fetchUserInfo(id));
    dispatch(fetchListImage(id));
  }, [id]);

  return (
    <div
      className="h-[calc(100vh-60px)] overflow-y-auto"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadPostUser();
        }
      }}
    >
      <div className=" w-full bg-white shadow">
        <Information user={infoUser} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce user={infoUser} />
        </div>

        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <Posts posts={data} />

          {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
