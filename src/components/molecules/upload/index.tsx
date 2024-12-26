import React, { useState } from "react";
import { Button, Image } from "antd";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { onCreateImage } from "src/apis/post";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  imageUrl: string;
  onChange: (url: string) => void;
  isCover?: boolean;
  inputId: string;
}

const ImageUploader = (props: Props) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);

  const beforeUpload = async (file: File) => {
    try {
      const data = new FormData();

      data.append("images", file);

      setUploading(true);
      const response = await onCreateImage(data);

      if (response && response.data) {
        props.onChange(response.data);
      }
    } catch (error) {
      toast.error(t("home.uploadError"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`my-4 flex flex-col items-center justify-center gap-3 `}>
      {props.isCover ? (
        <div className="relative h-48 w-full">
          <Image
            src={props.imageUrl}
            alt="Cover Image"
            className="rounded-md object-cover"
            height={150}
            width={300}
            preview={{
              mask: <div style={{ background: "none" }} />,
            }}
          />
        </div>
      ) : (
        <Image
          src={props.imageUrl}
          height={150}
          width={150}
          className="rounded-full border-4 border-primary"
          preview={{
            mask: <div style={{ background: "none" }} />,
          }}
        />
      )}

      <Button
        className="absolute bottom-[10px] right-[170px] flex items-center gap-2 rounded-xl bg-neutral-400 px-1 text-neutral-100"
        onClick={() => document.getElementById(props.inputId)?.click()}
        disabled={uploading}
      >
        <IconCustomize name="camera" />
      </Button>

      <input
        id={props.inputId}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (file) await beforeUpload(file);
        }}
      />
    </div>
  );
};

export default ImageUploader;
