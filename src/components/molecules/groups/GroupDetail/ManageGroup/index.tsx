import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { Role } from "src/types/message";
import IconCustomize from "src/components/atoms/Icons";
import ModalCustomize from "src/components/atoms/Modal";
import PopconfirmCustomize from "src/components/atoms/Popconfirm";
import { selectInfoGroup, selectJoinGroup, selectMemberGroup } from "src/slices/groups/selector";
import { deleteMemberGroup, joinAcceptGroup } from "src/slices/groups/groupSlice";
import PopoverCustomize from "src/components/atoms/Popover";

interface Props {
  groupId: number;
  open?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const ManageGroup = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // Trạng thái quản lý từng Popover/Popconfirm
  const [activePopover, setActivePopover] = useState<number | null>(null);

  const membersgroup = useAppSelector(selectMemberGroup.getMemberGroup);
  const joinsGroup = useAppSelector(selectJoinGroup.getJoinGroup);
  const infogroup = useAppSelector(selectInfoGroup.getInfoGroup);

  const handleDeleteMemberGroup = (userId: number) => {
    dispatch(deleteMemberGroup({ groupId: props.groupId, userId }));
  };

  const handleAcceptRequestGroup = (userId: number) => {
    dispatch(joinAcceptGroup({ isAccept: true, groupId: props.groupId, userId }));
  };

  const handleRejectRequestGroup = (userId: number) => {
    dispatch(joinAcceptGroup({ isAccept: false, groupId: props.groupId, userId }));
  };

  const menuItems = (userId: number) => (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => handleAcceptRequestGroup(userId)}
        className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100"
      >
        <IconCustomize name="edit" size={25} />

        <p className="text-lg ">{t("friend.accept")}</p>
      </button>

      <button
        onClick={() => handleRejectRequestGroup(userId)}
        className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100"
      >
        <IconCustomize name="logout" size={25} />

        <p className="text-lg ">{t("friend.reject")}</p>
      </button>
    </div>
  );

  return (
    <ModalCustomize title={t("groups.managegroup")} open={props.open} onCancel={props.onCancel}>
      <div>
        {infogroup.role === Role.ADMIN && (
          <div>
            <h2 className="mb-2 text-xl font-medium">{t("groups.waitaccept")}</h2>

            {joinsGroup.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-1">
                <div className="flex items-center gap-3 text-lg font-normal">
                  <img src={member.imageUrl} className="h-12 w-12 rounded-full" />

                  <p>{member.fullName}</p>
                </div>

                <div>
                  <PopoverCustomize
                    content={menuItems(member.id)}
                    placement="bottom"
                    arrow={true}
                    open={activePopover === member.id}
                    onOpenChange={(open) => setActivePopover(open ? member.id : null)}
                  >
                    <Button className="border-none shadow-none outline-none">
                      <IconCustomize name="user" size={25} />
                    </Button>
                  </PopoverCustomize>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="">
          <h2 className="mb-2 text-xl font-medium">Thành viên</h2>

          {membersgroup.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between p-1">
              <div className="flex items-center gap-3 text-lg font-normal">
                <img src={member.imageUrl} className="h-12 w-12 rounded-full" />

                <p>{member.fullName}</p>
              </div>

              <div>
                {member.role === Role.ADMIN ? (
                  <Button className="border-none shadow-none outline-none">
                    <IconCustomize name="admin" size={25} />
                  </Button>
                ) : (
                  infogroup.role === Role.ADMIN && (
                    <PopconfirmCustomize
                      title={t("groups.deletemember")}
                      icon={null}
                      okText={t("friend.delete")}
                      cancelText={t("friend.cancel")}
                      onConfirm={() => handleDeleteMemberGroup(member.id)}
                    >
                      <Button className="border-none shadow-none outline-none">
                        <IconCustomize name="user" size={25} />
                      </Button>
                    </PopconfirmCustomize>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalCustomize>
  );
};

export default ManageGroup;
