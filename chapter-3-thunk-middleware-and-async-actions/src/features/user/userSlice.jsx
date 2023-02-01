import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [
    { id: "1", name: "Prince Verma" },
    { id: "2", name: "Molik Singla" },
    { id: "3", name: "Rahul Garg" },
];

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async (post, { rejectWithValue }) => {
    try {
        const result = await axios.get(USERS_URL);
        return result.data;
    } catch (err) {
        return rejectWithValue("Opps !! Something went Wrong");
    }
});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectAllUsers = (state) => state.users;

export const {} = userSlice.actions;
export default userSlice.reducer;
