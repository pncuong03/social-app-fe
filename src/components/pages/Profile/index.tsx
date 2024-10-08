import { useColorScheme } from "@mui/material";
import React from "react";
import InputBox from "src/components/molecules/InputBox";
import Posts from "src/components/molecules/Posts";
import Information from "src/components/molecules/Profile/Infomation";
import Introduce from "src/components/molecules/Profile/Introduce";

const ProfilePage = () => {
  const { mode } = useColorScheme();

  const user = {
    fullName: "Cường",
    imageUrl: "./img/avatar.png",
    backgroundUrl: "./img/avatar.png",
    gender: "Nam",
    birthday: "20/10/1999",
    description: "Hello, I'm Cường",
  };

  return (
    <div className="">
      <div className={`h-full w-full shadow ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}>
        <Information user={user} />
      </div>

      <div className="mx-auto mt-6 h-full w-full grid-cols-3 gap-4 px-2 md:px-6 lg:grid xl:max-w-screen-xl xl:px-24 2xl:max-w-screen-2xl 2xl:px-52">
        <div className="col-span-1">
          <Introduce />
        </div>

        <div className="col-span-2 flex w-full flex-col gap-4 ">
          <InputBox />

          <Posts />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
