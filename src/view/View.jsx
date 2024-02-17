import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import React, { useState } from "react";
import { setProfileData } from "../features/profile/ProfileSlice";
import { useDispatch } from "react-redux";
import { setEducationData } from "../features/education/EducationSlice";
import { setProjectData } from "../features/project/ProjectSlice";
import { setSkillData } from "../features/skill/SkillSlice";
import { setSocialData } from "../features/social/SocialSlice";

const View = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Profiledata = useSelector((state) => state.profile.profileData);
  const Educationdata = useSelector((state) => state.education.educationData);
  const Skilldata = useSelector((state) => state.skill.skillData);
  const Projectdata = useSelector((state) => state.project.projectData);
  const Socialdata = useSelector((state) => state.social.socialData);

  const [empty, setEmpty] = useState(Profiledata);

  const handleBack = () => {
    dispatch(
      setProfileData({
        fname: "",
        lname: "",
        phone: "",
        address: "",
        image: "",
      })
    );
    dispatch(
      setEducationData({
        c_Name: "",
        c_Years: "",
        school: "",
        percentage: "",
      })
    );
    dispatch(
      setProjectData({
        pName: "",
        techStack: "",
        desp: "",
      })
    );
    dispatch(
      setSkillData({
        skill: "",
      })
    );
    dispatch(
      setSocialData({
        social: "",
      })
    );
    navigate("/StudentResume");
  };
  console.log("empty", empty);
  return (
    <div>
      <button
        onClick={handleBack}
        className="border border-0 mx-2 px-2 bg-danger text-light fw-bolder"
      >
        Back
      </button>
      <br />
      <button
        onClick={() => navigate("/Template1")}
        className="border border-0 mx-2 px-2 bg-danger text-light fw-bolder my-5"
      >
        Template1
      </button>
      <button
        onClick={() => navigate("/Template2")}
        className="border border-0 mx-2 px-2 bg-danger text-light fw-bolder my-5"
      >
        Template2
      </button>
      <button
        onClick={() => navigate("/Template3")}
        className="border border-0 mx-2 px-2 bg-danger text-light fw-bolder my-5"
      >
        Template3
      </button>
    </div>
  );
};

export default View;
