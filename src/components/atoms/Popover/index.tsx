import { Popover } from "antd";
import React from "react";

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  arrow?: boolean;
  onOpenChange?: (visible: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
}

const PopoverCustomize = (props: Props) => {
  return (
    <Popover
      content={props.content}
      title={<h2 className="text-3xl">{props.title}</h2>}
      onOpenChange={props.onOpenChange}
      arrow={props.arrow ?? false}
      open={props.open}
      trigger="click"
      placement={props.placement}
    >
      {props.children}
    </Popover>
  );
};

export default PopoverCustomize;
