import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { List, Skeleton } from "antd";
import { selectGroup } from "src/slices/groups/selector";
import { fetchListGroup } from "src/slices/groups/groupSlice";
import { useNavigate } from "react-router-dom";

const GroupsListCol = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
          if (response.payload.length < 10) {
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
      className="flex h-[60vh] flex-col px-1 hover:overflow-y-auto"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadGroups();
        }
      }}
    >
      <List
        dataSource={groups}
        renderItem={(item: any) => (
          <List.Item
            onClick={() => navigate(`/groups/${item.name}`, { state: { groupId: item.idGroup } })}
            className="mb-2 flex h-16 !justify-start  rounded-2xl  hover:cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 px-2  ">
              <img src={item.img} className="h-12 w-12 rounded-xl" />

              <p className="text-xl">{item.name}</p>
            </div>
          </List.Item>
        )}
      >
        {loading && (
          <List.Item>
            <Skeleton avatar paragraph={{ rows: 1 }} active />
          </List.Item>
        )}
      </List>
    </div>
  );
};

export default GroupsListCol;
