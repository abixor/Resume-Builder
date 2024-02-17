import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: {
        fname: "",
        lname: "",
        phone: "",
        address: "",
        image:"",
    },
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData(state, action) {
            state.profileData = action.payload;
        },
        
    },
});

export const { setProfileData} = profileSlice.actions;
export default profileSlice.reducer;
