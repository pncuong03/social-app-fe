import React, { useState, useEffect } from "react";
import { List, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import PopoverCustomize from "src/components/atoms/Popover";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import { selectNotification } from "src/slices/notification/selector";
import { fetchListNotification, increaseNoti } from "src/slices/notification/notificationSlice";
import TimeCustomize from "src/const/dateFormat";
import { formatNoti } from "src/const/notiFormat";
import PostDetail from "../home/Posts/PostDetail";
import { useSocket } from "src/utilities/hooks/useSocket";

interface Props {
  children: React.ReactNode;
}

const Notification = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const notifications = useAppSelector(selectNotification.getListNotification);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [postId, setPostId] = useState<number>();
  const [openPopover, setOpenPopover] = useState(false);
  const { receivedMessages } = useSocket();

  const loadNotifications = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchListNotification(page))
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
      loadNotifications();
    }, 1000);
  }, []);

  useEffect(() => {
    // if (receivedMessages?.type ===  "FRIEND_REQUEST" || "ACCEPT_FRIEND_REQUEST" || "COMMENT" || "LIKE" || "SHARE" ) {
    //   dispatch(addNoti({
    //     id: notifications.map((item) => item.id).reduce((a, b) => Math.max(a, b), 0) + 1,

    //   }))

    // }

    dispatch(increaseNoti());
  }, [receivedMessages]);

  const handleOpenDetail = (item: any) => {
    if (["COMMENT", "LIKE", "SHARE"].includes(item.interactType)) {
      setPostId(item.postId);
      setOpenModal(true);
      setOpenPopover(false);
    }
  };

  const content = (
    <div
      id="scrollableDiv"
      style={{
        height: "45vh",
        overflowY: "auto",
        padding: "0 8px",
        display: "flex",
        flexDirection: "column",
      }}
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadNotifications();
        }
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        className="w-80 md:w-96"
        locale={{ emptyText: t("home.nonoti") }}
        renderItem={(item: any) => (
          <List.Item onClick={() => handleOpenDetail(item)} style={{ cursor: "pointer", width: "100%" }}>
            <div className={`flex items-center gap-2 ${item.hasSeen ? "text-gray-400" : "text-black-100"}`}>
              <img className="h-12 w-12 rounded-full" src={item.interact.imageUrl} alt="" />

              <div>
                <div className="gap-2 text-base">
                  <p className=" font-medium">
                    {item.interact.fullName}

                    <span className="pl-1 font-normal">{formatNoti(item.interactType, t)}</span>
                  </p>
                </div>

                <p className="font-medium text-blue-600">
                  <TimeCustomize time={item.createdAt} />
                </p>
              </div>
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

  return (
    <>
      <PopoverCustomize
        content={content}
        title={t("home.noti")}
        open={openPopover}
        onOpenChange={(visible) => setOpenPopover(visible)}
      >
        {props.children}
      </PopoverCustomize>

      {postId && <PostDetail open={openModal} onCancel={() => setOpenModal(false)} postId={postId} />}
    </>
  );
};

export default Notification;
