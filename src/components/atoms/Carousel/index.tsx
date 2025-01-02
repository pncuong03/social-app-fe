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
              className="flex h-52 cursor-pointer items-center justify-center rounded-2xl bg-gray-200 focus:outline-none md:h-96"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="h-full w-full rounded-2xl object-contain"
                loading={index === 0 ? "eager" : "lazy"}
                srcSet={`${image}?w=600&h=400&fit=crop&auto=format 1x, ${image}?w=1200&h=800&fit=crop&auto=format 2x`} // Sử dụng srcset để chọn đúng kích thước hình ảnh
                sizes="(max-width: 600px) 100vw, 50vw" // Chỉ định kích thước hiển thị của hình ảnh
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselCustomize;
