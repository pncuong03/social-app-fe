import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, GetProp, Image, Select, Upload, UploadFile, UploadProps } from "antd";
import { AppDispatch } from "src/app/store";
import { getName } from "src/const";
import { State } from "src/types/post";
import { onCreateImage } from "src/apis/post";
import { createPostGroup } from "src/slices/groups/groupSlice";
import { createPosts } from "src/slices/posts/postSlice";
import ModalCustomize from "src/components/atoms/Modal";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  fullName: string;
  imageUrl: string;
  open?: boolean;
  onCancel?: () => void;
  type: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreatePost = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [state, setState] = useState("PUBLIC");
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, seImageUrls] = useState<string[]>([]);
  const { groupId } = location.state || {};

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleStateChange = (value: { value: string; label: React.ReactNode }) => {
    setState(value.value);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);

    const currentFileUids = fileList.map((file) => file.uid);

    seImageUrls((prevImageUrls) =>
      prevImageUrls.filter((url, index) => currentFileUids.includes(fileList[index]?.uid))
    );
  };

  const handleCreate = async () => {
    if (content.trim()) {
      setLoading(true);

      if (props.type === "USER") {
        await dispatch(createPosts({ content, state, imageUrls }));
      } else {
        await dispatch(createPostGroup({ content, groupId, imageUrls }));
      }

      setTimeout(() => {
        toast.success(t("home.postsucces"));
        setLoading(false);
        setContent("");
        setState("PUBLIC");
        setFileList([]);
        seImageUrls([]);

        if (props.onCancel) {
          props.onCancel();
        }
      }, 3000);
    }
  };

  const beforeUpload = async (file: FileType) => {
    try {
      const data = new FormData();

      data.append("images", file);

      const response = await onCreateImage(data);

      if (response && response.data) {
        seImageUrls((prevList) => [...prevList, response.data]);
      }
    } catch (error) {
      toast.error(t("home.uploadError"));
    }

    return false;
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

            {props.type === "USER" && (
              <Select
                labelInValue
                defaultValue={{
                  value: State.PUBLIC,
                  label: (
                    <span className="flex items-center justify-between">
                      <p>{t("home.public")}</p>

                      <IconCustomize name="public" />
                    </span>
                  ),
                }}
                style={{ width: 110 }}
                onChange={handleStateChange}
                suffixIcon={null}
                options={[
                  {
                    value: State.PUBLIC,
                    label: (
                      <span className="flex items-center justify-between">
                        <p>{t("home.public")}</p>

                        <IconCustomize name="public" />
                      </span>
                    ),
                  },
                  {
                    value: State.PRIVATE,
                    label: (
                      <span className="flex items-center justify-between">
                        <p>{t("home.private")}</p>

                        <IconCustomize name="private" />
                      </span>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={getName(props.fullName) + t("home.whatmind")}
          className="mt-2 w-full resize-none rounded-md border-none p-2 shadow-none outline-none"
        />

        <div className="mt-4 flex flex-col items-center">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleFileChange}
          >
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
            className="w-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:from-teal-500 hover:to-blue-600 focus:outline-none"
            size="large"
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

export default CreatePost;
