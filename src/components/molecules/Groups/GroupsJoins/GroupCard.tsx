import React from "react";
import IconCustomize from "src/components/atoms/Icons";
import PopoverCustomize from "src/components/atoms/Popover";

interface Props {
  name: string;
  img: string;
  description: string;
}

const GroupCard = (props: Props) => {
  const menuItems = (
    <div className="flex flex-col gap-2">
      <button className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
        <IconCustomize name="comment" size={25} />

        <p className="text-lg ">Noi dung cua ban</p>
      </button>

      <button className="flex h-8 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
        <IconCustomize name="share" size={25} />

        <p className="text-lg">Chia se</p>
      </button>

      <button className="flex h-8 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
        <IconCustomize name="close" size={25} />

        <p className="text-lg">Thoat nhom</p>
      </button>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[360px] items-center gap-3 rounded-md bg-white p-4 lg:max-w-md">
      <div className="mb-4 flex items-center gap-3">
        <img src={props.img} className="h-20 w-20 rounded-lg" />

        <p className="text-lg">{props.name}</p>
      </div>

      <div className="flex h-8 gap-3">
        <button className="w-full rounded-md bg-blue-100 font-medium text-blue-600">Xem nhom</button>

        <PopoverCustomize content={menuItems} placement="bottom" arrow={true}>
          <button className="flex w-8 items-center justify-center rounded-md bg-gray-100">
            <IconCustomize name="ellipsis" size={20} />
          </button>
        </PopoverCustomize>
      </div>
    </div>
  );
};

export default GroupCard;
