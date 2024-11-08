import React from "react";
import { List } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  listMessage: any[];
}

const MessageList = (props: Props) => {
  const navigate = useNavigate();

  console.log(props.listMessage);

  return (
    <List
      itemLayout="horizontal"
      dataSource={props.listMessage}
      className="overflow-y-auto px-4"
      renderItem={(item: any, index) => (
        <List.Item key={index} onClick={() => navigate(`/messages/${item.name}`, { state: { chatId: item.id } })}>
          <div className="flex cursor-pointer gap-3">
            <img src={item.imageUrl} className="h-12 w-12 rounded-full object-cover" alt="avatar" />

            <div className="">
              <h1 className="text-xl font-normal">{item.name}</h1>

              <div className="text-md flex gap-1 text-gray-400">
                <p>{item.newestMessage}.</p>

                <p className="">{item.newestChatTime}</p>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default MessageList;
