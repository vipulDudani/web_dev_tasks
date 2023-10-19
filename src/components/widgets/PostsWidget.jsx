import axios from "axios";
import PostWidget from "./PostWidget";
import { PostLoading } from "../Loading";
import { setPosts } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PostsWidget({ isProfile, userId }) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.auth?.posts);
  const token = localStorage.getItem("token");
  const [postsRes, setPostsRes] = useState({
    loading: false,
    apiError: null,
  });

  const getPosts = async () => {
    try {
      setPostsRes({ loading: true });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostsRes({ loading: false });
      dispatch(setPosts(response.data));
    } catch (error) {
      setPostsRes({ loading: false, apiError: error });
    }
  };

  const getUserPosts = async () => {
    try {
      setPostsRes({ loading: true });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts/${userId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostsRes({ loading: false });
      dispatch(setPosts(response.data));
    } catch (error) {
      setPostsRes({ loading: false, apiError: error });
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  // early returns
  if (postsRes?.apiError)
    return (
      <div className="p-5 bg-rose-700 text-white">
        Error Occured while fetching the posts: {postsRes?.apiError?.message}
      </div>
    );
  if (postsRes?.loading) return <PostLoading />;
  return (
    <>
      {!posts ? (
        <p>No post available!</p>
      ) : (
        posts?.map((data, index) => (
          <PostWidget
            key={data._id}
            {...data}
            postUserId={data.userId}
            index={index}
          />
        ))
      )}
    </>
  );
}

export default PostsWidget;
