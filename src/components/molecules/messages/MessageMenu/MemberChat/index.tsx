    import React, { useEffect, useState } from "react";
    import { Button } from "antd";
    import { useTranslation } from "react-i18next";
    import { useAppDispatch, useAppSelector } from "src/app/appHooks";
    import DrawerCustomize from "src/components/atoms/Drawer";
    import IconCustomize from "src/components/atoms/Icons";
    import PopoverCustomize from "src/components/atoms/Popover";
    import { deleteMemeberChat, fetchMemberChat } from "src/slices/messages/messageSlice";
    import { selectMemberChat } from "src/slices/messages/selector";
    import AddMemberChat from "./AddMemberChat";
    import { selectUserInfo } from "src/slices/login/selector";
    import { Role } from "src/types/message";

    interface Props {
      groupId: string;
      nameGroup: string;
    }

    const MemberChat = (props: Props) => {
      const dispatch = useAppDispatch();
      const { t } = useTranslation();
      const [open, setOpen] = useState(false);
      const memberChats = useAppSelector(selectMemberChat.getMemberChat);
      const userInfo = useAppSelector(selectUserInfo.getUserInfo);

      useEffect(() => {
        dispatch(fetchMemberChat(props.groupId));
      }, [dispatch]);

      const handleDeleteMember = (userId: string) => {
        console.log(props.groupId, userId);

        dispatch(deleteMemeberChat({ groupChatId: props.groupId, userId }));
      };

      const handleClose = () => {
        setOpen(false);
      };

      const menuItems = (role: string, userId: string) => {
        const isSelf = userInfo.id === userId;

        return (
          <div className="flex flex-col gap-2">
            <button className="flex h-8 w-64 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
              <IconCustomize name="comment" size={25} />

              <p className="text-lg">{t("message.texting")}</p>
            </button>

            <button className="flex h-8 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100">
              <IconCustomize name="user" size={25} />

              <p className="text-lg">{t("home.personal")}</p>
            </button>

            {role === Role.MEMBER && !isSelf && (
              <button
                className="flex h-8 items-center gap-2 rounded-md border-none px-2 shadow-none hover:bg-gray-100"
                onClick={() => handleDeleteMember(userId)}
              >
                <IconCustomize name="userkick" size={27} />

                <p className="text-lg">{t("message.deletemember")}</p>
              </button>
            )}
          </div>
        );
      };

      return (
        <div className="flex flex-col gap-1 ">
          {memberChats.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between p-1">
              <div className="flex items-center gap-3 text-base font-normal">
                <img src={member.imageUrl} className="h-10 w-10 rounded-full" />

                <h1>{member.fullName}</h1>
              </div>

              <PopoverCustomize content={menuItems(member.role, member.id)} placement="bottom" arrow={true}>
                <button className="flex w-8 items-center justify-center rounded-md ">
                  <IconCustomize name="ellipsis" size={20} />
                </button>
              </PopoverCustomize>
            </div>
          ))}

          <Button
            className="mt-4 flex items-center justify-start gap-3 border-none px-2 shadow-none outline-none"
            onClick={() => setOpen(true)}
          >
            <IconCustomize name="useradd" size={25} />

            <p className="text-base font-normal">{t("message.addperson")}</p>
          </Button>

          <DrawerCustomize
            title={t("message.addmember") + props.nameGroup}
            placement="left"
            open={open}
            onClose={handleClose}
          >
            <AddMemberChat groupId={props.groupId} nameGroup={props.nameGroup} onSuccess={handleClose} />
          </DrawerCustomize>
        </div>
      );
    };

    export default MemberChat;
