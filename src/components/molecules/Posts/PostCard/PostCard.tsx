import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AiOutlineEllipsis, AiOutlineClose, AiOutlineLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { MdPublic, MdOutlineModeComment } from "react-icons/md";
import { TfiShare } from "react-icons/tfi";

interface Props {
  fullName: string;
  createdAt: string;
  imgUrl: string;
  content: string;
  imgUrls: string;
  likeCount: string;
  commentCount: string;
  shareCount: string;
}
const PostCard = (props: Props) => {
  return (
    <div className="flex h-max flex-col rounded-lg bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center space-x-4">
          <div className="h-11 w-12">
            <img src={props?.imgUrl} className="h-full w-full rounded-full" alt="dp" />
          </div>

          <div className="flex flex-grow flex-col">
            <p className="text-black text-lg font-semibold">{props.fullName}</p>

            <div className="flex gap-3">
              <span className="text-xs text-gray-400">{props.createdAt}</span>

              <MdPublic />
            </div>
          </div>
        </Link>

        <div className="flex gap-3 p-4">
          <button>
            <AiOutlineEllipsis />
          </button>

          <button>
            <AiOutlineClose />
          </button>
        </div>
      </div>

      <div className="my-4 flex flex-col gap-2">
        <p className="text-md max-h-24 overflow-hidden text-ellipsis break-words font-normal">{props.content}</p>

        <img src={props.imgUrls} className="max-h-96 w-full rounded-xl object-cover" />
      </div>

      <div className="flex w-full flex-col space-y-2 p-3">
        <div className={`flex items-center justify-between border-b-[1px] border-gray-200 pb-2 text-sm`}>
          <div className="flex items-center">
            <div className="flex items-center">
              <button className="ml-1 flex items-center gap-2">
                <FcLike size={25} />

                <p className="font-inherit text-gray-400">{props.likeCount}</p>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <button className="font-inherit text-gray-400">{props.commentCount} bình luận</button>

            <button className="font-inherit text-gray-400">{props.shareCount} chia sẻ</button>
          </div>
        </div>

        <div className="flex justify-between pt-2 text-sm font-semibold  ">
          <Button className="border-none">
            <AiOutlineLike size={30} /> Thích
          </Button>

          <Button className="border-none">
            <MdOutlineModeComment size={30} /> Bình luận
          </Button>

          <Button className="border-none">
            <TfiShare size={25} /> Chia sẻ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
