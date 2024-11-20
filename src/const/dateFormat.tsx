import React from "react";
import TimeAgo from "javascript-time-ago";
import { useTranslation } from "react-i18next";
import vi from "javascript-time-ago/locale/vi";
import en from "javascript-time-ago/locale/en";

// Cấu hình các ngôn ngữ hỗ trợ cho javascript-time-ago
TimeAgo.addLocale(vi);
TimeAgo.addLocale(en);

interface Props {
  time: string; // Thời gian cần hiển thị
}

const TimeCustomize = (props: Props) => {
  const { i18n } = useTranslation(); // Lấy ngôn ngữ hiện tại từ i18next
  const timeAgo = new TimeAgo(i18n.language); // Khởi tạo TimeAgo với ngôn ngữ hiện tại

  // Chuyển đổi chuỗi thời gian thành đối tượng Date hợp lệ
  const date = new Date(props.time);

  // Kiểm tra nếu thời gian không hợp lệ
  if (isNaN(date.getTime())) {
    return <span>Invalid Date</span>; // Hiển thị lỗi nếu thời gian không hợp lệ
  }

  // Đảm bảo rằng thời gian được chuyển thành đối tượng Date hợp lệ
  const formattedTime = timeAgo.format(date);

  return <span>{formattedTime}</span>;
};

export default TimeCustomize;
