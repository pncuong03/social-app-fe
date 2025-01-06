import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalCustomize from "src/components/atoms/Modal";
import IconCustomize from "src/components/atoms/Icons";
import { AppDispatch } from "src/app/store";
import { sharePost } from "src/slices/posts/postSlice";
import { getName } from "src/const";

interface Props {
  fullName: string;
  imageUrl: string;
  postId: number;
  open?: boolean;
  onCancel?: () => void;
}

const SharePost = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [state, setState] = useState("PUBLIC");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setState(value.value);
  };

  const handleShare = async () => {
    const postId = props.postId;

    setLoading(true);
    dispatch(sharePost({ postId, params: { content, state } }));

    setTimeout(() => {
      toast.success(t("home.shareSuccess"));
      setLoading(false);
      setContent("");
      setState("PUBLIC");

      if (props.onCancel) {
        props.onCancel();
      }
    }, 1000);
  };

  return (
    <ModalCustomize title={t("home.shareartice")} open={props.open} onCancel={props.onCancel} loading={loading}>
      <div className="mb-2">
        <div className="my-4 flex items-center gap-3">
          <div className="rounded-full ">
            <img src={props?.imageUrl} className="h-14 w-14 rounded-full" />
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="text-lg font-semibold">{props?.fullName}</p>

            <Select
              labelInValue
              defaultValue={{
                value: "PUBIC",
                label: (
                  <span className="flex items-center justify-between">
                    <p>{t("home.public")}</p>

                    <IconCustomize name="public" />
                  </span>
                ),
              }}
              style={{ width: 110 }}
              onChange={handleChange}
              suffixIcon={null}
              options={[
                {
                  value: "PUBIC",
                  label: (
                    <span className="flex items-center justify-between">
                      <p>{t("home.public")}</p>

                      <IconCustomize name="public" />
                    </span>
                  ),
                },
                {
                  value: "PRIVATE",
                  label: (
                    <span className="flex items-center justify-between">
                      <p>{t("home.private")}</p>

                      <IconCustomize name="private" />
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={getName(props.fullName) + t("home.whatmind")}
          className="mt-2 w-full resize-none rounded-md border-none p-2 shadow-none outline-none"
        />

        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-full bg-gradient-to-r from-teal-400 to-blue-500 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:from-teal-500 hover:to-blue-600 focus:outline-none"
            onClick={handleShare}
          >
            {t("home.share")}
          </Button>
        </div>
      </div>
    </ModalCustomize>
  );
};

export default SharePost;
