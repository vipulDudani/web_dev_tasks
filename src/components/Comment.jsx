import React from "react";
import avatar from "../assets/profile.png";
import { SmallAvatar } from "./Avatar";
import { DeleteRounded } from "@mui/icons-material";
import { deleteComment } from "../helper/helper";
import toast from "react-hot-toast";

function Comment({
  fullName,
  picturePath,
  text,
  replies,
  _id,
  logedInUserId,
  userId,
  handleGetComments,
}) {
  const isSelfCommented = logedInUserId === userId;

  const handleCommentDelete = async () => {
    const deletePromise = deleteComment(_id).then(() => handleGetComments());

    toast.promise(deletePromise, {
      success: "Comment deleted",
      error: "couldn't delete comment",
    });
  };

  return (
    <div className="flex justify-between items-center my-1">
      <div className="flex gap-1">
        <SmallAvatar picturePath={picturePath || avatar} />
        <p className="font-semibold mr-2 capitalize">
          {fullName}{" "}
          {isSelfCommented && (
            <span className="text-gray-500 text-[10px]">(you)</span>
          )}
        </p>
        <p>{text}</p>
      </div>
      {isSelfCommented && (
        <DeleteRounded
          className="cursor-pointer"
          fontSize="small"
          onClick={handleCommentDelete}
        />
      )}
    </div>
  );
}

export default Comment;
