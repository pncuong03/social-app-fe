import React, { useState } from "react";
import { Button } from "antd";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import Loading from "src/components/atoms/Loading";
import ModalCustomize from "src/components/atoms/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    // setLoading(true);
    // Simulate loading time, e.g., fetching data
    // setTimeout(() => {
    //   // setLoading(false);
    //   setIsModalOpen(true);
    // }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <div className="max-h-96 overflow-y-auto md:max-h-[450px] xl:max-h-[600px]">
      <div className="mt-4 flex flex-col gap-2">
        {props.comments?.map((comment) => (
          <div key={comment.id} className="pb-2">
            <div className="flex items-center gap-2 pl-2">
              <img src={comment.imageUrl} alt={comment.fullName} className="h-10 w-10 rounded-full" />

              <div className="rounded-2xl bg-[#E8E8E8] p-2">
                <p className="text-sm font-bold">{comment.fullName}</p>

                <p className="text-sm">{comment.comment}</p>
              </div>

              <button className=" p-3 hover:visible group-hover:block" onClick={showModal}>
                <AiOutlineEllipsis />
              </button>
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
          {loading ? <Loading /> : <BsSend size={30} />}
        </button>
      </div>

      <ModalCustomize title="Ban có muốn xóa bình luận này không?" open={isModalOpen} closable={false} size={400}>
        <div className="flex items-center justify-end gap-3">
          <Button color="danger" variant="solid">
            Xác nhận
          </Button>

          <Button color="default" variant="solid" onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </ModalCustomize>
    </div>
  );
};

export default Comments;
