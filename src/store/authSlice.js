import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  user: null,
  // postsLoad: { loading: false, apiError: null },
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload; //todo .friends
      } else {
        console.error("user friends non existent");
      }
    },
    setPosts: (state, action) => {
      // state.postsLoad = { ...state.postsLoad, ...action.payload };
      state.posts = action.payload;
      // state.posts.loading = action.payload.loading;
      // state.posts.apiError = action.payload.apiError;
    },
    removeDeletedPost: (state, action) => {
      state.posts.splice(action.payload, 1);
    },
    setPost: (state, action) => {
      const updatePosts = state.posts?.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePosts;
    },
  },
});

export const {
  setMode,
  setUser,
  setFriends,
  setPosts,
  setPost,
  removeDeletedPost,
} = authSlice.actions;
export default authSlice.reducer;
