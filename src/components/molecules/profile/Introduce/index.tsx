import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "antd";
import IconCustomize from "src/components/atoms/Icons";
import { useAppSelector } from "src/app/appHooks";
import { selectImageofUser, selectListFriend } from "src/slices/friend/selector";
import Album from "../Album";

interface Props {
  user?: any;
  userId?: number;
}

const Introduce = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenAlbum, setIsOpenAlbum] = useState(false);

  const getImage = useAppSelector(selectImageofUser.getImageofUser);
  const friendList = useAppSelector(selectListFriend.getListFriend);

  const userDetails = [
    { icon: "work", value: props?.user?.work },
    { icon: "male", value: props?.user?.gender },
    { icon: "birthday", value: props?.user?.birthday ? dayjs(props.user.birthday).format("DD/MM/YYYY") : null },
    { icon: "place", value: props?.user?.live },
  ];

  return (
    <div className="col-span-1 mb-4 grid h-fit gap-4 ">
      <div className="flex flex-col gap-4 rounded-2xl  bg-white p-3 shadow-lg">
        <p className="text-xl font-medium">{t("profile.intro")}</p>

        <div className="flex justify-center">
          <p className="text-lg font-light">{props?.user?.description}</p>
        </div>

        <div className="text-md flex flex-col space-y-4">
          {userDetails
            .filter((detail) => detail.value)
            .map((detail, index) => (
              <div key={index} className="flex items-center space-x-2">
                <IconCustomize name={detail.icon} size={25} />

                <p className="text-lg font-light">{detail.value}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">{t("home.images")}</p>

          <Button className="text-md border-none text-blue-500 shadow-none" onClick={() => setIsOpenAlbum(true)}>
            {t("profile.allimages")}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
          {getImage?.slice(0, 6).map((image: any, index: number) => (
            <div key={index} className="relative h-24 w-full cursor-pointer">
              <img src={image.imageUrl} alt={`Image ${index + 1}`} className="h-full w-full rounded-md object-cover" />
            </div>
          ))}
        </div>
      </div>

      {!props.userId && (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-medium">{t("home.friends")}</p>

              <p className="text-sm text-gray-400">{friendList.length + " " + t("home.friends")}</p>
            </div>

            <Button className="text-md border-none text-blue-500 shadow-none" onClick={() => navigate("/friends/list")}>
              {t("friend.allfriends")}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 ">
            {friendList?.slice(0, 3).map((friend: any) => (
              <div key={friend.id} className="flex flex-col items-center">
                <img className="h-24 w-full rounded-md" alt="photo" src={friend.imageUrl} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Album open={isOpenAlbum} onCancel={() => setIsOpenAlbum(false)} />
    </div>
  );
};

export default Introduce;
