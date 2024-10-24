import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "src/components/layouts/MainLayout";
import LoginPage from "src/components/pages/Login";
import RegisterPage from "src/components/pages/Register";
import PrivateRoute from "./privateRoute";
import routesName from "./enum.routes";
import NotFound from "src/components/atoms/NotFound";
import MessageDetail from "src/components/molecules/Messages/MessageDetail";
import SpinCustomize from "src/components/atoms/Spin";
import GroupDetail from "src/components/molecules/Groups/GroupDetail";

const HomePage = React.lazy(() => import("src/components/pages/Home"));
const ProfilePage = React.lazy(() => import("src/components/pages/Profile"));
const WatchPage = React.lazy(() => import("src/components/pages/Watch"));
const GroupsPage = React.lazy(() => import("src/components/pages/Groups"));
const FriendsPage = React.lazy(() => import("src/components/pages/Friends"));
const FriendsList = React.lazy(() => import("src/components/pages/Friends/FriendsList"));
const FriendRequest = React.lazy(() => import("src/components/pages/Friends/FriendsRequest"));
const MessagePage = React.lazy(() => import("src/components/pages/Messages"));
const FriendProfile = React.lazy(() => import("src/components/pages/Friends/FriendProfile"));
const GroupsFeed = React.lazy(() => import("src/components/pages/Groups/GroupsFeed"));
const GroupsJoins = React.lazy(() => import("src/components/pages/Groups/GroupsJoins"));

function RoutesApp() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinCustomize />}>
        <Routes>
          <Route path="/404" element={<NotFound />} />

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
              path={routesName.FRIENDS}
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

            <Route
              path={routesName.GROUPS}
              element={
                <PrivateRoute>
                  <GroupsPage />
                </PrivateRoute>
              }
            >
              <Route index element={<GroupsFeed />} />

              <Route path={routesName.GROUPSJOINS} element={<GroupsJoins />} />

              <Route path={routesName.GROUPDETAIL} element={<GroupDetail />} />
            </Route>

            <Route
              path={routesName.FRIENPROFILE}
              element={
                <PrivateRoute>
                  <FriendProfile />
                </PrivateRoute>
              }
            />

            <Route
              path={routesName.MESSAGES}
              element={
                <PrivateRoute>
                  <MessagePage />
                </PrivateRoute>
              }
            >
              <Route path={routesName.MESSAGEDETAIL} element={<MessageDetail />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default RoutesApp;
