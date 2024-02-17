import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../features/profile/ProfileSlice";
import educationSlice from "../features/education/EducationSlice";
import projectSlice from "../features/project/ProjectSlice";
import skillSlice from "../features/skill/SkillSlice";
import socialSlice from "../features/social/SocialSlice";

const Store = configureStore({
    reducer: {
        profile: profileSlice,
        education: educationSlice,
        project: projectSlice,
        skill: skillSlice,
        social: socialSlice
    }
})

export default Store