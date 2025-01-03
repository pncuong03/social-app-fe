import { Tooltip } from "antd";
import TimeCustomize from "src/const/dateFormat";
  import React from "react";

  interface Props {
    message: string;
    fullName: string;
    imageUrl: string;
    createdAt: string;
    isMe: boolean;
  }

  const MessageCard = (props: Props) => {
    return (
      <div className="fade-in flex flex-grow flex-col-reverse p-3">
        <div className={`flex items-center gap-3 p-4 ${props.isMe ? "justify-end" : ""}`}>
          <Tooltip title={<TimeCustomize time={props.createdAt} />} placement="top">
            <p
                className={`w-auto max-w-xs rounded-2xl p-2 text-lg ${
                    props.isMe ? "bg-blue-300 text-white" : "text-black bg-gray-300"
                }`}
            >
              {props.message}
            </p>
          </Tooltip>
          {!props.isMe && <img src={props.imageUrl} className="h-12 w-12 rounded-full" alt="dp" />}
        </div>
      </div>
    );
  };
  export default MessageCard;
