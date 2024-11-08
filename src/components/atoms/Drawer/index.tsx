import React from "react";
import { Drawer } from "antd";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}

const DrawerCustomize = (props: Props) => {
  return (
    <Drawer title={props.title} onClose={props.onClose} open={props.open}>
      {props.children}
    </Drawer>
  );
};

export default DrawerCustomize;
