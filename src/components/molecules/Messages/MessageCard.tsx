import React from "react";

interface Props {
  isMe: boolean;
  createdAt: string;
  message: string;
  fullName: string;
  imageUrl: string;
}

const MessageCard = (props: Props) => {
  return (
    <div className="flex flex-grow flex-col-reverse p-4">
      {props.isMe ? (
        <div className="flex items-center justify-end gap-3 p-4">
          <p className="w-auto rounded-full bg-blue-300 p-2 text-xl">{props.message}</p>

          <p>{props.createdAt}</p>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4">
          <img src={props.imageUrl} className="h-12 w-12 rounded-full" alt="dp" />

          <p className="w-auto rounded-full bg-gray-300 p-2 text-xl">{props.message}</p>

          <p>{props.createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
