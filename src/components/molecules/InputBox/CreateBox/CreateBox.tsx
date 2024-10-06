import React, { useState } from "react";
import { Button, GetProp, Image, Select, Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalCustomize from "src/components/atoms/Modal";
import { MdPrivateConnectivity, MdPublic } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

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
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("Công khai");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
    const payload = {
      fullName: props.fullName,
      content: content,
      privacy: privacy,
      images: fileList.map((file) => file.url || file.response?.url || ""),
    };

    console.log(payload);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />

      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <ModalCustomize title="Đăng bài viết" open={props.open} onCancel={props.onCancel}>
      <div className="mb-2 border-t">
        <div className="my-4 flex items-center gap-3">
          <div className="rounded-full ">
            <img src={props?.imageUrl} className="h-14 w-14 rounded-full" />
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="text-lg font-semibold">{props?.fullName}</p>

            <Select
              labelInValue
              defaultValue={{
                value: "Công khai",
                label: (
                  <span className="flex items-center justify-between">
                    <p>PUBLIC</p>

                    <MdPublic />
                  </span>
                ),
              }}
              style={{ width: 110 }}
              onChange={handleChange}
              suffixIcon={null}
              options={[
                {
                  value: "Công khai",
                  label: (
                    <span className="flex items-center justify-between">
                      <p>PUBLIC</p>

                      <MdPublic />
                    </span>
                  ),
                },
                {
                  value: "Riêng tư",
                  label: (
                    <span className="flex items-center justify-between">
                      <p>PRIVATE</p>

                      <MdPrivateConnectivity />
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          autoSize={{ minRows: 3, maxRows: 5 }}
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

        <div className="mt-4 flex justify-end">
          <Button color="default" variant="solid" onClick={handleSubmit}>
            Đăng
          </Button>
        </div>
      </div>
    </ModalCustomize>
  );
};

export default CreateBox;
