import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
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
  // const { t } = useTranslation();

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

  const handleOpenDetail = (item: any) => {
    console.log("item", item);
  };

  return (
    <div className="mt-10 hidden flex-col border-t-2 p-4 lg:flex">
      <h2 className="mb-2 text-xl font-medium">Nhóm bạn tham gia</h2>

      <div
        id="scrollableDiv"
        style={{
          height: "45vh",
          overflowY: "auto", // Vertical scrolling only
          overflowX: "hidden", // Disable horizontal scrolling
          display: "flex",
          flexDirection: "column",
          width: "100%", // Ensure it takes up the full width
        }}
        onScroll={(e: any) => {
          const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

          if (bottom && !loading && hasMore) {
            loadGroups();
          }
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={groups}
          className="w-80 md:w-96"
          renderItem={(item: any) => (
            <List.Item onClick={() => handleOpenDetail(item)} style={{ cursor: "pointer", width: "100%" }}>
              <div
                onClick={() => navigate(`/groups/${item.name}`, { state: { groupId: item.id } })}
                className="flex items-center gap-3 rounded-md p-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <img src={item.img} className="h-14 w-14 rounded-lg" />

                <p className="text-lg">{item.name}</p>
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
    </div>
  );
};

export default GroupsListCol;
