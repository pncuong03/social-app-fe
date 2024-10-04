import React from "react";
export interface BreadcrumbItem {
  title: string;
  path: string;
}

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const BasePageComponent: React.FC<Props> = ({ children }) => {
  return (
    <div className={`bg-cover bg-bgNormal`}>
      <div className={`py-10 mb-5 min-h-[calc(100vh-220px)] w-full h-full`}>
        {children}
      </div>
    </div>
  );
};

export default BasePageComponent;
