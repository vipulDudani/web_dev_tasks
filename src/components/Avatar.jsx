import React from "react";
import avatar from "../assets/profile.png";

function Avatar({ picturePath }) {
  return (
    <img
      src={picturePath || avatar}
      alt="profile"
      className={`w-12 object-cover h-12 rounded-full`}
    />
  );
}

export function SmallAvatar({ picturePath }) {
  return (
    <img
      src={picturePath || avatar}
      alt="profile"
      className={`w-8 object-cover h-8 rounded-full`}
    />
  );
}
export default Avatar;
