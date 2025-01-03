  import React, { useEffect, useRef, useState } from "react";
  import { useLocation } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import TextArea from "antd/es/input/TextArea";
  import { AppDispatch } from "src/app/store";
  import { useSocket } from "src/utilities/hooks/useSocket";
  import { IMessage } from "src/types/message";
  import { fetchMessageDetail } from "src/slices/messages/messageSlice";
  import IconCustomize from "src/components/atoms/Icons";
  import MessageMenu from "../MessageMenu";
  import MessageCard from "../MessageCard";

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

    console.log(receivedMessages);

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
          userId: "",
          message: content.trim(),
          fullName: "",
          imageUrl: "",
          isMe: true,
          createdAt: new Date().toISOString(),
        };

        setData((prev) => [...prev, newSendMessage]);

        setContent("");
      }
    };

    const loadMoreMessage = () => {
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

    useEffect(() => {
      if (location.state?.chatId) {
        loadMoreMessage();
        setData([]);
        setPage(0);
        setHasMore(true);
      }
    }, [location.state]);

    useEffect(() => {
      if (receivedMessages?.type === "CHAT" && receivedMessages?.chatId === chatId) {
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
      <div className={`flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? "pr-96" : "pr-0"}`}>
        <div className="flex w-full items-center justify-between border-b-2 px-4 py-2 shadow-md">
          <div className="flex gap-2">
            <img src={img} className="h-12 w-12 rounded-full" alt="User" />

            <div>
              <h2 className="text-lg font-normal">{info}</h2>

              <p className="text-md font-normal text-neutral-500">Hoạt động gần đây</p>
            </div>
          </div>

          <div onClick={toggleMenu}>
            <IconCustomize name="danger" size={30} />
          </div>
        </div>

        <div
          ref={scrollableDivRef}
          className="overflow-auto px-4 py-4"
          style={{ height: "77vh", border: "1px solid rgba(140, 140, 140, 0.35)" }}
          onScroll={(e: any) => {
            const top = e.target.scrollTop === 0;

            if (top && !loading && hasMore) loadMoreMessage();
          }}
        >
          {data.map((message, index) => (
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

        <div className="flex items-center gap-3 border-t p-3">
          <TextArea
            className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-500"
            autoSize
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div onClick={handleSend} className="cursor-pointer">
            <IconCustomize name="send" size={24} />
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 transform bg-white shadow-md transition-transform duration-300 ease-in-out lg:h-screen lg:w-96 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <MessageMenu img={img} fullname={info} groupId={chatId} />
        </div>
      </div>
    );
  };

  export default MessageDetail;
