import React from "react";
import { Button } from "antd";

const InputBox = () => {
  return (
    <div className={`flex h-max flex-col rounded-lg bg-white p-4 shadow-md`}>
      <div className={`mb-2 flex items-center space-x-2 border-b pb-3 ${"border-gray-200"}`}>
        <div className="h-12 w-12">
          <img src="./img/avatar.png" className="h-full w-full rounded-full" alt="dp" />
        </div>

        <button className={`h-12 flex-grow rounded-full bg-gray-100 pl-5 text-left font-normal text-gray-400 `}>
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
    </div>
  );
};

export default InputBox;
