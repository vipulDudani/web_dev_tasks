import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;
const token = localStorage.getItem("token");

export async function getEmailFromToken() {
  // const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token Not Found!");
  let decode = await jwt_decode(token);
  return decode;
}

export async function registerUser(userData) {
  try {
    await axios.post(`/auth/register`, userData);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** LOGIN FUNCTION */
export async function Login({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password Doesn't Match!" });
  }
}

/** UPDATE PROFILE */
export async function updateProfile(userData) {
  try {
    // const token = localStorage.getItem("token");
    const data = await axios.patch("/users/updateUser", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile!" });
  }
}

/** UPLOAD IMAGE */
export async function uploadImage(data) {
  try {
    // const token = localStorage.getItem("token");
    const post = await axios.post("/posts", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return post;
  } catch (error) {
    return { err: "couldn't post" };
  }
}

/** DELETE POST */
export async function deletePost(postId) {
  try {
    // const token = localStorage.getItem("token");
    await axios.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

/** SEARCH USER */
export async function searchUsers(inputValue) {
  try {
    // const lastName = searchInput.slice(" ")[1];
    const searchedUser = await axios.get(`users/search/${inputValue}`);
    return searchedUser;
  } catch (error) {
    Promise.reject(error);
  }
}

//* COMMENTS
/** ADD COMMENT */
export async function addComment(formData) {
  try {
    // const token = localStorage.getItem("token");

    await axios.post(`/comment`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile!" });
  }
}

/** GET COMMENTS */
export async function getComments(postId) {
  try {
    const comments = await axios.get(`/comment/${postId}`);
    return comments;
  } catch (error) {
    return Promise.reject({ errro: "couldn't get the comments" });
  }
}

/** DELETE COMMENT */
export async function deleteComment(commentId) {
  try {
    // const token = localStorage.getItem("token");
    await axios.delete(`/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return Promise.reject({ errro: "couldn't get the comments" });
  }
}
