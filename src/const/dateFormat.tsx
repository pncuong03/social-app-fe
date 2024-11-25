import React from "react";
import TimeAgo from "javascript-time-ago";
import { useTranslation } from "react-i18next";
import vi from "javascript-time-ago/locale/vi";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(vi);
TimeAgo.addLocale(en);

interface Props {
  time: string;
}

const TimeCustomize = (props: Props) => {
  const { i18n } = useTranslation();
  const timeAgo = new TimeAgo(i18n.language);

  const date = new Date(props.time);

  if (isNaN(date.getTime())) {
    return <span>Invalid Date</span>;
  }

  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);

  const formattedTime = timeAgo.format(date);

  return <span>{formattedTime}</span>;
};

export default TimeCustomize;
