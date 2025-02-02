import React from "react";
import {
  AiFillHome,
  AiOutlineUser,
  AiFillHeart,
  AiFillMessage,
  AiOutlineEllipsis,
  AiOutlineClose,
  AiOutlineLike,
  AiOutlineHdd,
} from "react-icons/ai";
import { IoNotifications, IoSearch, IoCreateOutline } from "react-icons/io5";
import { FaUserFriends, FaUserCircle, FaLock } from "react-icons/fa";
import { RiGroup2Fill } from "react-icons/ri";
import { PiImagesFill, PiVideoFill } from "react-icons/pi";
import { IoIosHappy } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { TfiShare } from "react-icons/tfi";
import { MdPublic, MdOutlineModeComment, MdOutlinePlace, MdEdit, MdAdminPanelSettings } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { CgWorkAlt, CgDanger } from "react-icons/cg";
import { PlusOutlined, CameraOutlined } from "@ant-design/icons";
import { CiSearch } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";
import { FaUserPlus, FaUserMinus } from "react-icons/fa6";
import { LuUserX } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { HiUserGroup } from "react-icons/hi2";
import { FaUserClock, FaUserCog } from "react-icons/fa";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const IconCustomize = (props: Props) => {
  const icons: { [key: string]: JSX.Element } = {
    home: <AiFillHome size={props.size} color={props.color} />,
    user: <AiOutlineUser size={props.size} color={props.color} />,
    heart: <AiFillHeart size={props.size} color={props.color} />,
    search: <CiSearch size={props.size} color={props.color} />,
    search2: <IoSearch size={props.size} color={props.color} />,
    message: <AiFillMessage size={props.size} color={props.color} />,
    notification: <IoNotifications size={props.size} color={props.color} />,
    friend: <FaUserFriends size={props.size} color={props.color} />,
    group: <RiGroup2Fill size={props.size} color={props.color} />,
    youtube: <PiVideoFill size={props.size} color={props.color} />,
    image: <PiImagesFill size={props.size} color={props.color} />,
    happy: <IoIosHappy size={props.size} color={props.color} />,
    send: <BsSend size={props.size} color={props.color} />,
    ellipsis: <AiOutlineEllipsis size={props.size} color={props.color} />,
    close: <AiOutlineClose size={props.size} color={props.color} />,
    like: <AiOutlineLike size={props.size} color={props.color} />,
    comment: <MdOutlineModeComment size={props.size} color={props.color} />,
    share: <TfiShare size={props.size} color={props.color} />,
    public: <MdPublic size={props.size} color={props.color} />,
    private: <FaLock size={props.size} color={props.color} />,
    plus: <PlusOutlined size={props.size} color={props.color} />,
    camera: <CameraOutlined size={props.size} color={props.color} />,
    male: <FiUser size={props.size} color={props.color} />,
    work: <CgWorkAlt size={props.size} color={props.color} />,
    logout: <TbLogout size={props.size} color={props.color} />,
    danger: <CgDanger size={props.size} color={props.color} />,
    info: <FaUserCircle size={props.size} color={props.color} />,
    feed: <AiOutlineHdd size={props.size} color={props.color} />,
    useradd: <FaUserPlus size={props.size} color={props.color} />,
    userminus: <FaUserMinus size={props.size} color={props.color} />,
    userkick: <LuUserX size={props.size} color={props.color} />,
    create: <IoCreateOutline size={props.size} color={props.color} />,
    birthday: <LiaBirthdayCakeSolid size={props.size} color={props.color} />,
    place: <MdOutlinePlace size={props.size} color={props.color} />,
    edit: <MdEdit size={props.size} color={props.color} />,
    users: <HiUserGroup size={props.size} color={props.color} />,
    admin: <MdAdminPanelSettings size={props.size} color={props.color} />,
    clock: <FaUserClock size={props.size} color={props.color} />,
    cog: <FaUserCog size={props.size} color={props.color} />,
  };

  return icons[props.name] || null;
};

export default IconCustomize;
