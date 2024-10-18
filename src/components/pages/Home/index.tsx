import React from "react";
import Sidebar from "./Sidebar";
import Contact from "./Contact";
import Feed from "./Feed";

const HomePage = () => {
  return (
    <div className="max-w-screen fixed top-0 bottom-0 left-0 right-0 mt-24 flex justify-between p-4 lg:gap-4">
      <Sidebar />

      <Feed />

      <Contact />
    </div>
  );
};

export default HomePage;
