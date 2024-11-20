import React from "react";
import { Drawer } from "antd";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  placement?: "top" | "right" | "bottom" | "left";
}

const DrawerCustomize = (props: Props) => {
  return (
    <Drawer title={props.title} placement={props.placement} onClose={props.onClose} open={props.open}>
      {props.children}
    </Drawer>
  );
};

export default DrawerCustomize;
