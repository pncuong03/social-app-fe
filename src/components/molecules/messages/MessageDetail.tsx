import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import IconCustomize from "src/components/atoms/Icons";
import TextArea from "antd/es/input/TextArea";
import MessageMenu from "./MessageMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { fetchMessageDetail } from "src/slices/messages/messageSlice";
import { useSocket } from "src/utilities/hooks/useSocket";
import MessageCard from "./MessageCard";
import { IMessage } from "src/types/message";

const MessageDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const { sendMessage, receivedMessages } = useSocket();
  const { chatId, info, img } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IMessage[]>([]);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSend = () => {
    if (content.trim()) {
      sendMessage({
        chatId,
        message: content.trim(),
      });

      const newSendMessage = {
        id: data.map((item) => item.id).reduce((a, b) => Math.max(a, b), 0) + 1,
        userId: "1",
        message: content.trim(),
        fullName: "Ha Anh",
        imageUrl: "https://picsum.photos/200/300",
        isMe: true,
        createdAt: new Date().toISOString(),
      };

      setData((prev) => [...prev, newSendMessage]);

      setContent("");
    }
  };

  const loadMoreData = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    dispatch(fetchMessageDetail({ chatId, page }))
      .then((body) => {
        const newMessages = body.payload.slice().reverse();

        setData((prev) => [...newMessages, ...prev]);

        if (newMessages.length < 20) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  }, [data]);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     if (scrollableDivRef.current) {
  //       scrollableDivRef.current.scrollTop = 0;
  //     }
  //   }, 100); // Delay the scroll to ensure the message list is fully rendered
  // };

  useEffect(() => {
    if (chatId) {
      setData([]); // Reset message list
      setPage(0);
      setHasMore(true);
      loadMoreData();
    }
  }, [location]);

  useEffect(() => {
    if (receivedMessages?.type === "CHAT" && receivedMessages?.chatId === chatId) {
      console.log(receivedMessages);

      const newReceivedMessage = {
        ...receivedMessages,
        id: data.map((item) => item.id).reduce((a, b) => Math.max(a, b), 0) + 1,
      };

      setTimeout(() => {
        setData((prevData) => [...prevData, newReceivedMessage]);
      }, 1000);
    }
  }, [receivedMessages, chatId]);

  return (
    <div className={`${isMenuOpen ? "pr-96" : "pr-0"} flex flex-col`}>
      <div className="flex w-full items-center justify-between border-b-2 px-4 py-2 shadow-md">
        <div className="flex gap-2">
          <img src={img} className="h-12 w-12 rounded-full" alt="User" />

          <div>
            <h2 className="text-lg font-normal">{info}</h2>

            <p className="text-md font-normal text-neutral-200">Hoạt động gần đây</p>
          </div>
        </div>

        <div onClick={toggleMenu}>
          <IconCustomize name="danger" size={30} />
        </div>
      </div>

      <div
        ref={scrollableDivRef}
        style={{
          height: "77vh",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
        onScroll={(e: any) => {
          const top = e.target.scrollTop === 0;

          if (top && !loading && hasMore) {
            loadMoreData(); // Trigger load more when the user reaches the top
          }
        }}
      >
        {data.map((message: any, index: any) => (
          <MessageCard
            key={index}
            isMe={message.isMe}
            createdAt={message.createdAt}
            message={message.message}
            fullName={message.fullName}
            imageUrl={message.imageUrl}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 border-t p-3">
        <TextArea
          className="w-full resize-none rounded-2xl border p-3 outline-none"
          autoSize
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div onClick={handleSend}>
          <IconCustomize name="send" size={24} />
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96">
          <MessageMenu img={img} fullname={info} groupId={chatId} />
        </div>
      )}
    </div>
  );
};

export default MessageDetail;
