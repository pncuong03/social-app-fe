import React from "react";
import { Popconfirm } from "antd";

export interface Props {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  okText?: string;
  cancelText?: string;
}

const PopconfirmCustomize = (props: Props) => {
  return (
    <Popconfirm
      title={props.title}
      icon={null}
      okText={props.okText}
      cancelText={props.cancelText}
      okButtonProps={{ style: { backgroundColor: "red", color: "white" } }}
      cancelButtonProps={{ style: { backgroundColor: "gray", color: "white" } }}
    >
      {props.children}
    </Popconfirm>
  );
};

export default PopconfirmCustomize;
