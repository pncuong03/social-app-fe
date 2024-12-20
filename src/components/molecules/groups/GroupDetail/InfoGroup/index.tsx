import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Upload } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { selectInfoGroup, selectMemberGroup } from "src/slices/groups/selector";
import IconCustomize from "src/components/atoms/Icons";

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
        className={`relative h-[15rem] max-h-[28.75rem] w-full rounded-lg bg-gray-200 bg-center bg-no-repeat xl:h-[30rem]`}
        style={infogroup?.imageUrl ? { backgroundImage: `url(${infogroup.imageUrl})` } : undefined}
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

              <p className="font-light">{t("groups.privategroup")} </p>

              <p className="font-normal">
                {infogroup?.memberCount}

                {t("groups.membergroup")}
              </p>
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
