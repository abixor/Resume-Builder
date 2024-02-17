import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(true);
  const [profile, setProfile] = useState(true);
  const [education, setEducation] = useState(false);
  const [project, setProject] = useState(false);
  const [skill, setSkill] = useState(false);
  const [social, setSocial] = useState(false);
  const [view, setView] = useState(false);
  return (
    <AppContext.Provider
      value={{
        profileData,
        setProfileData,
        profile,
        setProfile,
        education,
        setEducation,
        project,
        setProject,
        skill,
        setSkill,
        social,
        setSocial,
        view, setView
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
