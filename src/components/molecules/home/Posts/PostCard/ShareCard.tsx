import React from "react";
import CarouselCustomize from "src/components/atoms/Carousel";
import TimeCustomize from "../../../../../const/dateFormat";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  isShare: any;
}

const ShareCard = (props: Props) => {
  return (
    <div className="flex h-max flex-col rounded-2xl border-2 bg-white">
      <div className="flex flex-col gap-2">
        <CarouselCustomize images={props.isShare.imageUrls} />
      </div>

      <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12">
            <img src={props.isShare.imageUrl} className="h-full w-full rounded-full" alt="dp" />
          </div>

          <div className="flex flex-grow flex-col">
            <p className="text-black text-lg font-medium">{props.isShare.fullName}</p>

            <div className="flex gap-3">
              <span className="text-xs font-medium text-gray-400">
                <TimeCustomize time={props.isShare.createdAt} />
              </span>

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
