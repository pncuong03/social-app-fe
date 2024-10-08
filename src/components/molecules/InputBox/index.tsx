import React, { useState } from "react";
import { Button } from "antd";
import { useColorScheme } from "@mui/material";
import CreateBox from "./CreateBox/CreateBox";

const InputBox = () => {
  const { mode } = useColorScheme();
  const [isVisiable, setIsVisiable] = useState(false);

  const user = {
    fullName: "Cường",
    imageUrl: "./img/avatar.png",
  };

  return (
    <div
      className={`flex h-max w-full flex-col rounded-lg ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-4 shadow-md`}
    >
      <div className={`mb-2 flex items-center space-x-2 border-b pb-3 ${"border-gray-200"}`}>
        <div className="h-12 w-12">
          <img src="./img/avatar.png" className="h-full w-full rounded-full" alt="dp" />
        </div>

        <button
          className={`h-12 flex-grow rounded-full ${
            mode === "light" ? "bg-gray-100" : "bg-neutral-700"
          } pl-5 text-left font-normal text-gray-400 `}
          onClick={() => setIsVisiable(true)}
        >
          Cường, bạn đang nghĩ gì thế ?
        </button>
      </div>

      <div className="mb-1 flex justify-between text-sm">
        <Button className="gap-2 rounded-md">
          <p className="font-semibold">Youtube</p>
        </Button>

        <Button className="gap-2 rounded-md">
          <p className="font-semibold">Ảnh</p>
        </Button>

        <Button className="hidden gap-2 rounded-md md:flex">
          <p className="font-semibold">Cảm thây</p>
        </Button>
      </div>

      <CreateBox
        open={isVisiable}
        onCancel={() => setIsVisiable(false)}
        fullName={user.fullName}
        imageUrl={user.imageUrl}
      />
    </div>
  );
};

export default InputBox;
