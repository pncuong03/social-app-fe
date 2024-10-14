import React from "react";
import { Spin } from "antd";

const SpinCustomize = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" delay={300} />
    </div>
  );
};

export default SpinCustomize;
