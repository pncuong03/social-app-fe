import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, GetProp, Image, Select, Upload, UploadFile, UploadProps } from "antd";
import { toast } from "react-toastify";
import ModalCustomize from "src/components/atoms/Modal";
import IconCustomize from "src/components/atoms/Icons";
import { getName } from "src/const";
import { AppDispatch } from "src/app/store";
import { createPosts } from "src/slices/posts/postSlice";

interface Props {
  fullName: string;
  imageUrl: string;
  open?: boolean;
  onCancel?: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateBox = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [state, setState] = useState("PUBLIC");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setState(value.value);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleCreate = async () => {
    if (content.trim()) {
      setLoading(true);

      const formData = new FormData();
      const createPostInputString = JSON.stringify({ content, state });

      formData.append("createPostInputString", createPostInputString);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      dispatch(createPosts(formData));

      setTimeout(() => {
        toast.success(t("home.postsucces"));
        setLoading(false);
        setContent("");
        setState("PUBLIC");
        setFileList([]);

        if (props.onCancel) {
          props.onCancel();
        }
      }, 3000);
    }
  };

  const uploadButton = (
    <button className="h-full w-full" type="button">
      <IconCustomize name="plus" />

      <div className="mt-2">{t("home.addimage")}</div>
    </button>
  );

  return (
    <ModalCustomize title={t("home.postarticle")} open={props.open} onCancel={props.onCancel} loading={loading}>
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

        <div className="mt-4 flex flex-col items-center">
          <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleFileChange}>
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>

          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            className="w-full"
            color="default"
            variant="solid"
            type="default"
            onClick={handleCreate}
            disabled={!content.trim() || loading}
          >
            {t("home.post")}
          </Button>
        </div>
      </div>
    </ModalCustomize>
  );
};

export default CreateBox;
