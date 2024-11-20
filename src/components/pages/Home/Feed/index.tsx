import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import InputBox from "src/components/molecules/inputbox";
import Posts from "src/components/molecules/posts";
import { fetchPostPublic } from "src/slices/posts/postSlice";
import { selectPost } from "src/slices/posts/selector";

const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const postsPublic = useAppSelector(selectPost.getPostsPublic);

  const loadPostPublic = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostPublic(page))
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
    loadPostPublic();
  }, []);

  console.log(postsPublic);

  return (
    <div
      className="mx-auto flex w-full flex-col gap-2 overflow-y-auto lg:w-[42rem] lg:gap-3"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadPostPublic();
        }
      }}
    >
      <InputBox />

      <Posts posts={postsPublic} />

      {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
    </div>
  );
};

export default Feed;
