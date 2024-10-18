import { Input } from "antd";
import React from "react";

interface Props {
  placeholder: string;
  prefix?: React.ReactNode;
  value?: string;
  ocChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputCustomize = (props: Props) => {
  return (
    <Input
      placeholder={props.placeholder}
      className={props.className}
      prefix={props.prefix}
      value={props.value}
      onChange={props.ocChange}
    />
  );
};

export default InputCustomize;