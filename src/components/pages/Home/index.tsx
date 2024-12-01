import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Contact from "./Contact";
import Feed from "./Feed";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { selectPost } from "src/slices/posts/selector";
import { fetchPostPublic } from "src/slices/posts/postSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const postsPublic = useAppSelector(selectPost.getPostsFriends);

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

  return (
    <div
      className="container mx-auto  flex h-[calc(100vh-60px)] max-w-[1920px] justify-between overflow-y-auto py-4 lg:flex lg:flex-row lg:gap-4"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadPostPublic();
        }
      }}
    >
      <Sidebar />

      <Feed postsPublic={postsPublic} loading={loading} />

      <Contact />
    </div>
  );
};

export default HomePage;
