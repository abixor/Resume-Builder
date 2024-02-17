import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectData: {
        pName: "",
        techStack: "",
        desp: "",
    }
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjectData(state, action) {
            state.projectData = action.payload;
        }
    }
})

export const { setProjectData } = projectSlice.actions
export default projectSlice.reducer