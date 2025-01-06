import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { useTranslation } from "react-i18next";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import IconCustomize from "src/components/atoms/Icons";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import {
  clearDetailPost,
  commentPost,
  decreaseComment,
  deleteComment,
  fetchDetailPost,
} from "src/slices/posts/postSlice";
import { useAppSelector } from "src/app/appHooks";
import { selectPost } from "src/slices/posts/selector";

interface Props {
  postId: number;
  isOpen: boolean;
}

const Comments = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const postDetail = useAppSelector(selectPost.getPostDetail);

  useEffect(() => {
    if (props.isOpen) {
      dispatch(clearDetailPost());
      dispatch(fetchDetailPost(props.postId));
    }
  }, [props.postId, props.isOpen, dispatch]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    const postId = props.postId;

    if (comment.trim()) {
      setLoading(true);

      setTimeout(() => {
        dispatch(commentPost({ postId, comment }));

        setLoading(false);
        setComment("");
      }, 1000);
    }
  };

  const handleDeleteComment = (commentId: any) => {
    dispatch(deleteComment(commentId));
    dispatch(decreaseComment(props.postId));
    dispatch(fetchDetailPost(props.postId));
  };

  return (
    <div className="max-h-96 overflow-y-auto  md:max-h-[450px] xl:max-h-[600px]">
      <div className="mt-4 flex flex-col gap-2">
        {postDetail?.comments?.map((comment: any) => (
          <div key={comment.id} className="pb-2">
            <div className="flex items-center gap-2 pl-2">
              <img src={comment.imageUrl} className="h-10 w-10 rounded-full" />

              <div className="rounded-2xl bg-[#E8E8E8] p-2">
                <p className="text-sm font-bold">{comment.fullName}</p>

                <p className="text-sm">{comment.comment}</p>
              </div>

              <PopconfirmCustomize
                title={t("home.deletecomment")}
                icon={null}
                okText={t("friend.delete")}
                cancelText={t("friend.cancel")}
                onConfirm={() => handleDeleteComment(comment.id)}
              >
                <Button className="border-none p-3 shadow-none">
                  <IconCustomize name="ellipsis" size={20} />
                </Button>
              </PopconfirmCustomize>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3">
        <textarea
          className="h-[50px] w-full resize-none rounded-2xl border bg-[#F8F8F8] p-3 outline-none focus:border-none"
          placeholder={"Write a comment..."}
          value={comment}
          onChange={handleCommentChange}
          disabled={loading}
        />

        <button className="border-none bg-white shadow-none" onClick={handleAddComment} disabled={loading}>
          {loading ? <Spin /> : <IconCustomize name="send" size={30} />}
        </button>
      </div>
    </div>
  );
};

export default Comments;
