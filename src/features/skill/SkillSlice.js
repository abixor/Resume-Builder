import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skillData: {
        skill: ""
    }
}

const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers: {
        setSkillData(state, action) {
            state.skillData = action.payload
        }
    }
})

export const { setSkillData } = skillSlice.actions
export default skillSlice.reducer