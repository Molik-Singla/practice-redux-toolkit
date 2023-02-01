import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", name: "Prince Verma" },
    { id: "2", name: "Molik Singla" },
    { id: "3", name: "Rahul Garg" },
];

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state) => state.users;

export const {} = userSlice.actions;
export default userSlice.reducer;
