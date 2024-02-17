import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socialData: {
        social: ""
    }
}

const socialSlice = createSlice({
    name: "social",
    initialState,
    reducers: {
        setSocialData(state, action) {
            state.socialData = action.payload
        }
    }
})

export const { setSocialData } = socialSlice.actions
export default socialSlice.reducer