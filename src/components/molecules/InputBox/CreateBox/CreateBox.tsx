import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, GetProp, Image, Select, Spin, Upload, UploadFile, UploadProps } from "antd";
import ModalCustomize from "src/components/atoms/Modal";
import IconCustomize from "src/components/atoms/Icons";

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
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState(t("PUBLIC"));
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setPrivacy(value.value);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChanges: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async () => {
    if (content.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setContent("");
      }, 2000);
    }

    const payload = {
      fullName: props.fullName,
      content,
      privacy,
      images: fileList.map((file) => file.url || file.response?.url || ""),
    };

    console.log(payload);
  };

  const uploadButton = (
    <button className="h-full w-full" type="button">
      <IconCustomize name="plus" />

      <div className="mt-2">{t("home.addimage")}</div>
    </button>
  );

  return (
    <ModalCustomize title={t("home.postarticle")} open={props.open} onCancel={props.onCancel}>
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
          placeholder={t("home.whatmind")}
          className="mt-2 w-full resize-none rounded-md border-none p-2 shadow-none outline-none"
        />

        <div className="mt-4 flex flex-col items-center">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChanges}
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
          {loading ? (
            <Spin />
          ) : (
            <Button
              className="w-full"
              color="default"
              variant="solid"
              type="default"
              onClick={handleSubmit}
              disabled={!content.trim() || loading}
            >
              {t("home.post")}
            </Button>
          )}
        </div>
      </div>
    </ModalCustomize>
  );
};

export default CreateBox;
