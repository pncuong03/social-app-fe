import React from "react";
import { Popconfirm } from "antd";

export interface Props {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  className?: string;
  onConfirm?: () => void;
}

const PopconfirmCustomize = (props: Props) => {
  return (
    <Popconfirm
      title={props.title}
      icon={null}
      okText={props.okText}
      cancelText={props.cancelText}
      onConfirm={props.onConfirm}
      okButtonProps={{ style: { backgroundColor: "red", color: "white" } }}
      cancelButtonProps={{ style: { backgroundColor: "gray", color: "white" } }}
      className={props.className}
    >
      {props.children}
    </Popconfirm>
  );
};

export default PopconfirmCustomize;
