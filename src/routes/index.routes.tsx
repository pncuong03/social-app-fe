import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "src/components/layouts/MainLayout";
import Loading from "src/components/atoms/Loading";
import LoginPage from "src/components/pages/Login";
import RegisterPage from "src/components/pages/Register";
import PrivateRoute from "./privateRoute";
import routesName from "./enum.routes";

const HomePage = React.lazy(() => import("src/components/pages/Home"));
const ProfilePage = React.lazy(() => import("src/components/pages/Profile"));
const WatchPage = React.lazy(() => import("src/components/pages/Watch"));
const FriendsPage = React.lazy(() => import("src/components/pages/Friends"));
const FriendsList = React.lazy(() => import("src/components/pages/Friends/FriendsList"));
const FriendRequest = React.lazy(() => import("src/components/pages/Friends/FriendsRequest"));

function RoutesApp() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/404"
            element={
              <div className="flex h-[100vh] w-full items-center justify-center">
                <p className="text-50px font-bold text-primary">404</p>
              </div>
            }
          />

          <Route path={routesName.LOGIN} element={<LoginPage />} />

          <Route path={routesName.REGISTER} element={<RegisterPage />} />

          <Route path={routesName.HOME} element={<MainLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />

            <Route
              path={routesName.FRIEND}
              element={
                <PrivateRoute>
                  <FriendsPage />
                </PrivateRoute>
              }
            >
              <Route index element={<FriendRequest />} />

              <Route path={routesName.FRIENDLIST} element={<FriendsList />} />
            </Route>

            <Route
              path={routesName.PROFILE}
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            <Route
              path={routesName.WATCH}
              element={
                <PrivateRoute>
                  <WatchPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default RoutesApp;
