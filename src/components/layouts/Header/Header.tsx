import React, { useEffect } from "react";
import clsx from "clsx";
import { Badge, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routesName from "src/routes/enum.routes";
import CustomDropdown from "src/components/atoms/Dropdown";
import IconCustomize from "src/components/atoms/Icons";
import CustomLanguage from "src/components/atoms/Language";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { fetchInfoUser, logOut } from "src/slices/login/loginSlice";
import { toast } from "react-toastify";
import NotificationList from "src/components/molecules/notification";
import { useAppSelector } from "src/app/appHooks";
import { selectUserInfo } from "src/slices/login/selector";
import { useSocket } from "src/utilities/hooks/useSocket";
import SearchUser from "src/components/molecules/search/SearchUser";
import { selectNotificationCount } from "src/slices/notification/selector";

const MENU_ITEMS = [{ name: "Home", path: routesName.HOME, icon: <IconCustomize name="home" size={40} /> }];

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectUserInfo.getUserInfo);
  const notiCount = useAppSelector(selectNotificationCount.getNotificationCount);

  useEffect(() => {
    dispatch(fetchInfoUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success(t("home.logout"));
    navigate(routesName.LOGIN);
  };

  useSocket();

  // useEffect(() => {
  //   if (receivedMessages?.type === "" ) {
  //     console.log(receivedMessages);

  //     const newReceivedMessage = {
  //       ...receivedMessages,
  //       id: data.map((item) => item.id).reduce((a, b) => Math.max(a, b), 0) + 1,
  //     };

  //     setTimeout(() => {
  //       setData((prevData) => [...prevData, newReceivedMessage]);
  //     }, 1000);
  //   }
  // }, [receivedMessages, chatId]);

  const MENU_PROFILE = [
    {
      key: "0",
      label: userInfo?.fullName,
      path: routesName.PROFILE,
      image: userInfo?.imageUrl,
    },
    {
      key: "1",
      label: "Friends",
      path: routesName.FRIENDS,
      icon: <IconCustomize name="friend" size={30} color="#00FF7F" />,
    },
    {
      key: "2",
      label: t("home.groups"),
      path: routesName.GROUPS,
      icon: <IconCustomize name="group" size={30} color="#1E90FF" />,
    },

    { key: "3", label: "Watch", path: routesName.WATCH, icon: <IconCustomize name="friend" size={30} /> },

    { key: "4", label: t("home.logout"), onClick: handleLogout, icon: <IconCustomize name="logout" size={30} /> },
  ];

  return (
    <header className="fixed top-0 z-10 mx-auto flex h-[75px] w-full items-center justify-between gap-2 bg-white px-2 shadow-md">
      <div className="col-span-2 flex items-center">
        <div className="ml-2 flex items-center gap-2">
          <div className="">
            <Link to={routesName.HOME}>
              <img src="/img/logo.png" className="h-[50px] w-[50px] rounded-full" alt="dp" />
            </Link>
          </div>

          <SearchUser />
        </div>
      </div>

      <nav className="hidden md:flex lg:gap-10 ">
        {MENU_ITEMS.map((item, index) => (
          <div key={index}>
            <Link
              className={clsx("leading-14 relative block text-lg font-medium text-neutral-200 hover:text-primary", {
                "!font-bold !text-primary after:mx-auto after:block  after:h-2 after:w-full after:rounded-full after:bg-primary after:content-[''] ":
                  `/${pathname.split("/")[1]}` === item.path,
              })}
              to={item.path}
            >
              <div className="flex h-16 w-24 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100">
                <div className="relative flex h-auto w-14 items-center justify-center">{item.icon}</div>
              </div>
            </Link>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-2">
        <CustomLanguage />

        <Badge count={notiCount.messageCount} offset={[-2, 4]}>
          <Button className=" h-12 w-12 rounded-full bg-gray-200 !p-0" onClick={() => navigate(routesName.MESSAGES)}>
            <IconCustomize name="message" size={25} color="black" />
          </Button>
        </Badge>

        <Badge count={notiCount.notificationCount} offset={[-2, 4]}>
          <NotificationList>
            <Button className=" h-12 w-12 rounded-full bg-gray-200 !p-0">
              <IconCustomize name="notification" size={25} color="black" />
            </Button>
          </NotificationList>
        </Badge>

        <CustomDropdown items={MENU_PROFILE} loading={false}>
          <button className=" h-12 w-12 rounded-full">
            <img src={userInfo?.imageUrl} className="h-12 w-12 rounded-full" />
          </button>
        </CustomDropdown>
      </div>
    </header>
  );
};

export default Header;
