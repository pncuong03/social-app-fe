import React, { useState } from "react";
import IconCustomize from "src/components/atoms/Icons";
import MessageMenu from "./MessageMenu";

const MessageDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = {
    fullname: "Ha Anh",
    image: "https://picsum.photos/200/300",
    time: "2 hours ago",
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`relative ${isMenuOpen ? "pr-96" : "pr-0"}`}>
      <div className="flex items-center justify-between border-b-2 px-4 py-2 shadow-sm">
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

      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 w-full bg-white pt-24 shadow-md transition-transform duration-300 lg:h-screen lg:w-96`}
        >
          <MessageMenu img={user.image} fullname={user.fullname} />
        </div>
      )}
    </div>
  );
};

export default MessageDetail;
