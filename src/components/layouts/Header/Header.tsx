import React from "react";
import { useColorScheme } from "@mui/material";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "src/components/atoms/Icons/HomeIcon";
import { WatchIcon } from "src/components/atoms/Icons/WatchIcon";
import routesName from "src/routes/enum.routes";
import MaterialUISwitch from "src/components/molecules/SwitchDarkMode/SwitchDarkMode";

const MENU_ITEMS = [
  { name: "Home", path: routesName.HOME, icon: HomeIcon },
  { name: "Watch", path: routesName.WATCH, icon: WatchIcon },
];

const Header = () => {
  const { pathname } = useLocation();
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  return (
    <header
      className={`fixed z-10 mx-auto flex h-[75px] w-full items-center justify-between gap-2 px-2 ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } shadow-md`}
    >
      <div className="col-span-2 flex items-center">
        <div className="ml-2 flex items-center gap-2">
          <div className="">
            <Link to="/">
              <img src="/img/logo.png" className="h-[50px] w-[50px] rounded-full" alt="dp" />
            </Link>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex  lg:gap-10 ">
        {MENU_ITEMS.map((item, index) => (
          <div key={index}>
            <Link
              className={clsx("leading-14 relative block text-lg font-medium text-neutral-200 hover:text-primary", {
                "!font-bold !text-primary after:mx-auto after:block  after:h-2 after:w-full after:rounded-full after:bg-primary after:content-[''] ":
                  `/${pathname.split("/")[1]}` === item.path,
              })}
              to={item.path}
            >
              <div
                className={`flex h-16 w-24 cursor-pointer items-center justify-center rounded-lg ${
                  mode === "light" ? "hover:bg-gray-100" : " hover:bg-neutral-600"
                }`}
              >
                <div className="relative flex h-auto w-14 items-center justify-center">
                  {item.icon && <item.icon />}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </nav>

      <div className="col-span-2 flex items-center justify-end">
        <div className="flex h-10 w-auto items-center gap-2">
          <MaterialUISwitch
            onClick={toggleMode}
            sx={{ my: 0 }}
            size="medium"
            checked={mode === "light" ? true : false}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
