import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material";
import IconCustomize from "src/components/atoms/Icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface Props {
  friends?: any;
  user: {
    fullName: string;
    imageUrl: string;
    backgroundUrl: string;
    gender: string;
    birthday: string;
    description: string;
  };
}

const Introduce = (props: Props) => {
  const { mode } = useColorScheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="col-span-1 mb-4 grid h-fit gap-4 ">
      <div
        className={`flex flex-col gap-4 rounded-lg  p-3 shadow-md ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <p className="text-xl font-medium">{t("profile.intro")}</p>

        <div className="flex justify-center">
          <p className="text-lg font-light">{props?.user.description}</p>
        </div>

        <div className="text-md flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <IconCustomize name="work" size={25} />

            <p className="text-lg font-light">Software Engineer</p>
          </div>

          <div className="flex items-center space-x-2">
            <IconCustomize name="male" size={25} />

            <p className="text-lg font-light">{props?.user.gender}</p>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 rounded-lg p-3 shadow-md  ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">{t("home.images")}</p>
        </div>

        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/119" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/118" />

          <img className="w-full" alt="photo" src="https://random.imagecdn.app/125/117" />
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 rounded-lg p-3 shadow-md ${mode === "light" ? "bg-white" : "bg-neutral-800"}`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-medium">{t("home.friends")}</p>

            <p className="text-sm text-gray-400">{props.friends.length + " " + t("home.friends")}</p>
          </div>

          <Button className="text-md border-none text-blue-500 shadow-none" onClick={() => navigate("/friends/list")}>
            {t("friend.allfriends")}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 ">
          {props.friends.slice(0, 3).map((friend: any) => (
            <div key={friend.id} className="flex flex-col items-center">
              <img className="h-24 w-full rounded-md" alt="photo" src={friend.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
