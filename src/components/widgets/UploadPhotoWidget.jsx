import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../helper/helper";
import { setPosts } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "../Avatar";
import {
  AttachFileRounded,
  InsertPhotoRounded,
  KeyboardVoiceRounded,
  Article,
} from "@mui/icons-material";

function UploadPhotoWidget() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const responsePromise = uploadImage(formData);

    responsePromise.then((post) => dispatch(setPosts(post.data)));
    toast.promise(responsePromise, {
      loading: "uploading...",
      success: "uploaded successfully",
      error: "couldn't post",
    });
    setPost("");
    setImage(null);
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-5 w-full rounded-xl relative shadow-md ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Avatar picturePath={user?.picturePath} />
          <input
            type="text"
            className="dark:bg-slate-700 bg-slate-300 rounded-3xl py-3 w-full px-6"
            placeholder="What's on your mind today..."
            value={post}
            required
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="flex w-full ">
          <label
            htmlFor="post"
            className="border-2 border-dotted border-cyan-400 p-3 w-full h-14 cursor-pointer"
          >
            {image?.name || "Tap to add image..."}
          </label>
          <input
            id="post"
            type="file"
            placeholder="Add Image Here"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <hr />
        <div className="addPost flex gap-3 text-sm justify-between items-center text-gray-800 dark:text-gray-300">
          <span>
            <InsertPhotoRounded /> Image{" "}
          </span>
          <span>
            <Article /> Clip{" "}
          </span>
          <span>
            <AttachFileRounded /> Attachment{" "}
          </span>
          <span>
            <KeyboardVoiceRounded /> Audio{" "}
          </span>
          <button
            disabled={!post}
            onClick={handlePost}
            type="submit"
            className="bg-purple-600 border border-purple-800 text-white px-3 py-1 rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPhotoWidget;
