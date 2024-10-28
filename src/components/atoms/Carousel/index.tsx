import React from "react";
import { Carousel } from "antd";

interface Props {
  images: string[];
}

const CarouselCustomize = (props: Props) => {
  return (
    <div className="container mx-auto">
      {props.images && (
        <Carousel arrows infinite={false} dots={false} draggable={true}>
          {props.images.map((image, index) => (
            <div
              key={index}
              className="flex h-52 cursor-pointer items-center justify-center focus:outline-none md:h-96 "
            >
              <img src={image} className="h-full w-full rounded-xl object-cover" />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselCustomize;
