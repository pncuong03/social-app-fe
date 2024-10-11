import React, { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import LocalStorage, { LocalStorageKey } from "src/utilities/local-storage/localStorage";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN);

  if (accessToken) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
