import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { AppDispatch } from "src/app/store";
import CarouselCustomize from "src/components/atoms/Carousel";
import IconCustomize from "src/components/atoms/Icons";
import { Collapse } from "@mui/material";
import Comments from "../Comments";
import ShareBox from "../Share";
import ShareCard from "./ShareCard";
import { deletePost, likePost, unLikePost } from "src/slices/posts/postSlice";
import clsx from "clsx";
import { selectUserInfo } from "src/slices/login/selector";
import { useAppSelector } from "src/app/appHooks";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import TimeCustomize from "src/const/dateFormat";
import PopoverCustomize from "src/components/atoms/Popover";
// import PostDetail from "../PostDetail";

interface Props {
  id: number;
  fullName: string;
  createdAt: string;
  imgUrl: string;
  content: string;
  imgUrls: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  hasLike: boolean;
  sharePost?: object;
}

const PostCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);

  const userInfo = useAppSelector(selectUserInfo.getUserInfo);

  const handleLike = () => {
    if (props.hasLike) {
      dispatch(unLikePost(props.id));
    } else {
      dispatch(likePost(props.id));
    }
  };

  const handleDeletePost = () => {
    dispatch(deletePost(props.id));
  };

  const menuItems = () => (
    <div className="flex flex-col gap-2">
      <button className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
        <IconCustomize name="comment" size={25} />

        <p className="text-lg ">Sua bai viet</p>
      </button>
    </div>
  );

  return (
    <div className="flex h-max flex-col rounded-lg bg-white">
      <div className="flex justify-between px-4 pt-4">
        <button
          onClick={() => navigate(`/${props.fullName}`, { state: { id: props.id } })}
          className="flex items-center space-x-4"
        >
          <div className="h-12 w-12">
            <img src={props?.imgUrl} className="h-full w-full rounded-full" alt="dp" />
          </div>

          <div className="flex flex-grow flex-col">
            <p className="text-black text-lg font-medium">{props.fullName}</p>

            <div className="flex gap-3">
              <span className="text-xs font-medium text-gray-400">
                <TimeCustomize time={props.createdAt} />
              </span>

              <IconCustomize name="public" color="text-gray-400" />
            </div>
          </div>
        </button>

        <div className="flex p-2">
          <PopoverCustomize content={menuItems()} placement="bottom" arrow={true}>
            <Button className="border-none shadow-none">
              <IconCustomize name="ellipsis" />
            </Button>
          </PopoverCustomize>

          <PopconfirmCustomize
            title={t("home.deletepost")}
            icon={null}
            okText={t("friend.delete")}
            cancelText={t("friend.cancel")}
            onConfirm={handleDeletePost}
          >
            <Button className="border-none shadow-none">
              <IconCustomize name="close" />
            </Button>
          </PopconfirmCustomize>
        </div>
      </div>

      <p className="text-md my-2 max-h-24 overflow-hidden text-ellipsis break-words px-4 font-light">{props.content}</p>

      {props.sharePost ? (
        <div className="px-4">
          <ShareCard isShare={props.sharePost} />
        </div>
      ) : (
        <CarouselCustomize images={props.imgUrls} />
      )}

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
          <Button
            className={clsx("border-none shadow-none", {
              "text-primary": props.hasLike,
              "text-black-100": !props.hasLike,
            })}
            onClick={handleLike}
          >
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
        <Comments isOpen={isOpenComment} postId={props.id} />
      </Collapse>

      {/* <PostDetail open={isOpenShare} onCancel={() => setIsOpenShare(false)} postId={props.id} /> */}

      <ShareBox
        open={isOpenShare}
        onCancel={() => setIsOpenShare(false)}
        postId={props.id}
        fullName={userInfo.fullName}
        imageUrl={userInfo.imageUrl}
      />
    </div>
  );
};

export default PostCard;
