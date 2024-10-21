import moment from "moment";
import React, { useEffect } from "react";

interface Props {
  time: string;
  t: any;
}

const TimeComparison = (props: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      getTimeDifferenceText();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getTimeDifferenceText = () => {
    const diff = moment().diff(moment(props.time));

    if (diff < 60000) {
      return props.t("home.justnow");
    } else if (diff < 3600000) {
      const minutes = moment().diff(moment(props.time), "minute");

      return minutes > 1 ? `${minutes} ${props.t("home.minute")}` : `1 ${props.t("home.minute")}`;
    } else if (diff < 86400000) {
      const hours = moment().diff(moment(props.time), "hour");

      return hours > 1 ? `${hours} ${props.t("home.hour")}` : `1 ${props.t("home.hour")}`;
    } else if (diff < 30 * 24 * 3600000) {
      const days = moment().diff(moment(props.time), "day");

      return days > 1 ? `${days} ${props.t("home.day")}` : `1 ${props.t("home.day")}`;
    } else {
      return moment(props.time).format("YYYY-MM-DD");
    }
  };

  return React.createElement("div", null, getTimeDifferenceText());
};

export default TimeComparison;
