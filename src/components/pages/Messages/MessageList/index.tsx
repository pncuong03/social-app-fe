  import React, { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import { List, Skeleton } from "antd";
  import { AppDispatch } from "src/app/store";
  import { useAppSelector } from "src/app/appHooks";
  import { truncateString } from "src/const";
  import TimeCustomize from "../../../../const/dateFormat";
  import { clearMessageCount, fetchListMessage } from "src/slices/messages/messageSlice";
  import { selectMessage } from "src/slices/messages/selector";

  const MessageList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const messages = useAppSelector(selectMessage.getListMessages);

    const loadMessages = () => {
      if (loading) return;

      setLoading(true);

      setTimeout(() => {
        dispatch(fetchListMessage(page))
          .then((response) => {
            if (response.payload.length < 13) {
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
      setSelectedMessageId(item.id);
      dispatch(clearMessageCount(item.id));
      navigate(`/messages/${item.name}`, { state: { chatId: item.id, info: item.name, img: item.imageUrl } });
    };

    return (
      <div
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
          className="px-1"
          renderItem={(item: any) => (
            <List.Item
              onClick={() => handleClick(item)}
              className={`rounded-2xl ${selectedMessageId === item.id ? "bg-blue-100" : ""}`}
            >
              <div className="flex cursor-pointer gap-3 px-2 font-medium text-black-100">
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
