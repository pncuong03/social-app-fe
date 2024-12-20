import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Badge, Button } from "antd";
import clsx from "clsx";
import { AppDispatch } from "src/app/store";
import { useAppSelector } from "src/app/appHooks";
import routesName from "src/routes/enum.routes";
import { selectUserInfo } from "src/slices/login/selector";
import { selectNotificationCount } from "src/slices/notification/selector";
import { fetchMyInfo, logOut } from "src/slices/login/loginSlice";
import { fetchEventNotification } from "src/slices/notification/notificationSlice";
import CustomDropdown from "src/components/atoms/Dropdown";
import IconCustomize from "src/components/atoms/Icons";
import CustomLanguage from "src/components/atoms/Language";
import Notification from "src/components/molecules/notification";
import SearchUser from "src/components/molecules/search";
import { unSubscribePushNoti } from "src/serviceWorker";

const MENU_ITEMS = [{ name: "Home", path: routesName.HOME, icon: <IconCustomize name="home" size={40} /> }];

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectUserInfo.getUserInfo);
  const notiCount = useAppSelector(selectNotificationCount.getNotificationCount);

  const handleLogout = async () => {
    dispatch(logOut());
    toast.success(t("home.logout"));
    window.location.href = routesName.LOGIN;

    const registration = await navigator.serviceWorker.ready;

    if (registration) {
      unSubscribePushNoti(registration);
    }
  };

  const initialize = useCallback(() => {
    dispatch(fetchMyInfo());
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    dispatch(fetchEventNotification());
  }, [dispatch]);

  const MENU_PROFILE = [
    {
      key: "0",
      label: userInfo?.fullName,
      path: routesName.PROFILE,
      image: userInfo?.imageUrl,
    },
    {
      key: "1",
      label: t("home.friends"),
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
          <Notification>
            <Button className=" h-12 w-12 rounded-full bg-gray-200 !p-0">
              <IconCustomize name="notification" size={25} color="black" />
            </Button>
          </Notification>
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
