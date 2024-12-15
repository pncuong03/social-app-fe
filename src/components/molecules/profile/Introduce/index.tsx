import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "antd";
import IconCustomize from "src/components/atoms/Icons";

interface Props {
  friends?: any;
  user?: any;
}

const Introduce = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userDetails = [
    { icon: "work", value: props?.user?.work },
    { icon: "male", value: props?.user?.gender },
    { icon: "birthday", value: props?.user?.birthday ? dayjs(props.user.birthday).format("DD/MM/YYYY") : null },
    { icon: "place", value: props?.user?.live },
  ];

  console.log(props.user);

  return (
    <div className="col-span-1 mb-4 grid h-fit gap-4 ">
      <div className="flex flex-col gap-4 rounded-2xl  bg-white p-3 shadow-lg">
        <p className="text-xl font-medium">{t("profile.intro")}</p>

        <div className="flex justify-center">
          <p className="text-lg font-light">{props?.user?.description}</p>
        </div>

        {/* <div className="text-md flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <IconCustomize name="work" size={25} />

            <p className="text-lg font-light">{props?.user.work}</p>
          </div>

          <div className="flex items-center space-x-2">
            <IconCustomize name="male" size={25} />

            <p className="text-lg font-light">{props?.user.gender}</p>
          </div>

          <div className="flex items-center space-x-2">
            <IconCustomize name="birthday" size={25} />

            <p className="text-lg font-light">{dayjs(props?.user.birthday).format("DD/MM/YYYY")}</p>
          </div>

          <div className="flex items-center space-x-2">
            <IconCustomize name="place" size={25} />

            <p className="text-lg font-light">{props?.user.live}</p>
          </div>
        </div> */}

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

          <Button className="text-md border-none text-blue-500 shadow-none">{t("profile.allimages")}</Button>
        </div>

        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/119" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/118" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/117" />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-lg">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-medium">{t("home.friends")}</p>

            {/* <p className="text-sm text-gray-400">{props.friends.length + " " + t("home.friends")}</p> */}
          </div>

          <Button className="text-md border-none text-blue-500 shadow-none" onClick={() => navigate("/friends/list")}>
            {t("friend.allfriends")}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 ">
          {/* {props.friends.slice(0, 3).map((friend: any) => (
            <div key={friend.id} className="flex flex-col items-center">
              <img className="h-24 w-full rounded-md" alt="photo" src={friend.imageUrl} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
