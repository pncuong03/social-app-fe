import React from "react";
import Sidebar from "./Sidebar";
import Contact from "./Contact";
import Feed from "./Feed";

const HomePage = () => {
  return (
    <div className="mt-4 flex justify-between p-4">
      <Sidebar />

      <Feed />

      <Contact />
    </div>
  );
};

export default HomePage;
