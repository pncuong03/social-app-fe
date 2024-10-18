import React from "react";
import { List } from "antd";
import { useNavigate } from "react-router-dom";

const MessageList = () => {
  const navigate = useNavigate();

  const messages = [
    {
      fullname: "John Doe",
      message: "Hello, how are you?",
      time: "2 hours ago",
      image: "./img/avatar.png",
      slug: "john-doe",
    },
    {
      fullname: "Jane Doe",
      message: "Good morning!",
      time: "3 hours ago",
      image: "./img/avatar2.png",
      slug: "jane-doe",
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      className="overflow-y-auto px-4"
      renderItem={(item, index) => (
        <List.Item key={index} onClick={() => navigate(`/messages/${item.slug}`)}>
          <div className="flex cursor-pointer gap-3">
            <img src={item.image} className="h-12 w-12 rounded-full object-cover" alt="avatar" />

            <div className="">
              <h1 className="text-xl font-normal">{item.fullname}</h1>

              <div className="text-md flex gap-1 text-gray-400">
                <p>{item.message}.</p>

                <p className="">{item.time}</p>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default MessageList;
