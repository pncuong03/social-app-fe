import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import Information from "src/components/molecules/profile/Infomation";
import { useLocation } from "react-router-dom";
import { selectPost } from "src/slices/posts/selector";
import Introduce from "src/components/molecules/profile/Introduce";
import Posts from "src/components/molecules/posts";
import { fetchPostUser } from "src/slices/posts/postSlice";
import { Skeleton } from "antd";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const postsUser = useAppSelector(selectPost.getPostsUser);

  const loadPostUser = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostUser({ userId: id, page }))
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
    loadPostUser();
  }, []);

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
        <Information />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce />
        </div>

        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <Posts posts={postsUser} />

          {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
