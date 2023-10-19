import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../hook/fetchHook";
import UserWidget from "../components/widgets/UserWidget";
import PostsWidget from "../components/widgets/PostsWidget";
// import UploadPhotoWidget from "../components/widgets/UploadPhotoWidget";

function Profile() {
  const { userId } = useParams();

  useFetch(userId);
  const user = useSelector((state) => state.auth.user);

  // early return
  // if (serverError)
  //   return (
  //     <div className="bg-rose-500 rounded-lx p-3 text-white">
  //       Error Occured!
  //     </div>
  //   );
  // if (isLoading) return <PostLoading />;
  return (
    <div className="flex flex-col gap-4 justify-center items-center my-4">
      <UserWidget friendProfile={true} {...user} />
      <div className="flex flex-col flex-1 gap-4">
        {/* <UploadPhotoWidget /> */}
        <PostsWidget userId={userId} isProfile={true} />
      </div>
    </div>
  );
}

export default Profile;
