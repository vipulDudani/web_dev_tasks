import React, { useState } from "react";
import UserWidget from "../components/widgets/UserWidget";
import EditUser from "../components/EditUser";
import UploadPhotoWidget from "../components/widgets/UploadPhotoWidget";
import FriendListWidget from "../components/widgets/FriendListWidget";
import useFetch from "../hook/fetchHook";
import Loading from "../components/Loading";
import PostsWidget from "../components/widgets/PostsWidget";
import { useSelector } from "react-redux";

function Home() {
  const [infoEdit, setInfoEdit] = useState(false);
  const { isLoading, serverError } = useFetch();
  const user = useSelector((state) => state.auth.user);

  // early return
  if (serverError)
    return (
      <div className="bg-rose-500 rounded-lx p-3 text-white">
        Error Occured!
      </div>
    );
  if (isLoading) return <Loading />;
  return (
    <>
      {infoEdit && <EditUser setInfoEdit={setInfoEdit} />}
      <div
        className={`m-[2%] ${
          infoEdit && "blur-sm"
        } flex justify-between gap-5 md:flex md:flex-col `}
      >
        <UserWidget profileInfoEdit={() => setInfoEdit(true)} {...user} />

        <div className="flex flex-col flex-1 gap-4">
          <UploadPhotoWidget />
          <PostsWidget isProfile={false} />
        </div>
        <FriendListWidget />
      </div>
    </>
  );
}

export default Home;
