import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Contact = () => {
  const { t } = useTranslation();

  const friends = [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      imageUrl: "https://random.imagecdn.app/125/119",
    },
    {
      id: 2,
      fullName: "Nguyễn Văn B",
      imageUrl: "https://random.imagecdn.app/125/118",
    },
    {
      id: 3,
      fullName: "Nguyễn Văn C",
      imageUrl: "https://random.imagecdn.app/125/117",
    },
  ];

  return (
    <div className="hidden h-[calc(120vh-56px)] w-[25rem] flex-col rounded-xl bg-white p-3 shadow-sm hover:overflow-y-auto xl:flex">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-2xl font-normal ">{t("home.contact")}</p>

        <div className="flex items-center space-x-3">
          {/* <Button className='rounded-full'>
            <SearchIcon />
          </Button> */}
          <Button className="rounded-full"></Button>
        </div>
      </div>

      <div className="flex flex-col">
        {friends?.map((friend) => (
          <Link
            to={`/${friend.id}`}
            key={friend.id}
            className="flex h-16 cursor-pointer items-center gap-3 space-x-2 rounded-md p-2 hover:bg-gray-100"
          >
            <img className="h-12 w-12 rounded-full" src={friend.imageUrl} alt="user" />

            <p className="text-lg font-normal ">{friend.fullName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contact;
