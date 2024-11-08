import React from "react";

interface Props {
  name: string;
  img: string;
  description: string;
}

const GroupCardCol = (props: Props) => {
  return (
    <div className="flex items-center gap-3 rounded-md p-1 hover:cursor-pointer hover:bg-gray-100">
      <img src={props.img} className="h-14 w-14 rounded-lg" />

      <p className="text-lg">{props.name}</p>
    </div>
  );
};

export default GroupCardCol;
