import { Popover } from "antd";
import React from "react";

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  color?: string;
  open?: boolean;
  arrow?: boolean;
  onOpenChange?: (visible: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
}

const PopoverCustomize = (props: Props) => {
  return (
    <Popover
      content={props.content}
      arrow={props.arrow ?? false}
      title={<h2 className="text-3xl">{props.title}</h2>}
      color={props.color}
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger="click"
      placement={props.placement}
    >
      {props.children}
    </Popover>
  );
};

export default PopoverCustomize;
