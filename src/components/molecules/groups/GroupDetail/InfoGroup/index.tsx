import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Upload } from "antd";
import IconCustomize from "src/components/atoms/Icons";
import { selectInfoGroup, selectMemberGroup } from "src/slices/groups/selector";
import { useAppSelector } from "src/app/appHooks";

const InfoGroup = () => {
  const { t } = useTranslation();

  const membersgroup = useAppSelector(selectMemberGroup.getMemberGroup);

  const infogroup = useAppSelector(selectInfoGroup.getInfoGroup);

  const uploadProps = {
    showUploadList: false,
    beforeUpload: (file: any) => {
      console.log(file);

      return false;
    },
  };

  return (
    <div className="mx-auto -mt-2 max-w-7xl rounded-md bg-white">
      <div
        className="relative h-[15rem] max-h-[28.75rem] w-full rounded-lg bg-cover bg-center bg-no-repeat xl:h-[30rem]"
        // style={{
        //   backgroundImage: props.group?.backgroundUrl
        //     ? `url(${props.user?.backgroundUrl})`
        //     : "linear-gradient(to right, #e5e5e5, #f9f9f9)",
        // }}
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

      <div className="flex flex-col items-center pb-7 lg:flex-row lg:justify-between">
        <div className="relative mx-auto flex flex-col items-center lg:mx-8 lg:flex-row lg:gap-4">
          <div className="mt-4 ml-2 flex flex-col items-center lg:mt-10 lg:items-start">
            <p className="text-[2rem] font-bold ">{infogroup?.name}</p>

            <button className="flex cursor-pointer items-center gap-2 text-gray-400 ">
              <IconCustomize name="private" size={15} />

              <p className="font-light">Nhóm riêng tư . </p>

              <p className="font-normal">{infogroup?.memberCount + " thành viên"}</p>
            </button>

            <Avatar.Group
              max={{
                style: { color: "#f56a00", backgroundColor: "#fde3cf" },
              }}
              className="mt-2 flex items-center gap-1"
            >
              {membersgroup.map((friend: any) => {
                return <Avatar key={friend.id} src={friend.imageUrl} alt={friend.fullName} size={45} />;
              })}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoGroup;
