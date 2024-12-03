import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import axios from "axios";
// import { useTranslation } from "next-i18next";
import { Button, GetProp, Image, Select, Upload, UploadFile, UploadProps } from "antd";
import { AppDispatch } from "src/app/store";
import IconCustomize from "src/components/atoms/Icons";
import ModalCustomize from "src/components/atoms/Modal";
import { getName } from "src/const";
import { State } from "src/types/post";
import { useAppSelector } from "src/app/appHooks";
import { selectPost } from "src/slices/posts/selector";
import { editPost, fetchDetailPost } from "src/slices/posts/postSlice";

interface Props {
  open?: boolean;
  onCancel?: () => void;
  postId: number;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditPost = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [state, setState] = useState("PUBLIC");
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const postDetail = useAppSelector(selectPost.getPostDetail);

  useEffect(() => {
    if (props.open) {
      dispatch(fetchDetailPost(props.postId));
    }
  }, [props.postId, props.open]);

  useEffect(() => {
    if (postDetail) {
      setContent(postDetail.content);
      setState(postDetail.state);
      setImageUrls(postDetail.imageUrls);

      setFileList(
        (postDetail.imageUrls || []).map((url: any) => ({
          url,
        }))
      );
    }
  }, [postDetail]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
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

    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((url, index) => currentFileUids.includes(fileList[index]?.uid))
    );
  };

  const handleEdit = async () => {
    if (content.trim()) {
      setLoading(true);

      dispatch(editPost({ postId: props.postId, params: { content, state, imageUrls } }));

      setTimeout(() => {
        // toast.success(t("home.postsucces"));
        setLoading(false);

        if (props.onCancel) {
          props.onCancel();
        }
      }, 3000);
    }
  };

  const beforeUpload = async (file: FileType) => {
    const data = new FormData();

    data.append("images", file);

    const response = await axios.post("http://localhost:8088/api/v1/upload/upload-image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response && response.data) {
      setImageUrls((prevList) => [...prevList, response.data]);
    }

    return false;
  };

  const uploadButton = (
    <button className="h-full w-full" type="button">
      <IconCustomize name="plus" />

      {/* <div className="mt-2">{t("home.addimage")}</div> */}
    </button>
  );

  return (
    <ModalCustomize title="Edit Post" open={props.open} onCancel={props.onCancel}>
      <div className="mb-2">
        <div className="my-4 flex items-center gap-3">
          <div className="rounded-full ">
            <img src={postDetail?.imageUrl} className="h-14 w-14 rounded-full" />
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="text-lg font-semibold">{postDetail?.fullName}</p>

            <Select
              labelInValue
              defaultValue={{
                value: State.PUBLIC,
                label: (
                  <span className="flex items-center justify-between">
                    {/* <p>{t("home.public")}</p> */}

                    <IconCustomize name="public" />
                  </span>
                ),
              }}
              style={{ width: 110 }}
              onChange={handleChange}
              suffixIcon={null}
              options={[
                {
                  value: State.PUBLIC,
                  label: (
                    <span className="flex items-center justify-between">
                      {/* <p>{t("home.public")}</p> */}

                      <IconCustomize name="public" />
                    </span>
                  ),
                },
                {
                  value: State.PRIVATE,
                  label: (
                    <span className="flex items-center justify-between">
                      {/* <p>{t("home.private")}</p> */}

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
          // placeholder={getName(postDetail.fullName) + t("home.whatmind")}
          placeholder={getName(postDetail.fullName)}
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
            onClick={handleEdit}
            disabled={!content.trim() || loading}
          >
            {/* {t("home.post")} */}
          </Button>
        </div>
      </div>
    </ModalCustomize>
  );
};

export default EditPost;
