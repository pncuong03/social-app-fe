import React, { useEffect, useState } from "react";
import { List, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TimeCustomize from "../../../../const/dateFormat";
import { useDispatch } from "react-redux";
import { truncateString } from "src/const";
import { AppDispatch } from "src/app/store";
import { clearMessageCount, fetchListMessage } from "src/slices/messages/messageSlice";
import { selectMessage } from "src/slices/messages/selector";
import { useAppSelector } from "src/app/appHooks";

const MessageList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const messages = useAppSelector(selectMessage.getListMessages);

  const loadMessages = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      dispatch(fetchListMessage(page))
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
    loadMessages();
  }, []);

  const handleClick = (item: any) => {
    dispatch(clearMessageCount(item.id));
    navigate(`/messages/${item.name}`, { state: { chatId: item.id, info: item.name, img: item.imageUrl } });
  };

  return (
    <div
      id="scrollableDiv"
      className="flex h-[80vh] flex-col overflow-y-auto px-2"
      onScroll={(e: any) => {
        const bottom = e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight;

        if (bottom && !loading && hasMore) {
          loadMessages();
        }
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={messages}
        className=" px-4"
        renderItem={(item: any) => (
          <List.Item onClick={() => handleClick(item)}>
            <div className="flex cursor-pointer gap-3 font-medium text-black-100">
              <img src={item.imageUrl} className="h-12 w-12 rounded-full object-cover" alt="avatar" />

              <div className={`${item.messageCount > 0 ? "font-medium text-black-100" : "font-normal text-gray-400"}`}>
                <h1 className="text-xl font-medium text-black-300">{item.name}</h1>

                <div className="flex gap-1 text-base">
                  {item.isMe ? (
                    <p>
                      {t("message.you")}

                      {truncateString(item.newestMessage)}
                    </p>
                  ) : (
                    <p>{truncateString(item.newestMessage)}</p>
                  )}

                  <p>
                    <TimeCustomize time={item.newestChatTime} />
                  </p>
                </div>
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
};

export default MessageList;
