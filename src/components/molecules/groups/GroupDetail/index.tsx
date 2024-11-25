import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import InfoGroup from "./InfoGroup";
import IntroGroup from "./IntroGroup";
import Posts from "../../posts";
import InputBoxGroup from "./FeedGroup/InputBoxGroup";
import { Skeleton } from "antd";
import { fetchInfoGroup, fetchMemberGroup, fetchPostGroup } from "src/slices/groups/groupSlice";
import { selecPostGroup } from "src/slices/groups/selector";
import { useLocation } from "react-router-dom";

const GroupDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { groupId } = location.state || {};

  const postGroups = useAppSelector(selecPostGroup.getListPostGroup);

  const loadPostGroups = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchPostGroup({ groupId, page }))
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
    if (groupId) {
      setPage(0);
      setHasMore(true);
      loadPostGroups();

      dispatch(fetchInfoGroup(groupId));
      dispatch(fetchMemberGroup({ groupId, page }));
    }
  }, [location]);

  console.log(page);

  return (
    <div
      className="h-[calc(100vh-60px)] overflow-y-auto"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadPostGroups();
        }
      }}
    >
      <div className=" bg-white shadow">
        <InfoGroup />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-44">
        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <InputBoxGroup />

          <Posts posts={postGroups} />

          {loading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
        </div>

        <div className="col-span-1 ">
          <IntroGroup />
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
