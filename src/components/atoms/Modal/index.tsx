import React from "react";
import { Modal } from "antd";
import Loading from "../Loading";

interface Props {
  children?: React.ReactNode;
  show?: boolean;
  title?: string;
  open?: boolean;
  onCancel?: () => void;
  loading?: boolean;
  size?: "small" | "medium" | "large" | number;
  closable?: boolean;
}

const ModalCustomize = (props: Props) => {
  return (
    <Modal
      title={props.title}
      open={props.open}
      onCancel={props.onCancel}
      centered
      footer={null}
      style={{ borderRadius: "1rem", overflow: "auto" }}
      width={props.size}
      closable={props.closable}
    >
      <div className="w-full">
        {props.loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white bg-opacity-75">
            <Loading />
          </div>
        )}

        <div className={`modal-body ${props.loading ? "opacity-50" : ""} mt-4 transition-opacity`}>
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCustomize;
