import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "src/components/layouts/MainLayout";
import routesName from "./enum.routes";
import Loading from "src/components/atoms/Loading";

const HomePage = React.lazy(() => import('src/components/pages/Home'));
const ProfilePage = React.lazy(() => import('src/components/pages/Profile'));
const WatchPage = React.lazy(() => import('src/components/pages/Watch'));

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

        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<HomePage />} />

          <Route path={routesName.PROFILE} element={<ProfilePage />} />

          <Route path={routesName.WATCH} element={<WatchPage />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default RoutesApp;
