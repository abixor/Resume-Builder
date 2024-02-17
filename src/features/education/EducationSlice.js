import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    educationData: {

        c_Name: "",
        c_Years: "",
        school: "",
        percentage: "",

    },
    
};

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        setEducationData(state, action) {
            state.educationData = action.payload;
        },
        
    },
});

export const { setEducationData } = educationSlice.actions;
export default educationSlice.reducer;
