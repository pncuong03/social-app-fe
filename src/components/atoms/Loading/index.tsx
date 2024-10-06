import React from "react";
import { Spin } from "antd";

const Loading = () => {
  // const loadingIcon = <LoadingOutlined className="text-4xl" spin />;

  return (
    <div className="flex items-center justify-center">
      <Spin size="large" delay={300} />
    </div>
  );
};

export default Loading;
