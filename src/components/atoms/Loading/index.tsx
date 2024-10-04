import React from 'react';
import { Spin } from 'antd'; 
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  const loadingIcon = <LoadingOutlined className="text-4xl" spin />; 

  return (
    <div className="flex items-center justify-center">
      <Spin indicator={loadingIcon} size="large" />
    </div>
  );
};

export default Loading;
