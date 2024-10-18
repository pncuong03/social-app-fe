import React from "react";
import { useParams } from "react-router-dom";

const FriendProfile = () => {
  const { slug } = useParams();

  return <div>Friend {slug}</div>;
};

export default FriendProfile;
