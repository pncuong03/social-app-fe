import React from "react";
import FriendCard from "src/components/molecules/Friend/FriendCard";

const FriendsList = () => {
  const friendsRequest = [
    {
      id: 1,
      fullName: "Nguyen Van A",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      fullName: "Nguyen Van B",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      fullName: "Nguyen Van C",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      fullName: "Nguyen Van D",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      fullName: "Nguyen Van A",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      fullName: "Nguyen Van B",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      fullName: "Nguyen Van C",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      fullName: "Nguyen Van D",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      fullName: "Nguyen Van A",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      fullName: "Nguyen Van B",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      fullName: "Nguyen Van C",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      fullName: "Nguyen Van D",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      fullName: "Nguyen Van A",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      fullName: "Nguyen Van B",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      fullName: "Nguyen Van C",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      fullName: "Nguyen Van D",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="">
      <h2 className="p-6 text-xl font-medium md:p-2 lg:px-10 xl:px-2">Danh sách bạn bè</h2>

      <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
        {friendsRequest.map((friend) => {
          return <FriendCard key={friend.id} fullName={friend.fullName} imageUrl={friend.imageUrl} isFriend={true} />;
        })}
      </div>
    </div>
  );
};

export default FriendsList;
