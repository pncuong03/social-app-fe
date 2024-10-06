import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const SidebarRow = (props: Props) => {
  return (
    <Link to={props.path}>
      <div className="flex h-16 w-full cursor-pointer items-center gap-4 rounded-lg ">
        <div className="relative flex h-auto w-14 items-center justify-center">{props.icon}</div>

        <div className="text-lg font-semibold">{props.title}</div>
      </div>
    </Link>
  );
};

export default SidebarRow;
