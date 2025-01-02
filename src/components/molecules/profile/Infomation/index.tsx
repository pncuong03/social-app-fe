import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Image, Upload } from "antd";
import IconCustomize from "src/components/atoms/Icons";
import EditProfile from "../Edit";
import { StateUser } from "src/types/user";
import { onCreateImage } from "src/apis/post";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { editInfo } from "src/slices/user/userSlice";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import { deleteFriend, deleteRequestSend, fetchUserInfo, sendRequestFriend } from "src/slices/friend/friendSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/appHooks";
import { selectListFriend } from "src/slices/friend/selector";

interface Props {
  user?: any;
  my?: any;
}
const Information = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const friendList = useAppSelector(selectListFriend.getListFriend);

  const handleClose = () => {
    setIsOpenEdit(false);
  };

  const uploadAvatar = {
    showUploadList: false,
    beforeUpload: async (file: any) => {
      const data = new FormData();

      data.append("images", file);

      const response = await onCreateImage(data);

      if (response && response.data) {
        console.log(response.data);
      }

      dispatch(
        editInfo({
          fullName: props.my?.fullName,
          birthdayString: props.my?.birthday,
          gender: props.my.gender,
          work: props.my.work,
          description: props.my.description,
          live: props.my.live,
          imageUrl: response.data,
          imageBackground: props.my.imageBackground,
        })
      );
    },
  };

  const uploadBackground = {
    showUploadList: false,
    beforeUpload: async (file: any) => {
      const data = new FormData();

      data.append("images", file);

      const response = await onCreateImage(data);

      if (response && response.data) {
        console.log(response.data);
      }

      dispatch(
        editInfo({
          fullName: props.my?.fullName,
          birthdayString: props.my?.birthday,
          gender: props.my.gender,
          work: props.my.work,
          description: props.my.description,
          live: props.my.live,
          imageUrl: props.my.imageUrl,
          imageBackground: response.data,
        })
      );
    },
  };

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(props.user.id));
    dispatch(fetchUserInfo(props.user.id));
  };

  // const handleAcceptRequest = () => {
  //   dispatch(acceptFriend(props.user.id));
  // };

  const handleDeleteRequestSend = () => {
    dispatch(deleteRequestSend(props.user.id));
    dispatch(fetchUserInfo(props.user.id));
  };
  const handleSendRequest = () => {
    dispatch(sendRequestFriend(props.user.id));
    dispatch(fetchUserInfo(props.user.id));
  };

  const handleMessage = () => {
    navigate(`/messages/${props.user.fullName}`, {
      state: { chatId: props.user.chatId, info: props.user.fullName, img: props.user.imageUrl },
    });
  };

  return (
    <div className="mx-auto -mt-2 max-w-6xl rounded-md bg-white">
      <div
        className="relative h-[15rem] max-h-[28.75rem] w-full rounded-lg bg-cover bg-center bg-no-repeat xl:h-[30rem]"
        style={{
          backgroundImage: props.my?.imageBackground
            ? `url(${props.my?.imageBackground})`
            : props.user?.imageBackground
            ? `url(${props.user?.imageBackground})`
            : "linear-gradient(to right, #e5e5e5, #f9f9f9)",
        }}
      >
        <div
          className={`${
            props.my ? "block" : "hidden"
          } absolute -bottom-2 flex w-full items-center justify-center md:bottom-1`}
        >
          <div className="absolute bottom-[10px] right-[30px]">
            <Upload {...uploadBackground}>
              <Button className="rounded-xl bg-neutral-400 px-1 text-neutral-100">
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
              src={props.my ? props.my?.imageUrl : props.user?.imageUrl}
              height={200}
              width={200}
              className="rounded-full border-4 border-primary"
              preview={{
                mask: <div style={{ background: "none" }} />,
              }}
            />

            {props.my && (
              <Upload {...uploadAvatar}>
                <Button className="absolute bottom-2 right-1 w-[2rem] cursor-pointer rounded-full bg-gray-200 p-1">
                  <IconCustomize name="camera" />
                </Button>
              </Upload>
            )}
          </div>

          {props.my ? (
            <div className="mt-4 ml-2 flex flex-col items-center lg:mt-10 lg:items-start">
              <p className="text-[2rem] font-bold ">{props.my?.fullName}</p>

              <button className="cursor-pointer text-sm font-semibold text-gray-400 ">
                {friendList?.length + " " + t("home.friends")}
              </button>

              <Avatar.Group
                max={{
                  count: 2,
                  style: { color: "#f56a00", backgroundColor: "#fde3cf" },
                }}
                className="mt-2 flex items-center"
              >
                {friendList?.map((friend: any) => {
                  return <Avatar key={friend.id} src={friend.imageUrl} alt={friend.fullName} />;
                })}
              </Avatar.Group>
            </div>
          ) : (
            <div className="mt-4 ml-2 flex flex-col items-center lg:mt-10 lg:items-start">
              <p className="text-[2rem] font-bold ">{props.user?.fullName}</p>

              <button className="cursor-pointer text-sm font-semibold text-gray-400 ">
                {props.user.mutualFriends + " " + t("friend.mutalfriend")}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-3 md:mx-auto lg:mx-6">
          <div className="flex justify-between">
            {props.my ? (
              <Button className="w-full rounded-xl bg-gray-100 px-3" onClick={() => setIsOpenEdit(true)}>
                <p className="text-lg font-normal">{t("profile.editprofile")} </p>
              </Button>
            ) : (
              <div className="flex gap-2">
                {props.user.state === StateUser.STRANGER ? (
                  <Button className=" rounded-xl bg-gray-100 px-3" onClick={handleSendRequest}>
                    <p className="text-lg font-normal">{t("friend.addfriend")} </p>
                  </Button>
                ) : props.user.state === StateUser.FRIEND ? (
                  <div className="flex gap-2">
                    <PopconfirmCustomize
                      title={t("friend.deletefriend")}
                      icon={null}
                      placement="bottom"
                      okText={t("friend.yes")}
                      cancelText={t("friend.no")}
                      onConfirm={handleDeleteFriend}
                    >
                      <Button className=" rounded-xl bg-gray-100 px-3">
                        <p className="text-lg font-normal">{t("home.friends")} </p>
                      </Button>
                    </PopconfirmCustomize>

                    <Button className=" rounded-xl bg-gray-100 px-3" onClick={handleMessage}>
                      <p className="text-lg font-normal">Nhắn tin </p>
                    </Button>
                  </div>
                ) : (
                  <PopconfirmCustomize
                    title="Bạn có muốn xóa yêu cầu kết bạn"
                    icon={null}
                    placement="bottom"
                    okText={t("friend.yes")}
                    cancelText={t("friend.no")}
                    onConfirm={handleDeleteRequestSend}
                  >
                    <Button className=" rounded-xl bg-gray-100 px-3">
                      <p className="text-lg font-normal">Đang chờ chấp nhận </p>
                    </Button>
                  </PopconfirmCustomize>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <EditProfile open={isOpenEdit} onSuccess={handleClose} onCancel={() => setIsOpenEdit(false)} />
    </div>
  );
};

export default Information;
