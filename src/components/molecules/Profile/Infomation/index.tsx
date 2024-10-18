import React, { useState } from "react";
import { useColorScheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Image, Upload } from "antd";
import IconCustomize from "src/components/atoms/Icons";
import EditProfile from "../Edit";

interface Props {
  user: {
    fullName: string;
    imageUrl: string;
    backgroundUrl: string;
    gender: string;
    birthday: string;
    description: string;
  };
}
const Information = (props: Props) => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const uploadProps = {
    showUploadList: false,
    beforeUpload: (file: any) => {
      console.log(file);

      return false;
    },
  };

  return (
    <div className={`mx-auto -mt-2 max-w-6xl rounded-md ${mode === "light" ? "bg-white " : "bg-neutral-800"}`}>
      <div
        className="relative h-[15rem] max-h-[28.75rem] w-full rounded-lg bg-cover bg-center bg-no-repeat xl:h-[30rem]"
        style={{
          backgroundImage: props.user?.backgroundUrl
            ? `url(${props.user?.backgroundUrl})`
            : "linear-gradient(to right, #e5e5e5, #f9f9f9)",
        }}
      >
        <div className="absolute -bottom-2 flex w-full items-center justify-center md:bottom-1">
          <div className="absolute bottom-[10px] right-[30px]">
            <Upload {...uploadProps}>
              <Button className="rounded-md bg-neutral-400 px-1 text-neutral-100">
                <IconCustomize name="camera" />

                <p className="hidden md:flex">{t("profile.editcover")}</p>
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      <div className="-mt-10 flex flex-col items-center pb-7 lg:flex-row lg:justify-between">
        <div className="relative mx-auto flex flex-col items-center lg:mx-8 lg:flex-row lg:gap-4">
          <div className="relative z-0 -mt-20 h-[12rem] w-[12rem] rounded-full lg:mt-2">
            <Image
              src={props.user?.imageUrl}
              height={200}
              width={200}
              className="rounded-full border-4 border-primary"
              preview={{
                mask: <div style={{ background: "none" }} />,
              }}
            />

            <Upload {...uploadProps}>
              <Button className="absolute bottom-2 right-1 w-[2rem] cursor-pointer rounded-full bg-gray-200 p-1">
                <IconCustomize name="camera" />
              </Button>
            </Upload>
          </div>

          <div className="mt-4 ml-2 flex flex-col items-center lg:mt-10 lg:items-start">
            <p className="text-[2rem] font-bold ">{props.user?.fullName}</p>

            <button className="cursor-pointer text-sm font-semibold text-gray-400 ">222 {t("home.friends")}</button>

            <Avatar.Group
              max={{
                count: 2,
                style: { color: "#f56a00", backgroundColor: "#fde3cf" },
              }}
              className="mt-2 flex items-center"
            >
              <Avatar>K</Avatar>

              <Avatar>K</Avatar>

              <Avatar>K</Avatar>
            </Avatar.Group>
          </div>
        </div>

        <div className="p-3 md:mx-auto lg:mx-6">
          <Button
            className={`w-full rounded-md px-3 ${mode === "light" ? "bg-gray-100 " : "bg-neutral-700"}`}
            onClick={() => setIsOpenEdit(true)}
          >
            <p className="text-lg font-normal">{t("profile.editprofile")} </p>
          </Button>
        </div>
      </div>

      <EditProfile open={isOpenEdit} onCancel={() => setIsOpenEdit(false)} />
    </div>
  );
};

export default Information;
