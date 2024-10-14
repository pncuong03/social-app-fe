import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import CarouselCustomize from "src/components/atoms/Carousel";
import { Collapse, useColorScheme } from "@mui/material";
import Comments from "../Comments";
import IconCustomize from "src/components/atoms/Icons";
import ShareBox from "../Share";

interface Props {
  fullName: string;
  createdAt: string;
  imgUrl: string;
  content: string;
  imgUrls: string[];
  likeCount: string;
  commentCount: string;
  shareCount: string;
}

const PostCard = (props: Props) => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);

  const user = {
    fullName: "Cường",
    imageUrl: "./img/avatar.png",
  };

  const comments = [
    {
      id: "1",
      imageUrl: "https://picsum.photos/200/300",
      fullName: "John Doe",
      comment: "Lorem ipsum dolor sit amet, sd adipiscing elit",
    },
    {
      id: "2",
      imageUrl: "https://picsum.photos/200/300",
      fullName: "John Doe",
      comment: "Lorem ipsum dolor sit amet, sds adipiscing elit",
    },
    {
      id: "3",
      imageUrl: "https://picsum.photos/200/300",
      fullName: "John Doe",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  return (
    <div className={`flex h-max flex-col rounded-lg ${mode === "light" ? "bg-white" : "bg-black-300"} shadow-md`}>
      <div className="flex justify-between px-4 pt-4">
        <Link to="/" className="flex items-center space-x-4">
          <div className="h-11 w-12">
            <img src={props?.imgUrl} className="h-full w-full rounded-full" alt="dp" />
          </div>

          <div className="flex flex-grow flex-col">
            <p className="text-black text-lg font-semibold">{props.fullName}</p>

            <div className="flex gap-3">
              <span className="text-xs text-gray-400">{props.createdAt}</span>

              <IconCustomize name="pubic" />
            </div>
          </div>
        </Link>

        <div className="flex p-2">
          <Button className="border-none shadow-none">
            <IconCustomize name="ellipsis" />
          </Button>

          <Button className="border-none shadow-none">
            <IconCustomize name="close" />
          </Button>
        </div>
      </div>

      <div className="my-2 flex flex-col gap-2">
        <p className="text-md max-h-24 overflow-hidden text-ellipsis break-words px-4 font-normal">{props.content}</p>

        <CarouselCustomize images={props.imgUrls} />
      </div>

      <div className="flex w-full flex-col space-y-2 p-3">
        <div className={`flex items-center justify-between border-b-[1px] border-gray-200 pb-2 text-sm`}>
          <div className="flex items-center">
            <div className="flex items-center">
              <button className="ml-1 flex items-center gap-2">
                <IconCustomize name="heart" size={25} color="red" />

                <p className="font-inherit text-gray-400">{props.likeCount}</p>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <button className="font-inherit text-gray-400">{props.commentCount} bình luận</button>

            <button className="font-inherit text-gray-400">{props.shareCount} chia sẻ</button>
          </div>
        </div>

        <div className="flex justify-between pt-2 text-sm font-semibold ">
          <Button className="border-none shadow-none">
            <IconCustomize name="like" size={20} /> 
            
            {t("home.like")}
          </Button>

          <Button className="border-none shadow-none" onClick={() => setIsOpenComment((prev) => !prev)}>
            <IconCustomize name="comment" size={20} /> 
            
            {t("home.comment")}
          </Button>

          <Button className="border-none shadow-none" onClick={() => setIsOpenShare(true)}>
            <IconCustomize name="share" size={20} /> 
            
            {t("home.share")}
          </Button>
        </div>
      </div>

      <Collapse in={isOpenComment} timeout="auto">
        <Comments comments={comments} />
      </Collapse>

      <ShareBox
        open={isOpenShare}
        onCancel={() => setIsOpenShare(false)}
        fullName={user.fullName}
        imageUrl={user.imageUrl}
      />
    </div>
  );
};

export default PostCard;
