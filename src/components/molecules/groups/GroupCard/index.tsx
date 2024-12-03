import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { leaveGroup } from "src/slices/groups/groupSlice";
import IconCustomize from "src/components/atoms/Icons";
import PopoverCustomize from "src/components/atoms/Popover";

interface Props {
  idGroup: number;
  img: string;
  name: string;
  memberCount: number;
}

const GroupCard = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const menuItems = (
    <div className="flex flex-col gap-2">
      <button
        className="flex h-10 w-64 items-center gap-3 rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100"
        onClick={() => handleLeaveGroup()}
      >
        <IconCustomize name="comment" size={20} />

        <p className="text-base font-medium text-gray-700">{t("message.leave")}</p>
      </button>

      {/* <button className="flex h-10 items-center gap-3 rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100">
        <IconCustomize name="share" size={20} />

        <p className="text-base font-medium text-gray-700">Trang cá nhân</p>
      </button>

      <button className="flex h-10 items-center gap-3 rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100">
        <IconCustomize name="close" size={20} />

        <p className="text-base font-medium text-red-600">Kích khỏi nhóm</p>
      </button> */}
    </div>
  );

  const handleLeaveGroup = () => {
    dispatch(leaveGroup(props.idGroup));
  };

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-2xl bg-white p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1  hover:shadow-2xl  lg:max-w-md">
      <div className="mb-4 flex items-center gap-4">
        <img src={props.img} className="h-20 w-20 rounded-lg object-cover shadow-sm" />

        <p className="text-xl font-semibold text-gray-800">{props.name}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/groups/${props.name}`, { state: { groupId: props.idGroup } })}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 py-2 font-semibold text-white transition duration-200 hover:from-blue-600 hover:to-green-600"
        >
          {t("groups.seegroup")}
        </button>

        <PopoverCustomize content={menuItems} placement="bottom" arrow={true}>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition duration-200 hover:bg-gray-300">
            <IconCustomize name="ellipsis" size={20} />
          </button>
        </PopoverCustomize>
      </div>
    </div>
  );
};

export default GroupCard;
