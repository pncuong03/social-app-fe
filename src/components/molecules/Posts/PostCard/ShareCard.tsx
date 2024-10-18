import React from "react";
import CarouselCustomize from "src/components/atoms/Carousel";
import { useColorScheme } from "@mui/material";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  isShare: any;
}

const ShareCard = (props: Props) => {
  const { mode } = useColorScheme();

  console.log(props.isShare);

  return (
    <div className={`flex h-max flex-col rounded-2xl border-2 ${mode === "light" ? "bg-white" : "bg-black-300"} `}>
      <div className="flex flex-col gap-2">
        <CarouselCustomize images={props.isShare.imgUrls} />
      </div>

      <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12">
            <img src={props.isShare?.imgUrl} className="h-full w-full rounded-full" alt="dp" />
          </div>

          <div className="flex flex-grow flex-col">
            <p className="text-black text-lg font-medium">{props.isShare.username}</p>

            <div className="flex gap-3">
              <span className="text-xs font-medium text-gray-400">{props.isShare.time}</span>

              <IconCustomize name="pubic" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-md my-2 max-h-24 overflow-hidden text-ellipsis break-words px-4 font-light">
        {props.isShare.content}
      </p>
    </div>
  );
};

export default ShareCard;
