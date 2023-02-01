import { createSlice, nanoid } from "@reduxjs/toolkit";

import { sub } from "date-fns";

const initialState = [
    {
        id: nanoid(),
        title: "Learning Redux Toolkit",
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsup: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
        },
    },
    {
        id: nanoid(),
        title: "Slices...",
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsup: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
        },
    },
];

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // postAdded: (state, action) => {
        //     // 🥇🥇  It internally uses immer.js so we can easy "mutate" the state as below ( only works inside createSlice ) :
        //     state.push(action.payload);
        // },
        postAdded: {
            // 1) 🥇🥇 It runs after the prepare()
            reducer: (state, action) => {
                state.unshift(action.payload);
            },

            // 2) 🥇🥇 It runs before the reducer() to set the payload
            // 🥇🥇 "prepare" () is used to set / change the payload before use it in reducer fucntion which is above
            prepare: (title, content, userId) => {
                // 🥇🥇 We have to return {} bcoz action also have "type" so we cannot under write it and payload is also an object
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
            const existingPost = state.find((post) => post.id === postId);

            if (existingPost) existingPost.reactions[reaction]++;
        },
    },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
