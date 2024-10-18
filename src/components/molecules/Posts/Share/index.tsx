import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import ModalCustomize from "src/components/atoms/Modal";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  fullName: string;
  imageUrl: string;
  open?: boolean;
  onCancel?: () => void;
}

const ShareBox = (props: Props) => {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("PUBLIC");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setPrivacy(value.value);
  };

  const handleSubmit = async () => {
    const payload = {
      fullName: props.fullName,
      content,

      privacy,
    };

    console.log(payload);
  };

  return (
    <ModalCustomize title={t("home.shareartice")} open={props.open} onCancel={props.onCancel}>
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

        <div className="mt-4 flex justify-end">
          <Button color="default" variant="solid" onClick={handleSubmit}>
            {t("home.share")}
          </Button>
        </div>
      </div>
    </ModalCustomize>
  );
};

export default ShareBox;
