import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
  icon?: React.ReactNode;
  image?: string;
}

const SidebarRow = (props: Props) => {
  return (
    <Link to={props.path}>
      <div className="flex h-16 w-full cursor-pointer items-center gap-3 rounded-xl hover:bg-gray-100">
        <div className="relative flex h-auto w-14 items-center justify-center">
          {props.image ? <img src={props.image} className="h-12 w-12 rounded-full object-cover" /> : props.icon}
        </div>

        <div className="text-2xl font-normal">{props.title}</div>
      </div>
    </Link>
  );
};

export default SidebarRow;
