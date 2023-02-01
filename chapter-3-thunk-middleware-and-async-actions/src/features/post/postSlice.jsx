import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // "idle"  |  "loading"  |  "succeeded" | "failed"
    error: null,
};

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async (post, { rejectWithValue }) => {
    try {
        const result = await axios.get(POSTS_URL);
        return result.data;
    } catch (err) {
        return rejectWithValue("Opps !! Something went Wrong");
    }
});
export const addNewPost = createAsyncThunk("/posts/addNewPost", async (initialPost, { rejectWithValue }) => {
    try {
        const result = await axios.post(POSTS_URL, initialPost);
        return result.data;
    } catch (err) {
        return rejectWithValue("Opps !! Something went Wrong");
    }
});

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.unshift(action.payload);
            },

            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsup: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                        },
                    },
                };
            },
        },

        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);

            if (existingPost) existingPost.reactions[reaction]++;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            const loadedPosts = action?.payload?.map((post) => {
                post.date = new Date().toISOString();
                post.reactions = {
                    thumbsup: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                };
                return post;
            });
            state.posts = state.posts.concat(loadedPosts);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            // state.error = action.error.message;
            state.error = action.payload;
        });

        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.status = "succeeded";

            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsup: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
            };

            state.posts = [action.payload, ...state.posts];
        });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsErrror = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
