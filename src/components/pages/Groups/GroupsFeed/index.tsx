import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "src/app/store";
import Posts from "src/components/molecules/home/Posts";
import { fetchPostGroupPublic } from "src/slices/groups/groupSlice";
import { Skeleton } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { selectPostGroupPublic } from "src/slices/groups/selector";

const GroupsFeed = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const postsGroupPublic = useAppSelector(selectPostGroupPublic.getListPostGroupPublic);

  const loadPostGroupPublic = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostGroupPublic(page))
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
    loadPostGroupPublic();
  }, []);

  return (
    <div
      className="h-[calc(100vh-60px)] overflow-y-auto "
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadPostGroupPublic();
        }
      }}
    >
      <div className="mx-2 md:mx-10 lg:mx-32 2xl:mx-80">
        <h2 className="px-6 py-3 text-2xl font-medium lg:px-10 xl:px-2">{t("groups.recentactivity")}</h2>

        <Posts posts={postsGroupPublic} isInGroup={true} />

        {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
      </div>
    </div>
  );
};

export default GroupsFeed;
