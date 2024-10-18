import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    label: "Thông tin về đoạn chat",
    children: <p>{text}</p>,
  },
  {
    label: "Tùy chỉnh đoạn chat",
    children: <p>{text}</p>,
  },
  {
    label: "File phương tiện & File",
    children: <p>{text}</p>,
  },
  {
    label: "Quyền riêng tư & bảo mật",
    children: <p>{text}</p>,
  },
];

const MenuCard = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      items={items}
      defaultActiveKey={["0"]}
      className="bg-white text-lg font-medium"
      bordered={false}
      expandIconPosition="right"
      onChange={onChange}
    />
  );
};

export default MenuCard;
