import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { fetchListGroup } from "src/slices/groups/groupSlice";
import { selectGroup } from "src/slices/groups/selector";
import GroupCard from "src/components/molecules/groups/GroupCard";

const GroupsJoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const groups = useAppSelector(selectGroup.getListGroup);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadGroups = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchListGroup(page))
        .then((response) => {
          if (response.payload.length < 12) {
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
    setTimeout(() => {
      loadGroups();
    }, 1000);
  }, []);

  return (
    <div
      className="flex h-[calc(100vh-70px)] flex-col overflow-y-auto px-1 pb-10"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadGroups();
        }
      }}
    >
      <h2 className="p-6 text-2xl font-medium lg:px-10 ">{t("groups.groupjoin")}</h2>

      <div className=" grid grid-cols-3 gap-3">
        {groups.map((group: any) => {
          return (
            <GroupCard
              key={group.idGroup}
              idGroup={group.idGroup}
              name={group.name}
              img={group.img}
              memberCount={group.memberCount}
            />
          );
        })}

        {loading && <Skeleton avatar paragraph={{ rows: 1 }} active />}
      </div>
    </div>
  );
};

export default GroupsJoins;
