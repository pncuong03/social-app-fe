import React from "react";
import GroupCardCol from "./GroupCardCol";

const GroupsListCol = () => {
  const groups = [
    {
      id: 1,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="mt-10 hidden flex-col border-t-2 p-4 lg:flex">
      <h2 className="mb-2 text-xl font-medium">Nhóm bạn tham gia</h2>

      <div className="flex flex-col gap-1">
        {groups.map((group) => {
          return <GroupCardCol key={group.id} name={group.name} img={group.img} description={group.description} />;
        })}
      </div>
    </div>
  );
};

export default GroupsListCol;
