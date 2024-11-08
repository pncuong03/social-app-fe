import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { AppDispatch } from "src/app/store";
import IconCustomize from "src/components/atoms/Icons";
import { useSocket } from "src/utilities/hooks/useSocket";
import { fetchMessageDetail, newMessage } from "src/slices/messages/messageSlice";
import { useAppSelector } from "src/app/appHooks";
import { selectMessageDetail } from "src/slices/messages/selector";
import MessageMenu from "./MessageMenu";
import MessageCard from "./MessageCard";

const MessageDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const { chatId } = location.state || {};

  const messagesDetail = useAppSelector(selectMessageDetail.getMessagesDetail);

  useEffect(() => {
    if (chatId) {
      dispatch(fetchMessageDetail(chatId));
    }
  }, [dispatch, chatId]);

  const user = {
    fullname: "Ha Anh",
    image: "https://picsum.photos/200/300",
    time: "2 hours ago",
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSend = () => {
    if (content.trim()) {
      const message = JSON.stringify({
        chatId: 1,
        message: content.trim(),
      });

      socket.send(message);

      // dispatch(
      //   newMessage({
      //     id: Math.random().toString(),
      //     isMe: true,
      //     createdAt: new Date().toISOString(),
      //     message: content.trim(),
      //     userId: "user-id", // replace with actual userId
      //     fullName: user.fullname,
      //     imageUrl: user.image,
      //   })
      // );

      setContent("");
    } else {
      console.error("WebSocket is not open or message is empty.");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);

        console.log(receivedMessage);

        // Dispatch action to add message to Redux store
        dispatch(newMessage(receivedMessage));

        // Scroll to the bottom when a new message is received
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    }
  }, [socket]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesDetail]);

  return (
    <div className={`${isMenuOpen ? "pr-96" : "pr-0"} flex flex-col  2xl:h-[850px]`}>
      {/* Header */}
      <div className="flex w-full items-center justify-between border-b-2 px-4 py-2 shadow-md">
        <div className="flex gap-2">
          <img src={user.image} className="h-12 w-12 rounded-full" alt="User" />

          <div>
            <h2 className="text-lg font-normal">{user.fullname}</h2>

            <p className="text-md font-light text-neutral-200">{user.time}</p>
          </div>
        </div>

        <div onClick={toggleMenu}>
          <IconCustomize name="danger" size={30} />
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messagesDetail.map((message: any) => (
          <MessageCard
            key={message.id}
            isMe={message.isMe}
            createdAt={message.createdAt}
            message={message.message}
            fullName={message.fullName}
            imageUrl={message.imageUrl}
          />
        ))}

        <div ref={endOfMessagesRef} />
      </div>

      {/* Text Input Area */}
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

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96">
          <MessageMenu img={user.image} fullname={user.fullname} />
        </div>
      )}
    </div>
  );
};

export default MessageDetail;
