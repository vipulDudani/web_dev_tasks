import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store/authSlice";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import {
  PersonAddAlt1Rounded,
  PersonRemoveRounded,
  FmdGoodRounded,
  MoreVert,
} from "@mui/icons-material";

function Friend({
  searchValue,
  friendId,
  picturePath,
  firstName,
  lastName,
  location,
  createdAt,
  deletePost,
  occupation,
}) {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.auth.user?.friends);
  const logedInUserId = useSelector((state) => state.auth.user?._id);

  const isFriend = friends?.find((friend) => friend.logedInUserId === friendId);
  const isSelf = friendId === logedInUserId;

  const patchFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/users/${logedInUserId}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends(data));
    } catch (error) {
      return Promise.reject();
    }
  };

  return (
    <div className="flex text-sm items-center justify-between p-3 relative">
      <div className="flex items-center gap-3">
        <Avatar picturePath={picturePath} />
        <div className="flex flex-col">
          <Link to={`/profile/${friendId}`}>
            {" "}
            <span className="font-semibold capitalize">{`${firstName} ${lastName}`}</span>
          </Link>
          <span className="text-xs font-light dark:text-gray-400">
            {!searchValue ? (
              <>
                {location || "N/A"} <FmdGoodRounded fontSize="small" />{" "}
              </>
            ) : (
              occupation
            )}
          </span>
        </div>
        {!searchValue && (
          <p className="text-gray-500 font-light text-xs self-start mt-1 ">
            &#10625; {createdAt?.slice(0, 10)}
          </p>
        )}
      </div>

      {/* menu  */}
      {isSelf ? (
        <>
          {!searchValue && (
            <>
              {" "}
              <MoreVert
                onClick={() => setMenu(!menu)}
                className="cursor-pointer"
              />
              {menu && (
                <div
                  onMouseLeave={() => setMenu(false)}
                  className="absolute flex flex-col top-10 right-6 p-2 rounded-md hover:bg-rose-500 dark:bg-gray-800 "
                >
                  <button onClick={deletePost}>Delete</button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <span
          onClick={patchFriend}
          className="rounded-full cursor-pointer p-1 hover:bg-gray-400 dark:hover:bg-gray-800"
        >
          {isFriend ? (
            <PersonRemoveRounded fontSize="medium" />
          ) : (
            <PersonAddAlt1Rounded fontSize="medium" />
          )}
        </span>
      )}
    </div>
  );
}

export default Friend;
