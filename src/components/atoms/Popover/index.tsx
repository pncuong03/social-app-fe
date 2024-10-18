import { Popover } from "antd";
import React from "react";

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  color?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const PopoverCustomize = (props: Props) => {
  return (
    <Popover
      content={props.content}
      arrow={false}
      title={<h2 className="text-3xl">{props.title}</h2>}
      color={props.color}
      visible={props.visible}
      onVisibleChange={props.onVisibleChange}
      trigger="click"
    >
      {props.children}
    </Popover>
  );
};

export default PopoverCustomize;
