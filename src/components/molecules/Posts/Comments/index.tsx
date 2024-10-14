import React, { useState } from "react";
import { Button, Spin } from "antd";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  comments: {
    id: string;
    imageUrl: string;
    fullName: string;
    comment: string;
  }[];
}

const Comments = (props: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAddComment = () => {
    if (content.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setContent("");
      }, 2000);
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto  md:max-h-[450px] xl:max-h-[600px]">
      <div className="mt-4 flex flex-col gap-2">
        {props.comments?.map((comment) => (
          <div key={comment.id} className="pb-2">
            <div className="flex items-center gap-2 pl-2">
              <img src={comment.imageUrl} alt={comment.fullName} className="h-10 w-10 rounded-full" />

              <div className="rounded-2xl bg-[#E8E8E8] p-2">
                <p className="text-sm font-bold">{comment.fullName}</p>

                <p className="text-sm">{comment.comment}</p>
              </div>

              <PopconfirmCustomize title="Bạn muốn xóa bình luận này không?" icon={null} okText="Xoa" cancelText="Huy">
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
          className="h-14 w-full resize-none rounded-2xl border bg-[#F8F8F8] p-3 outline-none focus:border-none"
          placeholder={"Write a comment..."}
          value={content}
          onChange={handleContentChange}
          disabled={loading}
        />

        <button className="border-none bg-white shadow-none" onClick={handleAddComment} disabled={loading}>
          {loading ? <Spin /> : <IconCustomize name="send" size={25} />}
        </button>
      </div>
    </div>
  );
};

export default Comments;
