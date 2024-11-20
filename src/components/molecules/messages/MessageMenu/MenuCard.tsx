import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface Props {
  items: CollapseProps["items"];
}

const MenuCard = (props: Props) => {
  return (
    <Collapse items={props.items} className="bg-white text-lg font-medium" bordered={false} expandIconPosition="end" />
  );
};

export default MenuCard;
