import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Button } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { selectInfoGroup, selectMemberGroup } from "src/slices/groups/selector";
import IconCustomize from "src/components/atoms/Icons";
import EditGroup from "../../Edit";
import PopoverCustomize from "src/components/atoms/Popover";
import ManageGroup from "../ManageGroup";
import DrawerCustomize from "src/components/atoms/Drawer";
import AddMemberGroup from "../ManageGroup/AddMemberGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { joinRequestGroup, leaveGroup } from "src/slices/groups/groupSlice";
import { Role } from "src/types/message";

const InfoGroup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
  const [isOpenManageGroup, setIsOpenManageGroup] = useState(false);
  const [isOpenAddMember, setOpenAddMember] = useState(false);

  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const { groupId } = location.state || {};

  const membersgroup = useAppSelector(selectMemberGroup.getMemberGroup);

  const infogroup = useAppSelector(selectInfoGroup.getInfoGroup);

  const handleCloseEdit = () => {
    setIsOpenEditGroup(false);
  };

  const handleCloseManage = () => {
    setIsOpenManageGroup(false);
  };

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };

  const handleJoinRequest = () => {
    dispatch(joinRequestGroup(groupId));
  };

  const handleLeaveGroup = () => {
    dispatch(leaveGroup(groupId));

    navigate(`/groups`);
  };

  const menuItems = () => (
    <div className="flex flex-col gap-2">
      <button
        className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100"
        onClick={handleLeaveGroup}
      >
        <IconCustomize name="logout" size={20} />

        <p className="text-lg ">{t("message.leave")}</p>
      </button>
    </div>
  );

  return (
    <div className="mx-auto -mt-2 max-w-7xl rounded-md bg-white">
      <div
        className={`relative h-[15rem] max-h-[28.75rem] w-full rounded-lg bg-gray-200 bg-center bg-no-repeat xl:h-[30rem]`}
        style={infogroup?.imageUrl ? { backgroundImage: `url(${infogroup.imageUrl})` } : undefined}
      >
        {/* <div className="absolute -bottom-2 flex w-full items-center justify-center md:bottom-1">
          <div className="absolute bottom-[10px] right-[30px]">
            <Upload {...uploadProps}>
              <Button className="rounded-xl bg-neutral-400 px-1 text-neutral-100">
                <IconCustomize name="camera" />

                <p className="hidden md:flex">{t("profile.editcover")}</p>
              </Button>
            </Upload>
          </div>
        </div> */}
      </div>

      <div className="mx-5 flex flex-col items-center gap-4 pb-7 lg:flex-row lg:justify-between">
        <div className="mt-4 ml-2 flex flex-col items-center lg:mt-10 lg:items-start">
          <p className="text-[2rem] font-bold ">{infogroup?.name}</p>

          <button className="flex cursor-pointer items-center gap-2 text-lg text-gray-400 ">
            <IconCustomize name="private" size={15} />

            <p className="font-light">{t("groups.privategroup")} </p>

            <p className="font-normal">
              {membersgroup.length}

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

        {infogroup?.isInGroup ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Button className="rounded-xl bg-blue-500 px-3" onClick={() => setOpenAddMember(true)}>
                <IconCustomize name="plus" size={15} />

                <p className="text-lg font-normal">{t("message.invitefriend")}</p>
              </Button>

              <DrawerCustomize
                title={t("message.addmember")}
                placement="left"
                open={isOpenAddMember}
                onClose={handleCloseAddMember}
              >
                <AddMemberGroup groupId={groupId} onSuccess={handleCloseAddMember} />
              </DrawerCustomize>

              <PopoverCustomize
                content={menuItems()}
                placement="bottom"
                arrow={true}
                open={isOpenPopover}
                onOpenChange={setIsOpenPopover}
              >
                <Button className="rounded-xl bg-gray-100 px-3">
                  <IconCustomize name="users" size={20} />

                  <p className="text-lg font-normal">{t("groups.participate")}</p>
                </Button>
              </PopoverCustomize>
            </div>

            <div className="flex items-center gap-2">
              {infogroup.role === Role.ADMIN && (
                <Button className="rounded-xl bg-gray-100 px-3" onClick={() => setIsOpenEditGroup(true)}>
                  <IconCustomize name="edit" size={15} />

                  <p className="text-lg font-normal">{t("groups.editgroup")}</p>
                </Button>
              )}

              <Button className="rounded-xl bg-gray-100 px-3" onClick={() => setIsOpenManageGroup(true)}>
                <IconCustomize name="cog" size={15} />

                <p className="text-lg font-normal">{t("groups.managegroup")}</p>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {infogroup.isRequestJoin ? (
              <Button className="rounded-xl bg-gray-100 px-3">
                <IconCustomize name="clock" size={15} />

                <p className="text-lg font-normal">{t("groups.wait")}</p>
              </Button>
            ) : (
              <Button className="rounded-xl bg-gray-100 px-3" onClick={handleJoinRequest}>
                <IconCustomize name="useradd" size={15} />

                <p className="text-lg font-normal">{t("groups.join")}</p>
              </Button>
            )}
          </div>
        )}
      </div>

      <EditGroup
        open={isOpenEditGroup}
        groupId={groupId}
        onSuccess={handleCloseEdit}
        onCancel={() => setIsOpenEditGroup(false)}
      />

      <ManageGroup
        open={isOpenManageGroup}
        groupId={groupId}
        onSuccess={handleCloseManage}
        onCancel={() => setIsOpenManageGroup(false)}
      />
    </div>
  );
};

export default InfoGroup;
