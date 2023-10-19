import React, { useEffect, useState } from "react";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  InsertCommentOutlined,
  NearMeOutlined,
  TurnedInNotRounded,
  BookmarkRounded,
  DeleteRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeDeletedPost, setPost } from "../../store/authSlice";
import Friend from "../Friend";
import { addComment, deletePost, getComments } from "../../helper/helper";
import toast from "react-hot-toast";
import Comment from "../Comment";

function PostWidget({
  index,
  likes,
  firstName,
  lastName,
  location,
  // comments,
  createdAt,
  postUserId,
  _id: postId,
  picturePath,
  description,
  userPicturePath,
}) {
  const [Comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(likes[user?._id]);
  // const isSelfPosted = postId === user?._id;
  const dispatch = useDispatch();

  const likePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleAddComments = async (e) => {
    e.preventDefault();
    let formData = {
      postId,
      comment,
      userId: user?._id,
      fullName: user?.firstName + " " + user?.lastName,
      picturePath: user?.picturePath,
    };
    let addComPromise = addComment(formData).then(() => handleGetComments());

    toast.promise(addComPromise, {
      success: "Comment Added",
      error: "couldn't add comment",
    });
    setComment("");
  };

  const handleGetComments = async () => {
    const fetchedComments = await getComments(postId);
    setComments(fetchedComments.data);
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  const handleDeletePost = () => {
    const deletePromise = deletePost(postId);

    toast.promise(deletePromise, {
      success: "Post Deleted",
      error: "couldn't delete Post",
    });
    deletePromise.then(() => dispatch(removeDeletedPost(index)));
  };

  return (
    <div className="border p-2 rounded-lg bg-white dark:border-gray-800 dark:bg-slate-900 ">
      <Friend
        picturePath={userPicturePath}
        location={location}
        firstName={firstName}
        lastName={lastName}
        friendId={postUserId}
        createdAt={createdAt}
        deletePost={handleDeletePost}
      />
      {picturePath && (
        <img
          onDoubleClick={likePost}
          className="rounded-md object-cover max-h-[30rem] flex justify-center"
          src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/assets/${picturePath}`}
          alt="post"
        />
      )}

      <div className="mx-3 my-2">
        <div className="flex justify-between items-centers mb-2">
          <div className="flex gap-2 items-center">
            <span onClick={likePost}>
              {isLiked ? (
                <FavoriteRounded className="cursor-pointer" />
              ) : (
                <FavoriteBorderRounded className="cursor-pointer" />
              )}
            </span>
            <InsertCommentOutlined
              onClick={() => setShowComments(!showComments)}
              className="cursor-pointer"
            />
            <NearMeOutlined className="cursor-pointer" />
          </div>
          <TurnedInNotRounded className="cursor-pointer" />
        </div>
        <p>{Object.keys(likes).length} Likes</p>
        {description && (
          <p className="mb-2">{`${firstName}: ${description}.`}</p>
        )}

        {!showComments && (
          <p
            onClick={() => setShowComments(!showComments)}
            className="cursor-pointer text-gray-500 text-sm"
          >
            show all {Comments.length} comments
          </p>
        )}

        {/* show comments */}
        {showComments && (
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 ">
            {Comments?.map((comment) => (
              <Comment
                key={comment._id}
                {...comment}
                logedInUserId={user?._id}
                handleGetComments={handleGetComments}
              />
            ))}
          </div>
        )}

        {/* add comments */}
        <form
          action=""
          onSubmit={handleAddComments}
          className="flex justify-between"
        >
          <input
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent focus:none p-2 w-[60%] focus:outline-none"
          />
          <button
            disabled={!comment}
            type="submit"
            className="text-sm text-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostWidget;
