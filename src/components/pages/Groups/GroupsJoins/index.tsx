import React from "react";
import GroupCard from "src/components/molecules/groups/GroupsJoins/GroupCard";

const GroupsJoins = () => {
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
      id: 4,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
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
      id: 4,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Group 1",
      description: "Description 1",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Group 2",
      description: "Description 2",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Group 3",
      description: "Description 3",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-4 lg:mx-0">
      <h2 className="mb-4 text-xl font-medium">Nhóm bạn tham gia</h2>

      <div className="flex flex-wrap gap-3">
        {groups.map((group) => {
          return (
            <GroupCard key={group.id} id={group.id} name={group.name} img={group.img} description={group.description} />
          );
        })}
      </div>
    </div>
  );
};

export default GroupsJoins;
