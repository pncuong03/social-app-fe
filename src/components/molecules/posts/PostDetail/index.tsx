import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ModalCustomize from "src/components/atoms/Modal";
import PostCard from "../PostCard/PostCard";
import { fetchDetailPost } from "src/slices/posts/postSlice";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/app/appHooks";
import { selectPost } from "src/slices/posts/selector";
import { getName } from "src/const";

interface Props {
  open: boolean;
  onCancel: () => void;
  postId: number;
}

const PostDetail = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const postDetail = useAppSelector(selectPost.getPostDetail);

  useEffect(() => {
    if (props.open) {
      dispatch(fetchDetailPost(props.postId));
    }
  }, [props.postId, props.open, dispatch]);

  console.log("postDetail", postDetail);

  return (
    <ModalCustomize
      open={props.open}
      onCancel={props.onCancel}
      title={t("home.articleby") + getName(postDetail.fullName)}
      size={700}
    >
      <div className="flex flex-col">
        <PostCard
          key={postDetail.id}
          id={postDetail.id}
          content={postDetail.content}
          fullName={postDetail.fullName}
          imgUrl={postDetail.imageUrl}
          createdAt={postDetail.createdAt}
          imgUrls={postDetail?.imageUrls}
          shareCount={postDetail?.shareCount}
          likeCount={postDetail.likeCount}
          commentCount={postDetail.commentCount}
          hasLike={postDetail.hasLike}
          sharePost={postDetail.sharePost}
        />
      </div>
    </ModalCustomize>
  );
};

export default PostDetail;
