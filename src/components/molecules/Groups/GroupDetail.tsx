import React from "react";
import { useParams } from "react-router-dom";

const GroupDetail = () => {
  const { slug } = useParams();

  return <div>GroupDetail {slug}</div>;
};

export default GroupDetail;
