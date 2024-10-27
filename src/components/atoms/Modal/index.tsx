import React from "react";
import { Modal } from "antd";
import SpinCustomize from "../Spin";

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
      title={<h2 className="border-b-2 pb-2 text-2xl">{props.title}</h2>}
      open={props.open}
      onCancel={props.onCancel}
      centered
      footer={null}
      style={{ borderRadius: "1rem", overflowY: "hidden" }}
      width={props.size}
      closable={props.closable}
    >
      <div className="relative w-full">
        {props.loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white bg-opacity-75">
            <SpinCustomize />
          </div>
        )}

        <div
          className={`modal-body ${props.loading ? "opacity-50" : ""} max-h-[70vh] overflow-y-auto transition-opacity`}
        >
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCustomize;
